<template>
  <div
    class="fixed top-[64px] right-[64px] w-64 h-full bg-white shadow-lg border border-gray-200 rounded-md"
  >
    <div class="flex justify-between items-center p-4 border-b">
      <h1 class="font-bold text-2xl">History</h1>
      <button @click="closePopup" class="text-red-500">
        <img :src="xIcon" alt="Card Image" class="pr-4" />
      </button>
    </div>
    <div class="p-4">
      <h3 class="font-bold mb-2">Today</h3>
      <ul>
        <li class="bg-red-100 p-2 mb-2 rounded">Generate test case 3</li>
      </ul>
      <h3 class="font-bold mb-2">Yesterday</h3>
      <ul>
        <li class="bg-gray-100 p-2 mb-2 rounded">Analyze Topic 2</li>
        <li class="bg-gray-100 p-2 mb-2 rounded">Analyze Topic 1</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import xIcon from '@/assets/x-icon.svg'
export default {
  computed: {
    xIcon() {
      return xIcon
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
