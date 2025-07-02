<template>
  <Loading v-if="loading" />
  <div v-if="!loading" class="p-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold text-header">
        {{ analyzeSpec.title || analyzeSpec.wikiUrl.join(', ') }}
      </h1>
      <div class="flex space-x-2 pr-6">
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
    <p class="pb-6 sub-text">{{ analyzeSpec.keySummary }}</p>

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
          <th class="p-3 text-left font-light sub-text">Recommendation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(review, index) in analyzeSpec.reviews" :key="index" class="border-t">
          <td class="p-3 align-top">
            <div class="justify-items-center cursor-pointer w-full pt-2">
              <img
                :src="review.screenImage"
                :alt="review.screen"
                class="w-88 h-80 object-cover rounded-lg"
                @click="openModal(review.screenImage)"
                @error="handleImageError"
              />
            </div>
            <div
              v-if="modalOpen"
              class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
              @click="closeModal"
            >
              <img :src="currentImage" alt="FullSize Image" class="object-cover rounded-lg" />
            </div>
            <div class="justify-self-center pt-6 tmodalext-lg">
              {{ review.screen.toUpperCase() }}
            </div>
          </td>
          <td class="p-3 flex flex-col">
            <div class="bg-white shadow-md rounded-lg p-6 mb-4">
              <h2 class="text-xl font-semibold mb-4">Top 5 Most Critical Questions</h2>
              <ul class="list-disc font-light sub-text pl-5 space-y-2">
                <li
                  v-for="(criticalQuestion, cqIndex) in review.mostCriticalQuestions"
                  :key="cqIndex"
                >
                  {{ criticalQuestion }}
                </li>
              </ul>
            </div>
            <div v-for="(content, cIndex) in review.contents" :key="cIndex">
              <div
                class="flex w-full items-center justify-between mb-4 font-bold pb-4 pt-4 pl-4 bg-gray-100 rounded-md"
              >
                <h2 v-if="content.category !== 'ui_ux'">
                  {{
                    content.category
                      .split('_')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')
                  }}
                </h2>
                <h2 v-else>UI/UX</h2>
                <div class="mx-5 cursor-pointer" @click="toggleCollapse(index, cIndex)">
                  <img
                    :src="ArrowBlack"
                    :alt="review.collapsed ? 'Expand' : 'Collapse'"
                    :class="
                      review.contents[cIndex].collapsed ? 'rotate-180 pl-4' : 'pr-4 stroke-red'
                    "
                  />
                </div>
              </div>
              <template v-if="!content.collapsed">
                <div
                  v-for="(recommendation, rIndex) in content.recommendations"
                  :key="rIndex"
                  class="mb-4"
                >
                  <h4 class="font-semibold text-header pb-4">{{ recommendation.title }}</h4>
                  <ul class="list-disc list-inside pl-6 pb-6 font-light sub-text">
                    <template v-for="(detail, dIndex) in recommendation.details" :key="dIndex">
                      <li>
                        {{ detail }}
                      </li>
                    </template>
                  </ul>
                </div>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import Loading from '@/components/Loading.vue'
import ArrowBlack from '@/assets/arrow-black.svg' // Define the structure of analyzeSpec

// Define the structure of analyzeSpec
interface Review {
  screen: string
  screenImage: string
  mostCriticalQuestions: string[]
  contents: Array<{
    category: string
    collapsed?: boolean // Add collapsed state for each content
    recommendations: Array<{
      title: string
      details: string[]
    }>
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
      screen: 'Login',
      screenImage: 'image1.png',
      mostCriticalQuestions: [],
      contents: [
        {
          category: 'implementation',
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
        },
        {
          category: 'test_validation',
          recommendations: [
            {
              title:
                'How can we verify that the login validation messages are displayed correctly?',
              details: [
                'Relevant text: If left empty or mistyped, inline error messages should appear.',
                'Why this would be asked: The specification does not define the exact conditions under which each error message should appear.',
                'Recommendation: Provide a detailed list of scenarios and expected error messages for each case.',
              ],
            },
          ],
        },
      ],
      collapsed: false, // Initialize the collapsed state
    },
  ],
})

const loading = ref(true)
const route = useRoute()
const router = useRouter()

const toggleCollapse = (rIndex: number, Cindex: number) => {
  console.log(analyzeSpec.value)
  analyzeSpec.value.reviews[rIndex].contents[Cindex].collapsed =
    !analyzeSpec.value.reviews[rIndex].contents[Cindex].collapsed
}

let intervalId: number
onMounted(async () => {
  await fetchSpecsData()
  if (loading.value) {
    intervalId = setInterval(fetchSpecsData, 3000)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const handleImageError = (event) => {
  // Provide a fallback image URL or a detailed image URL
  event.target.src = '/mars0-fe/banner.png'
}

async function fetchSpecsData() {
  try {
    const response = await axios.get(
      `https://drs-rag-api-drs.app.linecorp-dev.com/api/v1/specs/${route.params.id}`,
    )
    console.log('Response data:', response.data)
    if (response.data.reviews.length > 0) {
      analyzeSpec.value = response.data
      // Initialize the collapsed state for each review
      analyzeSpec.value.reviews.forEach((review) => {
        review.collapsed = true
        review.contents.forEach((content) => {
          content.collapsed = true
        })
      })

      loading.value = false
      clearInterval(intervalId)
    }
  } catch (error) {
    console.error('Error fetching automation data:', error)
  }
}

const generateTC = async () => {
  const specsId = analyzeSpec.value.topicId
  console.log('Generating test case for ID:', specsId)
  try {
    const response = await axios.post(
      `https://drs-rag-api-drs.app.linecorp-dev.com/api/v1/specs/${specsId}/generate-manual-test-case`,
    )
    const { success, test_suite_id: testSuiteId } = response.data || { success: false }
    if (success) {
      navigateToTestCase(testSuiteId)
    }
  } catch (error) {
    console.error('Error fetching specs review data:', error)
  }
}

const navigateToTestCase = (testSuiteId: string) => {
  router.push({ name: 'generate-testcases', params: { id: testSuiteId } })
}

const currentImage = ref('/mars0-fe/banner.png')
const modalOpen = ref(false)

function openModal(imageUrl: string) {
  currentImage.value = imageUrl
  modalOpen.value = true
}

function closeModal() {
  currentImage.value = ''
  modalOpen.value = false
}
</script>
