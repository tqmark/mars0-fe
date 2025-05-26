<template>
  <div class="flex h-screen">
    <AutomationTestCaseSidebar />
    <AutomationTestCaseContent />
  </div>
</template>
<script setup lang="ts">
import AutomationTestCaseSidebar from '@/components/AutomationTestCaseSidebar.vue'
import AutomationTestCaseContent from '@/components/AutomationTestCaseContent.vue'
import { useRoute } from 'vue-router'
import { toRefs } from 'vue'

const route = useRoute();
const { id } = toRefs(route.params);
</script>
