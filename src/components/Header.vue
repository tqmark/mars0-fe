<script lang="ts" setup>
defineProps<{
  userName: string
  userRole: string
}>()

</script>

<template>
  <header class="flex justify-end items-center bg-white shadow-md">
      <div class="flex items-center">
        <img class="w-10 h-10 rounded-full mr-4" src="@/assets/coming-soon.svg" alt="User Avatar" />
        <div class="flex flex-col pl-5 pr-5">
          <div class="font-bold text-gray-900">{{ userName }}</div>
          <div class="text-gray-500">{{ userRole }}</div>
        </div>
<!--        <div class="ml-auto text-gray-500 cursor-pointer">▼</div>-->
      </div>
  </header>
</template>


<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>
