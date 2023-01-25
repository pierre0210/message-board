<script setup>
defineProps(["author", "content", "timestamp"]);
</script>

<template>
  <p class="text-xl pb-2">{{ content }}</p>
  <p class="text-base">{{ author }}</p>
  <p class="text-xs">{{ timestamp.replace("T", " ").split(".")[0] }}</p>
</template>
