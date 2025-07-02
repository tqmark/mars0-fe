<template>
  <div
    class="fixed top-[64px] right-[64px] w-80 h-full bg-white shadow-lg border border-gray-200 rounded-md"
  >
    <div class="flex justify-between items-center p-4 border-b">
      <h1 class="font-bold text-2xl">History</h1>
      <button @click="closePopup" class="text-red-500">
        <img :src="xIcon" alt="Card Image" class="pr-4" />
      </button>
    </div>
    <div class="p-4">
      <h2 class=" text-xl font-bold mb-2">Today</h2>
      <ul>
        <li class="bg-[#fff2f2] p-4 my-6 rounded">Generate test case 3</li>
      </ul>
      <h2 class=" text-xl font-bold mb-2">Yesterday</h2>
      <ul>
        <li class="bg-fafafb p-4 my-6 rounded">Analyze Topic 2</li>
        <li class="bg-fafafb p-4 my-6 rounded">Analyze Topic 1</li>
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
.bg-fafafb {
  background-color: #fafafb;
}
</style>
