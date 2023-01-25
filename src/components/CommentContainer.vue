<script setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";

const props = defineProps([
  "commentId",
  "author",
  "content",
  "timestamp",
  "authuser",
]);
const isAuthor = ref(false);

onBeforeMount(() => {
  if (props.author === props.authuser) {
    isAuthor.value = true;
  }
});

const deleteComment = async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      await axios.delete(`/api/comment/${props.commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (err) {
      localStorage.removeItem("accessToken");
      console.log(err.response.data);
    }
  }
};
</script>

<template>
  <p class="text-xs">{{ timestamp.replace("T", " ").split(".")[0] }}</p>
  <p class="text-xl pb-2">{{ content }}</p>
  <p class="text-xs">Author: {{ author }}</p>
  <button
    v-if="isAuthor"
    @click="deleteComment"
    class="text-xs font-semibold rounded border-black border-2 p-0.5"
  >
    delete
  </button>
</template>
