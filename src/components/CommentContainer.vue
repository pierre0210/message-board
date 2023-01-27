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
    } catch (err) {
      localStorage.removeItem("accessToken");
      console.log(err.response.data);
    }
  }
  window.location.reload();
};
</script>

<template>
  <div class="p-2 m-2 bg-gray-300 rounded w-fit">
    <p class="text-xs">
      {{ new Date(timestamp).toLocaleString() }} No.{{ commentId }}
    </p>
    <p class="text-xl pb-2">{{ content }}</p>
    <p class="text-xs">Author: {{ author }}</p>
    <button
      v-if="isAuthor"
      @click="deleteComment"
      class="text-xs font-semibold rounded border-black border-2 p-0.5"
    >
      delete
    </button>
  </div>
</template>
