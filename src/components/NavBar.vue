<script setup>
import { onBeforeMount, ref } from "vue";
import { RouterLink } from "vue-router";

const state = ref(false);

onBeforeMount(() => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    state.value = true;
  }
});

const logout = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/";
};
</script>

<template>
  <div class="flex p-2">
    <h1 class="text-3xl font-bold">Message Board</h1>
    <nav class="my-auto mr-1 grid grid-cols-2 md:flex">
      <RouterLink class="mx-5" to="/">Home</RouterLink>
      <RouterLink class="mx-5" to="/about">About</RouterLink>
      <RouterLink v-if="state" class="mx-5" to="/post">Post</RouterLink>
      <RouterLink v-if="!state" class="mx-5" to="/login">Login</RouterLink>
      <RouterLink v-if="!state" class="mx-5 min-w-max" to="/signup">
        Sign Up
      </RouterLink>
    </nav>
    <button v-if="state" class="my-auto px-5" @click="logout">Logout</button>
  </div>
</template>
