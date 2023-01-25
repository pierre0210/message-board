<script setup>
import axios from "axios";
import { RouterView } from "vue-router";
axios.defaults.baseURL = "http://localhost:3001";
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
