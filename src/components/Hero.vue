<script setup lang="ts">

import { ref } from 'vue'
import Tiptap from '@/components/Tiptap.vue'

const content = ref(' ')
</script>
<template>
  <section
    class="bg-cover bg-center p-8  flex justify-center items-center"
    style="background-image: url('/mars0-fe/banner.png')"
  >
    <div
      class="w-3/4 mx-auto bg-white rounded-lg shadow-md p-6 flex justify-between items-center gap-4"
    >
      <div class="flex flex-col space-y-4 flex-1">
          <Tiptap v-model="content" />
      </div>

      <div class="flex flex-col space-y-2 gap-1">
        <button class="bg-red-500 text-white rounded px-4 py-2">Review specs</button>
        <button class="bg-red-500 text-white rounded px-4 py-2">Generate test case</button>
        <button class="bg-red-500 text-white rounded px-4 py-2">Generate web element</button>
      </div>
    </div>
  </section>
</template>
