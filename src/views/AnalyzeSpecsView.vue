<template>
  <Loading v-if="loading" />
  <div v-if="!loading" class="p-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold text-header">
        {{ analyzeSpec.title || analyzeSpec.wikiUrl.join(', ') }}
      </h1>
      <div class="flex space-x-2">
        <button class="btn-secondary border px-4 py-2 rounded">View History</button>
        <button class="btn bg-red-custom text-white border px-4 py-2 rounded">
          Save to Inventory
        </button>
        <button @click="generateTC" class="btn bg-red-custom text-white px-4 py-2 rounded">
          Generate TC
        </button>
      </div>
    </div>
    <h2 class="font-bold text-header my-4">Key Summary</h2>
    <p class="pb-6 sub-text ">{{ analyzeSpec.keySummary }}</p>

    <hr class="border-black border-t-1 pb-6" />

    <h2 class="text-xl font-bold pb-4">Key Features and Capabilities</h2>
    <ul class="list-disc list-inside pb-6 font-light sub-text">
      <li v-for="(feature, index) in analyzeSpec.keyFeatures" :key="index">{{ feature }}</li>
    </ul>

    <h2 class="text-xl font-bold mb-4">Review and Recommendation</h2>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-left font-light sub-text">UI Screen</th>
          <th class="p-3 text-left jjllczfont-light sub-text">Recommendation</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(review, index) in analyzeSpec.reviews" :key="index" class="border-t">
        <td class="p-3">
          <div class="justify-self-center">
            <img src="/banner.png" alt="UI Screen" class="w-64 h-64 object-cover rounded-lg" />
          </div>
        </td>
        <td class="p-3 flex flex-col">
          <div
            class="flex w-full items-center justify-between mb-4 font-bold pb-4 pt-4 pl-4 bg-gray-100 rounded-md"
          >
            <h2 v-if="review.category !== 'ui_ux'">
              {{
                review.category
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
              }}
            </h2>
            <h2 v-else>UI/UX</h2>

            <img
              :src="arrowDownRedIcon"
              @click="toggleCollapse(index)"
              :alt="review.collapsed ? 'Expand' : 'Collapse'"
              :class="review.collapsed ? 'rotate-180 pl-4' : 'pr-4 stroke-red'"
            />
          </div>
          <div
            v-for="(recommendation, rIndex) in review.recommendations"
            :key="rIndex"
            class="mb-4"
          >
            <h4 class="font-semibold text-header pb-4">{{ recommendation.title }}</h4>
            <ul class="list-disc list-inside pl-6 pb-6 font-light sub-text">
              <template v-for="(detail, dIndex) in recommendation.details" :key="dIndex">
                <li v-if="!review.collapsed || dIndex < 2">
                  {{ detail }}
                </li>
              </template>
            </ul>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Loading from '@/components/Loading.vue'
import arrowDownRedIcon from '@/assets/icondown-red.svg'

// Define the structure of analyzeSpec
interface Review {
  screen: string
  category: string
  recommendations: Array<{
    title: string
    details: string[]
  }>
  collapsed: boolean // Add collapsed state
}

interface AnalyzeSpec {
  topicId: number
  wikiUrl: string[]
  title: string
  keySummary: string
  keyFeatures: string[]
  reviews: Review[]
}

const analyzeSpec = ref<AnalyzeSpec>({
  topicId: 7,
  wikiUrl: [],
  title: 'Analyze Topic 7',
  keySummary:
    'Unify the format of pop-ups across all consoles for consistency and user-friendliness.',
  keyFeatures: [
    'Center aligned title, contents, and buttons.',
    'Option to align title or contents to the left and buttons to the right.',
    "'x' button displayed on the top right.",
    'Applicable to various scopes like project creation, editing, code changes, and permissions modifications.',
    'Specific key values and notes for confirm, error, and comparison pop-ups.',
    'Detailed instructions for creating and managing IAT secrets, spaces, and live services.',
  ],
  reviews: [
    {
      screen: 'image1.png',
      category: 'data',
      recommendations: [
        {
          title: 'Unusual Situations to Consider',
          details: [
            'Users might try to interact with the pop-ups in unexpected ways, which could lead to errors.',
            'Rare scenarios like system errors or network issues should also be considered during planning.',
            'Users may not realize the limitations of the standardized pop-up format, so clear communication is key.',
          ],
        },
        {
          title: 'Unusual Situations to Consider 2',
          details: [
            'Users might try to interact with the pop-ups in unexpected ways, which could lead to errors.',
            'Rare scenarios like system errors or network issues should also be considered during planning.',
            'Users may not realize the limitations of the standardized pop-up format, so clear communication is key.',
          ],
        },
      ],
      collapsed: false, // Initialize the collapsed state
    },
  ],
})

const loading = ref(true)
const route = useRoute()

const toggleCollapse = (index: number) => {
  analyzeSpec.value.reviews[index].collapsed = !analyzeSpec.value.reviews[index].collapsed
}

onMounted(async () => {
  await fetchSpecsData()
})

async function fetchSpecsData() {
  loading.value = true
  try {
    const response = await axios.get(
      `https://drs-rag-api-drs.app.linecorp-dev.com/api/v1/specs/${route.params.id}`,
    )
    console.log('Response data:', response.data)
    analyzeSpec.value = response.data
    // Initialize the collapsed state for each review
    analyzeSpec.value.reviews.forEach(review => {
      review.collapsed = false
    })
  } catch (error) {
    console.error('Error fetching automation data:', error)
  } finally {
    loading.value = false
  }
}

function generateTC() {
  console.log('Generating test case for ID:', analyzeSpec.value.topicId)
}
</script>
