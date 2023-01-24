<script setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import CommentContainer from "../components/CommentContainer.vue";
import NavBar from "../components/NavBar.vue";

const state = ref(false);
const comments = ref([]);

onBeforeMount(async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const response = await axios.get("http://localhost:3001/api/comment/", {
        params: {
          start: 1,
          end: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      state.value = true;
      comments.value = response.data.data;
    } catch (err) {
      const statusCode = err.response.status;
      console.log(err);
      console.log(statusCode);
    }
  }
});
</script>

<template>
  <NavBar />
  <div class="p-2">
    <p v-if="!state">Home page</p>
    <div v-if="state">
      <div v-for="comment in comments" :key="comment" class="p-5">
        <CommentContainer
          :content="comment.content"
          :author="comment.user_name"
          :timestamp="comment.createdAt"
        />
      </div>
    </div>
  </div>
</template>
