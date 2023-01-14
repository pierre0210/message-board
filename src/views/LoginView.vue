<script setup>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import { ref } from "vue";

const username = ref("");
const password = ref("");

const message = ref("");

const submitLogin = async () => {
  const response = await axios.post("http://localhost:3001/api/auth/signin", {
    username: username.value,
    password: password.value,
  });

  message.value = `${response.status} ${response.data.message}`;
  alert(message.value);
};
</script>

<template>
  <NavBar />
  <form @submit="submitLogin" class="p-2">
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
