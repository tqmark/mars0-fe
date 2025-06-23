<script lang="ts" setup>
import LogoIcon from '@/components/icon/LogoIcon.vue'
import SearchIcon from '@/components/icon/SearchIcon.vue'
import BellIcon from '@/components/icon/BellIcon.vue'

defineProps<{
  userName: string
  userRole: string
  isHomePage?: boolean
}>()
</script>

<template>
  <header
    class="flex items-center bg-white"
    :class="isHomePage ? 'justify-between' : 'justify-end'"
  >
    <div v-if="isHomePage" class="p-4 text-xl font-bold flex items-center">
      <button class="focus:outline-none">
        <i class="icon-toggle text-4xl">
          <logo-icon />
        </i>
      </button>
      <RouterLink to="/" class="font-extrabold pl-2 [color:#DD4444]">MARS</RouterLink>
    </div>
    <div class="flex items-center gap-2.5">
      <SearchIcon/>
      <BellIcon/>
      <img class="w-10 h-10 rounded-full mr-4" src="@/assets/coming-soon.svg" alt="User Avatar" />
      <div class="flex flex-col">
        <div class="font-medium text-gray-900">{{ userName }}</div>
        <div class="text-sm text-gray-500">{{ userRole }}</div>
      </div>
      <!--        <div class="ml-auto text-gray-500 cursor-pointer">▼</div>-->
    </div>
  </header>
</template>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>
