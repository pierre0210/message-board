<script setup>
defineProps(["author", "content", "timestamp"]);
</script>

<template>
  <p class="text-xl pb-2">{{ content }}</p>
  <p class="text-base">{{ author }}</p>
  <p class="text-xs">{{ Date(timestamp).toString() }}</p>
</template>
