<script setup lang="ts">
defineProps<{
  image: string
  title: string
  description: string
}>()
</script>
<template>
  <div class="p-4 bg-white rounded-lg shadow-md text-center hover:shadow-xl transition-shadow flex flex-col">
    <img :src="image" alt="Card Image" class="h-48 mx-auto mb-2" />
    <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>
