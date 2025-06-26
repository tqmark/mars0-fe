<script lang="ts" setup>
import { onMounted, toRefs, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BackIcon from '@/components/icon/BackIcon.vue'
import axios from 'axios'

const route = useRoute()
const { id } = toRefs(route.params)

const router = useRouter()
const generateTC = () => {
  // Logic to generate test case
  console.log(`Generating test case for ID: ${id.value}`)
}

const navigateBack = () => {
  // Logic to navigate back
  router.back()
}

const testCase = ref({
  id: 6,
  test_suite_id: 'f69ddf98d7d2489d93f35d95f0a9b0d0',
  feature: 'Login: User login functionality',
  description: 'Test successful login with valid credentials',
  priority: 'High',
  preCondition: 'User has a valid account',
  steps: [
    {
      step: "Enter 'validuser@example.com' in the Username field",
      expected_results: 'Username is entered correctly',
    },
    {
      step: "Enter 'ValidPassword123' in the Password field",
      expected_results: 'Password is entered correctly',
    },
    {
      step: 'Click the Login button',
      expected_results: 'User is redirected to the homepage',
    },
  ],
})

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://drs-rag-api-drs.app.linecorp-dev.com/api/v1/test-suites/manual/test-case/${id.value}`,
    )
    testCase.value = response.data
  } catch (error) {
    console.error('Error fetching automation data:', error)
  }
})
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-4">
      <div class="flex space-x-1">
        <BackIcon @click="navigateBack" class="cursor-pointer" />
      </div>
      <div class="flex space-x-2">
        <button class="btn-secondary border px-4 py-2 rounded">
          <font-awesome-icon :icon="['fas', 'pen']" />
          Edit
        </button>
        <button class="btn bg-red-custom text-white border px-4 py-2 rounded">
          Save to Inventory
        </button>
        <button @click="generateTC" class="btn bg-red-custom text-white px-4 py-2 rounded">
          Generate TC
        </button>
      </div>
    </div>
    <div class="py-8 border-b-1 border-b-gray-300">
      <h2 class="text-lg text-header font-bold">{{ testCase.feature }}</h2>
      <p class="sub-text">{{ testCase.description }}</p>
    </div>

    <div class="grid grid-cols-4 gap-12 my-8">
      <div class="border-b-1 border-b-gray-300 py-10">
        <h3 class="font-semibold text-header">TYPE</h3>
        <p class="sub-text">Automated</p>
      </div>
      <div class="border-b-1 border-b-gray-300 py-10">
        <h3 class="font-semibold text-header">PRIORITY</h3>
        <p class="sub-text">{{ testCase.priority }}</p>
      </div>
      <div class="border-b-1 border-b-gray-300 py-10">
        <h3 class="font-semibold text-header">ESTIMATE</h3>
        <p class="sub-text">None</p>
      </div>
      <div class="border-b-1 border-b-gray-300 py-10">
        <h3 class="font-semibold text-header">MILESTONE</h3>
        <p class="sub-text">None</p>
      </div>
      <div class="border-b-1 border-b-gray-300 py-10">
        <h3 class="font-semibold text-header">REFERENCES</h3>
        <p class="sub-text">MP-1790</p>
      </div>
      <div class="border-b-1 border-b-gray-300 py-10">
        <h3 class="font-semibold text-header">TAGS</h3>
        <p class="sub-text">1.3</p>
      </div>
      <div class="border-b-1 border-b-gray-300 py-10">
        <h3 class="font-semibold text-header">AUTOMATION TYPE</h3>
        <p class="sub-text">None</p>
      </div>
    </div>

    <div class="pb-5 border-b-1 border-b-gray-300 py-10">
      <h3 class="font-bold">PRE-CONDITION</h3>
      <p class="sub-text">{{ testCase.preCondition }}</p>
    </div>

    <div class="mt-10">
      <h3 class="font-bold my-4">STEPS</h3>
      <table class="min-w-full bg-white">
        <thead class="bg-red-500 text-white">
          <tr class="bg-red-custom text-white">
            <th class="rounded-s-lg w-1/2 p-2 text-left">STEP</th>
            <th dir="rtl" class="rounded-s-lg w-1/2 p-2 text-left">EXPECTED RESULT</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(step, index) in testCase.steps"
            :key="index"
            :class="index % 2 == 0 ? 'bg-gray-100' : ''"
          >
            <td class="p-4">{{ step.step }}</td>
            <td class="p-4">{{ step.expected_results }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
