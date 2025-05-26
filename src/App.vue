<script setup lang="ts">
import { RouterView } from 'vue-router'
import LNB from '@/components/LNB.vue'
import Header from '@/components/Header.vue'
import { ref } from 'vue'

const userName = ref('Kong Nguyen')
const userRole = ref('Admin')
</script>

<template>
  <div class="flex">
    <LNB />
    <div class="flex-1">
      <Header :userName :userRole/>
      <RouterView />
    </div>
  </div>
</template>
