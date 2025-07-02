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
          <h3 class="font-semibold text-header">{{ testCase.feature }}</h3>
        </div>
        <ul class="ml-6 space-y-2">
          <li
            v-for="(relatedTestCase, index) in testCase.related_test_cases"
            :key="index"
            :class="[
              'hover:bg-red-100 cursor-pointer p-4 m-3 rounded-2xl',
              { 'bg-[rgb(221,68,68,0.1)]': relatedTestCase.id.toString() == props.id },
            ]"
          >
            {{ relatedTestCase.description }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import folderIcon from '@/assets/folder.svg'
import newTCIcon from '@/assets/newtc.svg'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps<{
  id: string
}>()

const testCase = ref({
  feature: 'Login: User login functionality',
  related_test_cases: [
    {
      id: 266,
      test_suite_id: '02191b51b7984a509a6a944ba46480ee',
      feature: 'Login: User login functionality',
      description: 'Test login with valid credentials',
      priority: 'High',
      category: 'Functional',
    },
  ],
})

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://drs-rag-api-drs.app.linecorp-dev.com/api/v1/test-suites/manual/test-case/${props.id}`,
    )
    testCase.value = response.data
  } catch (error) {
    console.error('Error fetching related test cases data:', error)
  }
})
</script>
