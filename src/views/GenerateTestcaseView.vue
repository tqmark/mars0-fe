<template>
  <Loading v-if="loading" />
  <div v-if="!loading" class="p-4 space-y-4">
    <div class="flex space-x-4j justify-between gap-2.5">
      <div class="flex space-x-2">
      <button
        v-for="(suite, index) in testCase.testSuites"
        :key="index"
        class="px-4 py-2 rounded-md"
        :class="{
          'bg-red-custom text-white': selectedCategory === suite.category,
          'bg-gray-200': selectedCategory !== suite.category,
        }"
        @click="selectedCategory = suite.category"
      >
        {{ suite.category }}
      </button>
      </div>
    <div class="flex space-x-2">
      <button class="btn-secondary border px-4 py-2 rounded">
        <font-awesome-icon :icon="['fas', 'print']" />
        Export
      </button>
      <button @click="showPopup = true" class="btn-secondary border px-4 py-2 rounded">
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
      <div class="h-[50px] flex items-center justify-between mb-2 bg-[#fff2f2] pl-2 pr-2">
        <div class="flex">
          <h3 class="font-semibold text-header">{{ feature.name }}</h3>
        </div>
        <div class="flex gap-2">
          <img :src="eyeIcon" alt="eye-icon" />
          <button class="color-red-custom">View UI Screen</button>
          <img :src="arrowDownRedIcon" />
        </div>
      </div>
      <ul class="pl-2 pr-2 pt-2">
        <li
          v-for="testCase in feature.testCases"
          :key="testCase.testCaseId"
          @click="navigateToTestCaseDetail(testCase.testCaseId)"
          class="flex justify-between items-center my-4 cursor-pointer"
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
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Loading from '@/components/Loading.vue'

const route = useRoute()
const router = useRouter()
import eyeIcon from '@/assets/eye.svg'
import arrowDownRedIcon from '@/assets/icondown-red.svg'
import HistoryPopup from '@/components/HistoryPopup.vue'
const selectedCategory = ref('Functional')

const selectedFeatures = computed(() => {
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

const loading = ref(true)

const testCase = ref({
  title: 'login_feature.docx',
  testSuites: [
    {
      category: 'Functional',
      features: [
        {
          name: 'Create request',
          screen: 'image1.png',
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
          screen: 'image2.png',
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

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://drs-rag-api-drs.app.linecorp-dev.com/api/v1/test-suites/manual/${route.params.id}`,
    )
    testCase.value = response.data
  } catch (error) {
    console.error('Error fetching automation data:', error)
  } finally {
    loading.value = false
  }
})

const navigateToTestCaseDetail = (testCaseId: number) => {
  router.push({ name: 'testcase', params: { id: testCaseId } })
}
</script>
