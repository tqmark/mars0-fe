<template>
  <div
    class="fixed top-[64px] right-[64px] w-64 h-full bg-white shadow-lg border border-gray-200 rounded-md"
  >
    <div class="flex justify-between items-center p-4 border-b">
      <h2 class="text-lg font-semibold">History</h2>
      <button @click="closePopup" class="text-red-500">x</button>
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
export default {
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
