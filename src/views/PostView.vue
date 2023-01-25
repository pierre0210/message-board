<script setup>
import axios from "axios";
import { ref } from "vue";
import NavBar from "../components/NavBar.vue";

const content = ref("");

const submitComment = async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      await axios.post(
        "/api/comment",
        { content: content.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err.response.data);
      localStorage.removeItem("accessToken");
    }
  }
  window.location.href = "/";
};
</script>

<template>
  <NavBar />
  <form
    @submit.prevent="submitComment"
    class="flex justify-center items-center"
  >
    <div class="block">
      <label>Content</label><br />
      <textarea
        placeholder="comment here"
        v-model="content"
        class="border-black border-2 rounded my-1 p-1"
      />
      <br />
      <br />
      <button type="submit" class="px-1 rounded border-black border-2">
        Submit
      </button>
      <p class="mt-1 text-red-900">{{ message }}</p>
    </div>
  </form>
</template>
