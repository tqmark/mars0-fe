<script setup lang="ts">
import { ref } from 'vue'
import LeftIcon from '@/components/icon/LeftIcon.vue'
import RightIcon from '@/components/icon/RightIcon.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import youtubeIcon from '@/assets/youtube.svg'
const router = useRouter()
const url = ref('')

const navigateToSpec = (specsId: string) => {
  router.push({ name: 'analyze-specs', params: { id: specsId } })
}

const navigateToTestCase = (testSuiteId: string) => {
  router.push({ name: 'generate-testcases', params: { id: testSuiteId } })
}

const handleGenerateSpec = async () => {
  if (!url.value) {
    return
  }

  try {
    const response = await axios.post(
      `https://drs-rag-api-drs.app.linecorp-dev.com/api/v1/specs/review`,
      { wiki_url: url.value },
    )
    const { success, specs_id: specsId } = response.data || { success: false }
    if (success) {
      // Logic to handle spec generation
      navigateToSpec(specsId)
    }
  } catch (error) {
    console.error('Error fetching specs review data:', error)
  }
}
const handleGenerateTestCase = async () => {
  if (!url.value) {
    return
  }

  try {
    const response = await axios.post(
      `https://drs-rag-api-drs.app.linecorp-dev.com/api/v1/test-suites/manual/generate`,
      { wiki_url: url.value },
    )
    const { success, test_suite_id: testSuiteId } = response.data || { success: false }
    if (success) {
      // Logic to handle test case generation
      navigateToTestCase(testSuiteId)
    }
  } catch (error) {
    console.error('Error fetching specs review data:', error)
  }
}

</script>
<template>
  <section
    class="bg-cover relative bg-center p-8 flex justify-center items-center h-[540px]"
    style="background-image: url('/mars0-fe/banner.png')"
  >
    <div class="relative w-[42%]">
      <!-- Left Icon -->
      <div class="absolute top-[68px] left-[-170px] -mt-4 -ml-4 z-0">
        <LeftIcon />
      </div>

      <!-- Right Icon -->
      <div class="absolute top-[-95px] right-[-115px] -mt-4 -mr-4 z-0">
        <RightIcon />
      </div>

      <div class="relative p-6 bg-white rounded-[20px] shadow-md flex justify-between z-10">
        <div class="flex-1 mr-4">
          <input
            type="text"
            v-model="url"
            placeholder="Paste your link here"
            class="w-full p-2 border rounded-[6px] mb-2"
          />
          <div class="flex items-center justify-center mb-2">
            <hr class="flex-1 border-t" />
            <span class="mx-2 text-gray-500">or</span>
            <hr class="flex-1 border-t" />
          </div>
          <div class="p-4 border-1 border-orange-600 border-dashed rounded-[8px] bg-red-50 text-center">
            <span>Drop your file here | </span>
            <button class="text-red-500 underline">choose file</button>
          </div>
        </div>
        <div class="flex flex-col space-y-2 justify-between">
          <button @click="handleGenerateSpec" class="bg-red-custom text-white py-2 cursor-pointer px-4 rounded-[8px]">
            Review specs
          </button>
          <button @click="handleGenerateTestCase" class="bg-red-custom text-white cursor-pointer py-2 px-4 rounded-[8px]">
            Generate test case
          </button>
          <button class="bg-red-custom text-white py-2 cursor-pointer px-4 rounded-[8px]">
            Generate web element
          </button>
        </div>
      </div>
    </div>
    <img :src="youtubeIcon" alt="Card Image" class="absolute bottom-8 left-25" />

  </section>
</template>
