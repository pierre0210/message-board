<script setup>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import { ref } from "vue";

const username = ref("");
const password = ref("");

const message = ref("");

const submitLogin = async () => {
  try {
    const response = await axios.post("/api/auth/signin", {
      username: username.value,
      password: password.value,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    window.location.href = "/";
  } catch (err) {
    message.value = `${err.response.data.message}`;
  }
};
</script>

<template>
  <NavBar />
  <form @submit.prevent="submitLogin" class="flex justify-center items-center">
    <div class="block">
      <label>User name </label><br />
      <input
        type="text"
        v-model="username"
        class="border-black border-2 rounded my-1 p-1"
      />
      <br />
      <label>Password </label><br />
      <input
        type="password"
        v-model="password"
        autocomplete="on"
        class="border-black border-2 rounded my-1 p-1"
      />
      <br />
      <br />
      <button type="submit" class="px-1 rounded border-black border-2">
        Login
      </button>
      <p class="mt-1 text-red-900">{{ message }}</p>
    </div>
  </form>
</template>
