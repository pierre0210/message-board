<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="flex p-2">
    <h1 class="text-3xl font-bold">Message Board</h1>
    <nav class="my-auto">
      <RouterLink class="p-5" to="/">Home</RouterLink>
      <RouterLink class="p-5" to="/about">About</RouterLink>
    </nav>
  </div>
</template>
