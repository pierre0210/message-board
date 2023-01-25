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
  <form
    @submit.prevent="submitRegistration"
    class="flex justify-center items-center"
  >
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
        Sign up
      </button>
      <p class="mt-1 text-red-900">{{ message }}</p>
    </div>
  </form>
</template>
