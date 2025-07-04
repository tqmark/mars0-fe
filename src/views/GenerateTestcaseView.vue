<template>
  <div class="relative min-h-screen bg-white">
    <Loading v-if="loading" />
    <div v-if="!loading" class="p-4 space-y-4">
      <div class="flex space-x-4j justify-between gap-2.5">
        <div class="flex space-x-2">
          <button
            class="px-4 py-2 rounded-md ml-5 cursor-pointer"
            :class="{
              'bg-red-custom text-white': selectedCategory === 'All',
              'bg-gray-200': selectedCategory !== 'All',
            }"
            @click="selectedCategory = 'All'"
          >
            All
            <span class="pl-2 pr-2 inline w-8 h-8 bg-[rgba(255,255,255,0.3)] rounded-full">
              {{ getAllTestCaseLength() }}
            </span>
          </button>
          <button
            v-for="(suite, index) in [...testCase.testSuites]"
            :key="index"
            class="px-4 py-2 rounded-md cursor-pointer"
            :class="{
              'bg-red-custom text-white': selectedCategory === suite.category,
              'bg-gray-200': selectedCategory !== suite.category,
            }"
            @click="selectedCategory = suite.category"
          >
            {{ suite.category }}
            <span class="pl-2 pr-2 inline w-8 h-8 bg-[rgba(255,255,255,0.3)] rounded-full">
              {{ getTestCaseLength(suite.category) }}
            </span>
          </button>
        </div>
        <div class="flex space-x-2 pr-6">
          <button class="btn-secondary border px-4 py-2 rounded cursor-pointer">
            <font-awesome-icon :icon="['fas', 'print']" />
            Export
          </button>
          <button
            @click="showPopup = true"
            class="btn-secondary border px-4 py-2 rounded pr-6 cursor-pointer"
          >
            View History
          </button>
          <HistoryPopup v-if="showPopup" @close="showPopup = false" />
        </div>
      </div>

      <div
        v-for="feature in selectedFeatures"
        :key="feature.name"
        class="overflow-hidden rounded-md m-5"
      >
        <div
          class="h-[70px] flex items-center rounded-xl justify-between mb-2 bg-[#fff2f2] pl-6 pr-2"
        >
          <div class="flex">
            <h3 class="font-semibold text-header">{{ feature.name }}</h3>
          </div>
          <div class="flex gap-2 pr-4">
            <div
              class="flex gap-2 p-3 rounded-xl bg-[rgba(255,255,255,0.8)] mr-4 cursor-pointer"
              @click="openModal(feature.screenImage)"
              @error="handleImageError"
            >
              <img :src="eyeIcon" alt="eye-icon" />
              <button class="color-red-custom cursor-pointer">View UI Screen</button>
            </div>
            <img :src="arrowDownRedIcon" alt="arrow down read icon" class="cursor-pointer" />
          </div>
        </div>
<!--        <transition name="zoom">-->
<!--          <div-->
<!--            v-if="modalOpen"-->
<!--            class="fixed inset-0 bg-[#92929d26] flex justify-center items-center z-50"-->
<!--            @click="closeModal"-->
<!--          >-->
<!--            <img-->
<!--              :src="currentImage"-->
<!--              alt="FullSize Image"-->
<!--              class="object-cover rounded-lg transition-transform duration-300 transform"-->
<!--            />-->
<!--          </div>-->
<!--        </transition>-->

        <transition name="zoom">
          <div
            v-if="modalOpen"
            class="fixed inset-0  bg-[#92929d26] flex justify-center items-center z-50"
            @click.self="closeModal"
          >
            <button  @click="closeModal" class="text-red-500 absolute top-20 right-20 transition">
              <img :src="xIcon" alt="Card Image" class="pr-4" />
            </button>
            <div class="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                :src="currentImage"
                alt="FullSize Image"
                class="object-cover rounded-t-lg max-h-[65vh] w-full"
              />
            </div>
          </div>
        </transition>
        <ul class="pl-2 pr-2 pt-2">
          <li
            v-for="(testCase, index) in feature.testCases"
            :key="testCase.testCaseId"
            @click="navigateToTestCaseDetail(testCase.testCaseId)"
            class="flex justify-between items-center rounded-md p-2 cursor-pointer min-h-12"
            :class="{ 'bg-gray-100': index % 2 !== 0 }"
          >
            <div class="flex items-center">
              <span>{{ testCase.description }}</span>
            </div>
            <div class="p-2 rounded-md" :class="priorityClass(testCase.priority)">
              <span>
                {{ testCase.priority }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import eyeIcon from '@/assets/eye.svg'
import arrowDownRedIcon from '@/assets/icondown-red.svg'
import HistoryPopup from '@/components/HistoryPopup.vue'

import xIcon from '@/assets/x-white.svg' // Define the structure of analyzeSpec
const route = useRoute()
const router = useRouter()

const selectedCategory = ref('All')

const selectedFeatures = computed(() => {
  const priorityOrder: Record<string, number> = { High: 1, Medium: 2, Low: 3 }

  if (selectedCategory.value === 'All') {
    const features = testCase.value.testSuites.flatMap((suite) => suite.features)

    const groupedFeatures = new Map<string, Array<TestCaseFeatureDetail>>()
    const groupedImages = new Map<string, string>()
    features.forEach((feature) => {
      const featureName = feature.name

      if (!groupedFeatures.has(featureName)) {
        groupedFeatures.set(featureName, [])
      }
      groupedFeatures.get(featureName)?.push(...feature.testCases)

      if (!groupedImages.has(featureName)) {
        groupedImages.set(featureName, feature.screenImage)
      }
    })

    const finalFeatures: TestCaseFeature[] = []
    for (const [name, testCases] of groupedFeatures) {
      finalFeatures.push({
        name,
        screenImage: groupedImages.get(name),
        testCases: testCases.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]),
      })
    }

    return finalFeatures
  }
  const suite = testCase.value.testSuites.find((suite) => suite.category === selectedCategory.value)
  return suite ? suite.features : []
})

const showPopup = ref(false)

const priorityClass = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'text-red-500 bg-red-100'
    case 'Medium':
      return 'text-yellow-500 bg-yellow-100'
    case 'Low':
      return 'text-green-500 bg-green-100'
    default:
      return 'text-gray-500 bg-gray-100'
  }
}

const getTestCaseLength = (category: string) => {
  const suite = testCase.value.testSuites.find((suite) => suite.category === category)
  return suite ? suite.features.reduce((acc, feature) => acc + feature.testCases.length, 0) : 0
}

const getAllTestCaseLength = () => {
  return testCase.value.testSuites.reduce(
    (acc, suite) =>
      acc + suite.features.reduce((acc, feature) => acc + feature.testCases.length, 0),
    0,
  )
}

const loading = ref(true)

interface TestCaseFeatureDetail {
  testCaseId: number
  description: string
  priority: string
}

interface TestCaseFeature {
  name: string
  screenImage: string
  testCases: TestCaseFeatureDetail[]
}

interface TestCase {
  category: string
  features: TestCaseFeature[]
}

interface TestSuite {
  title: string
  testSuites: TestCase[]
}

const testCase = ref<TestSuite>({
  title: 'login_feature.docx',
  testSuites: [
    {
      category: 'Functional',
      features: [
        {
          name: 'Create request',
          screenImage: 'image1.png',
          testCases: [
            {
              testCaseId: 1,
              description:
                "Create Space in the Space List Content Area without Space Created and don't set any configuration",
              priority: 'High',
            },
            {
              testCaseId: 2,
              description:
                'Create Space with Object Limitation configuration only and set all object types',
              priority: 'Medium',
            },
          ],
        },
        {
          name: 'Edit request',
          screenImage: 'image2.png',
          testCases: [
            {
              testCaseId: 3,
              description: "Edit 'Space info' section successfully with Admin permission",
              priority: 'High',
            },
          ],
        },
      ],
    },
    {
      category: 'Security',
      features: [],
    },
    {
      category: 'Performance',
      features: [],
    },
  ],
})

let intervalId: number
onMounted(async () => {
  await fetchTestSuiteData()
  if (loading.value) {
    intervalId = setInterval(fetchTestSuiteData, 3000)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

async function fetchTestSuiteData() {
  try {
    const response = await axios.get(
      `https://drs-rag-api-drs.app.linecorp-dev.com/api/v1/test-suites/manual/${route.params.id}`,
    )
    console.log('Response data:', response.data)
    if (response.data.testSuites.length > 0) {
      testCase.value = response.data
      loading.value = false
      clearInterval(intervalId)
    }
  } catch (error) {
    console.error('Error fetching automation data:', error)
  }
}

const navigateToTestCaseDetail = (testCaseId: number) => {
  router.push({ name: 'testcase', params: { id: testCaseId } })
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

const handleImageError = (event) => {
  // Provide a fallback image URL or a detailed image URL
  event.target.src = '/mars0-fe/banner.png'
}
</script>

<style scoped>
.btn-secondary {
  color: #44444f;
}

.btn-secondary:hover {
  background-color: #f3f4f6;
}

button:hover {
  background-color: #fff2f2;
}

.bg-red-custom:hover {
  background-color: #f87171;
}
.zoom-enter-active,
.zoom-leave-active {
  transition: transform 0.3s ease;
}
.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.6);
}
.zoom-enter-to,
.zoom-leave-from {
  transform: scale(1);
}
</style>
