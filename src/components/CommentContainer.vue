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
const isEditing = ref(false);
const editedContent = ref(props.content);

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

const startEditing = async () => {
  isEditing.value = true;
};

const editComment = async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    if (isEditing.value) {
      try {
        await axios.put(
          `/api/comment/${props.commentId}`,
          { content: editedContent.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        localStorage.removeItem("accessToken");
        console.log(err.response.data);
      }
    }
  }
};

const cancelEditing = async () => {
  isEditing.value = false;
};
</script>

<template>
  <div class="p-2 m-2 bg-gray-300 rounded w-fit">
    <p class="text-xs">
      {{ new Date(timestamp).toLocaleString() }} No.{{ commentId }}
    </p>
    <p v-if="!isEditing" class="text-xl pb-2">
      {{ content }}
    </p>
    <form v-if="isEditing" @submit="editComment">
      <textarea v-model="editedContent" class="w-full" />
      <div class="flex">
        <button
          type="submit"
          class="text-xs font-semibold rounded border-black border-2 p-0.5"
        >
          submit
        </button>
        <button
          @click="cancelEditing"
          class="text-xs font-semibold rounded border-black border-2 p-0.5 ml-1"
        >
          cancel
        </button>
      </div>
    </form>
    <p class="text-xs">Author: {{ author }}</p>
    <div class="flex">
      <button
        v-if="isAuthor"
        @click="deleteComment"
        class="text-xs font-semibold rounded border-black border-2 p-0.5"
      >
        delete
      </button>
      <button
        v-if="isAuthor && !isEditing"
        @click="startEditing"
        class="text-xs font-semibold rounded border-black border-2 p-0.5 ml-1"
      >
        edit
      </button>
    </div>
  </div>
</template>
