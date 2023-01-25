<script setup>
defineProps(["prevButton", "nextButton", "currentPage", "pageCount"]);
</script>

<template>
  <div class="flex justify-center items-center">
    <button class="m-1 px-1 rounded border-black border-2" @click="prevButton">
      Prev
    </button>
    <p>{{ currentPage }}/{{ pageCount }}</p>
    <button class="m-1 px-1 rounded border-black border-2" @click="nextButton">
      Next
    </button>
  </div>
</template>
