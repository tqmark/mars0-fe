<template>
  <div class="w-1/4 bg-white p-4">
    <div class="flex gap-2">
    <button class="btn-secondary flex! border px-4 py-2 rounded">
      <img :src="folderIcon" alt="Card Image" class="pr-4" />
      New folder
    </button>
    <button class="btn bg-red-custom flex! border text-white border px-4 py-2 rounded">
      <img :src="newTCIcon" alt="Card Image" class="pr-4" />
      New TC
    </button>
    </div>
    <div class="space-y-4 mt-10">
      <div>
        <div class="flex items-center space-x-2">
          <img :src="folderIcon" alt="Card Image" class="pr-4" />
          <h3 class="font-semibold text-header">Google</h3>
        </div>
        <ul class="ml-6 space-y-2">
          <li class="hover:bg-red-100 cursor-pointer p-4 m-3 rounded-2xl bg-[rgb(221,68,68,0.1)]">Validate leap year in 2024</li>
          <li class="hover:bg-red-100 cursor-pointer p-4 m-3 rounded-2xl">Validate that users can log in...</li>
        </ul>
      </div>
      <div>
        <div class="flex items-center space-x-2">
          <img :src="folderIcon" alt="Card Image" class="pr-4" />
          <h3 class="font-semibold text-header">Google</h3>
        </div>
        <ul class="ml-6 space-y-2">
          <li class="hover:bg-red-100 cursor-pointer p-4 m-3 rounded-2xl bg-[rgb(221,68,68,0.1)]">Validate leap year in 2024</li>
          <li class="hover:bg-red-100 cursor-pointer p-4 m-3 rounded-2xl">Validate that users can log in...</li>
        </ul>
      </div>
      <div>
        <div class="flex items-center space-x-2">
          <img :src="folderIcon" alt="Card Image" class="pr-4" />
          <h3 class="font-semibold text-header">Google</h3>
        </div>
        <ul class="ml-6 space-y-2">
          <li class="hover:bg-red-100 cursor-pointer p-4 m-3 rounded-2xl bg-[rgb(221,68,68,0.1)]">Validate leap year in 2024</li>
          <li class="hover:bg-red-100 cursor-pointer p-4 m-3 rounded-2xl">Validate that users can log in...</li>
        </ul>
      </div>


    </div>
  </div>
</template>
<script setup lang="ts">
import folderIcon from '@/assets/folder.svg'
import newTCIcon from '@/assets/newtc.svg'
</script>
