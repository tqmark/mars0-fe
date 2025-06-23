<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import LNB from '@/components/LNB.vue'
import Header from '@/components/Header.vue'
import { computed, ref } from 'vue'

const userName = ref('Kong Nguyen')
const userRole = ref('Admin')

const route = useRoute()

const isHomePage = computed(() => {
  return route.path === '/'
})

</script>

<template>
  <div class="flex">
    <LNB v-if="!isHomePage" />
    <div class="flex-1">
      <Header :isHomePage :userName :userRole/>
      <RouterView />
    </div>
  </div>
</template>
