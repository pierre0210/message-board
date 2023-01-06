<script setup>
import NavBar from "../components/NavBar.vue";

function submitLogin() {}
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
      class="border-black border-2 rounded my-1"
    />
    <button type="submit" class="ml-1 px-1 rounded border-black border-2">
      Login
    </button>
  </form>
</template>
