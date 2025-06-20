<template>
  <div class="flex h-screen">
    <AutomationTestCaseSidebar />
    <div class="w-3/4 p-6">
    <AutomationTestCaseContent />
    <AutomationTestResult />
    </div>
  </div>
</template>
<script setup lang="ts">
import AutomationTestCaseSidebar from '@/components/AutomationTestCaseSidebar.vue'
import AutomationTestCaseContent from '@/components/AutomationTestCaseContent.vue'
import { useRoute } from 'vue-router'
import { toRefs } from 'vue'
import AutomationTestResult from '@/components/AutomationTestResult.vue'

const route = useRoute();
const { id } = toRefs(route.params);
</script>
