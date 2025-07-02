<template>
  <div class="flex">
    <AutomationTestCaseSidebar :id="id" />
    <div class="w-3/4 p-6">
      <AutomationTestCaseContent :id="id" />
      <!--<AutomationTestResult />-->
    </div>
  </div>
</template>
<script setup lang="ts">
import AutomationTestCaseSidebar from '@/components/AutomationTestCaseSidebar.vue'
import AutomationTestCaseContent from '@/components/AutomationTestCaseContent.vue'
import { useRoute } from 'vue-router'
import { toRefs } from 'vue'

const route = useRoute()
const { id } = toRefs(route.params)
</script>
