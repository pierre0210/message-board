<script setup>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import { ref } from "vue";

const username = ref("");
const password = ref("");

const message = ref("");

const submitLogin = async () => {
  try {
    const response = await axios.post("http://localhost:3001/api/auth/signin", {
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
  <form @submit.prevent="submitLogin" class="p-2">
    <label>User name: </label>
    <input
      type="text"
      v-model="username"
      class="border-black border-2 rounded my-1"
    />
    <label class="ml-1">Password: </label>
    <input
      type="password"
      v-model="password"
      autocomplete="on"
      class="border-black border-2 rounded my-1"
    />
    <button type="submit" class="ml-1 px-1 rounded border-black border-2">
      Login
    </button>
  </form>
  <p class="ml-1">{{ message }}</p>
</template>
