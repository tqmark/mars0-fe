<script lang="ts" setup>
import LogoIconWhite from '@/components/icon/LogoIconWhite.vue'
import LogoIcon from '@/components/icon/LogoIcon.vue'

defineProps<{
  userName: string
  userRole: string
  isHomePage?: boolean
}>()

</script>

<template>
  <header class="flex justify-between items-center bg-white">
    <div v-if="isHomePage" class="p-4 text-xl font-bold flex items-center">
      <button @click="toggleNavbar" class="focus:outline-none">
        <i class="icon-toggle text-4xl">
          <logo-icon />
        </i>
      </button>
      <RouterLink to="/" v-if="!isCollapsed" class="font-extrabold pl-2 [color:#DD4444]">MARS</RouterLink>
    </div>
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
