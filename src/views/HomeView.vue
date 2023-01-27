<script setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import CommentContainer from "../components/CommentContainer.vue";
import NavBar from "../components/NavBar.vue";
import PaginationBar from "../components/PaginationBar.vue";

const state = ref(false);
const comments = ref([]);
const userName = ref("");
const commentCount = ref(0);
const currentPage = ref(1);

onBeforeMount(async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      changePage(1);
      const count = await axios.get("/api/comment/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      state.value = true;
      commentCount.value = count.data.data;
    } catch (err) {
      localStorage.removeItem("accessToken");
      console.log(err.response.data);
    }
  }
});

const changePage = async (startIndex) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const response = await axios.get("/api/comment", {
        params: {
          start: startIndex,
          end: startIndex + 9,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      comments.value = response.data.data;
      userName.value = response.data.userData.username;
    } catch (err) {
      localStorage.removeItem("accessToken");
      console.log(err.response.data);
      window.location.reload();
    }
  }
};

const toPrevPage = () => {
  if (currentPage.value - 1 >= 1) {
    currentPage.value--;
    changePage((currentPage.value - 1) * 10 + 1);
  }
};

const toNextPage = () => {
  if (currentPage.value + 1 <= Math.ceil(commentCount.value / 10)) {
    currentPage.value++;
    changePage((currentPage.value - 1) * 10 + 1);
  }
};
</script>

<template>
  <NavBar />
  <div class="p-2">
    <p v-if="!state">Home page</p>
    <div v-if="state">
      <div v-for="comment in comments" :key="comment">
        <CommentContainer
          :commentId="comment.comment_id"
          :content="comment.content"
          :author="comment.user_name"
          :timestamp="comment.createdAt"
          :authuser="userName"
        />
      </div>
    </div>
  </div>
  <PaginationBar
    v-if="state"
    :prevButton="toPrevPage"
    :nextButton="toNextPage"
    :currentPage="currentPage"
    :pageCount="Math.ceil(commentCount / 10)"
  />
</template>
