<script setup lang="ts">
defineProps<{
  image: string
  title: string
  description: string
}>()
</script>
<template>
  <div class="p-4 w-[240px] bg-white rounded-lg shadow-md text-center hover:shadow-xl transition-shadow flex flex-col">
    <img :src="image" alt="Card Image" class="h-48 mx-auto mb-2" />
    <h3 class="text-lg text-header font-semibold mb-2">{{ title }}</h3>
    <p class="text-left sub-text">{{ description }}</p>
  </div>
</template>
