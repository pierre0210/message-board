<script setup>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import { ref } from "vue";

const username = ref("");
const password = ref("");

const message = ref("");

const submitRegistration = async () => {
  if (username.value === "" || password.value === "") {
    message.value = "Username and password can't be empty.";
    return;
  }
  try {
    await axios.post("/api/auth/signup", {
      username: username.value,
      password: password.value,
    });

    window.location.href = "/login";
  } catch (err) {
    message.value = `${err.response.data.message}`;
  }
};
</script>

<template>
  <NavBar />
  <form @submit.prevent="submitRegistration" class="p-2">
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
      Sign up
    </button>
    <p>{{ message }}</p>
  </form>
</template>
