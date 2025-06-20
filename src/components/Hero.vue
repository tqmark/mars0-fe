<script setup lang="ts">
import { ref } from 'vue'
import LeftIcon from '@/components/icon/LeftIcon.vue'
import RightIcon from '@/components/icon/RightIcon.vue'

const content = ref(' ')
</script>
<template>
  <section
    class="bg-cover bg-center p-8 flex justify-center items-center h-[540px]"
    style="background-image: url('/mars0-fe/banner.png')"
  >
    <div class="relative w-3/5">
      <!-- Left Icon -->
      <div class="absolute top-[68px] left-[-170px] -mt-4 -ml-4 z-0">
        <LeftIcon />
      </div>

      <!-- Right Icon -->
      <div class="absolute top-[-95px] right-[-115px] -mt-4 -mr-4 z-0">
        <RightIcon />
      </div>

      <div class="relative p-6 bg-white rounded-[20px] shadow-md flex justify-between z-10">
        <div class="flex-1 mr-4">
          <input
            type="text"
            placeholder="Paste your link here"
            class="w-full p-2 border rounded-[6px] mb-2"
          />
          <div class="flex items-center justify-center mb-2">
            <hr class="flex-1 border-t" />
            <span class="mx-2 text-gray-500">or</span>
            <hr class="flex-1 border-t" />
          </div>
          <div class="p-4 border-1 border-orange-600 border-dashed rounded-[8px] bg-red-50 text-center">
            <span>Drop your file here | </span>
            <button class="text-red-500 underline">choose file</button>
          </div>
        </div>
        <div class="flex flex-col space-y-2 justify-between">
          <button class="bg-red-500 text-white py-2 px-4 rounded-[8px]">
            Review specs
          </button>
          <button class="bg-red-500 text-white py-2 px-4 rounded-[8px]">
            Generate test case
          </button>
          <button class="bg-red-500 text-white py-2 px-4 rounded-[8px]">
            Generate web element
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
