<template>
  <div class="relative min-h-screen">
    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
    >
      <img src="@/assets/cua4_loading.gif" alt="Loading" class="max-w-1/2" />
    </div>

    <div class="flex justify-between items-center mb-4">
      <div class="flex space-x-4">
        <button
          @click="activeTab = 'design'"
          :class="{
            'text-white bg-red-500': activeTab === 'design',
            'text-red-500 border border-red-500': activeTab !== 'design',
          }"
          class="px-4 py-2 rounded"
        >
          Design
        </button>
        <button
          @click="activeTab = 'code'"
          :class="{
            'text-white bg-red-500': activeTab === 'code',
            'text-red-500 border border-red-500': activeTab !== 'code',
          }"
          class="px-4 py-2 rounded"
        >
          Script
        </button>
      </div>
      <div class="flex space-x-4">
        <button class="text-red-500 border border-red-500 px-4 py-2 rounded">Edit</button>
        <button
          @click="generateAutomation()"
          class="text-red-500 border border-red-500 px-4 py-2 rounded"
        >
          Generate Automation
        </button>
        <button @click="runAutomation()" class="text-white bg-red-500 px-4 py-2 rounded">
          Run
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'design'">
      <h2 class="text-2xl font-bold">Generated test case,...</h2>
      <p>Check the total number of days in February to know if the year is a leap year</p>
      <div class="w-full mt-8">
        <h3 class="font-bold mb-4">SOURCE (input all Links used for this test case)</h3>
        <table class="min-w-full border-collapse">
          <thead>
            <tr>
              <th class="bg-red-500 text-white py-2 px-4 rounded-tl-md w-1/12">ID</th>
              <th class="bg-red-500 text-white py-2 px-4">URL</th>
              <th class="bg-red-500 text-white py-2 px-4 rounded-tr-md w-1/12">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(url, index) in urls" :key="index" class="border-b">
              <td class="py-2 px-4 text-center text-gray-800">{{ index + 1 }}</td>
              <td class="py-2 px-4">
                <input type="text" v-model="urls[index]" class="w-full border p-2 rounded" />
              </td>
              <td class="py-2 px-4 text-center">
                <button @click="removeUrl(index)" class="text-red-500">-</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
        <div class="flex justify-between mt-4">
          <button @click="addUrl" class="text-red-500 border border-red-500 px-4 py-2 rounded">
            Add more
          </button>
          <button class="text-white bg-red-500 px-6 py-2 rounded">Next</button>
        </div>
      </div>

      <div class="w-full mt-8">
        <h2 class="text-lg font-bold mb-4">STEPS</h2>
        <table class="min-w-full border-collapse">
          <thead>
            <tr>
              <th class="bg-red-500 text-white py-2 px-4 rounded-tl-md">ACTION / TARGET</th>
              <th class="bg-red-500 text-white py-2 px-4 rounded-tr-md">VALUE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="action in testAutomation.actionList.actions" :key="action.id" class="border-b">
              <td class="py-2 px-4 text-gray-800">
                {{ action.action }} {{ action.itemAlias ? ' -> ' + action.itemAlias : '' }}
              </td>
              <td class="py-2 px-4 text-gray-500">{{ action.value || '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="activeTab === 'code'">
      <h2 class="text-2xl font-bold mb-4">Generated Code</h2>
      <div class="w-full mt-8">
        <!--
        <pre><code class="language-java" v-html="generatedCode"></code></pre>
        -->
        <textarea
          v-model="testAutomation.generatedCode"
          class="w-full min-h-200 border p-2 rounded font-mono text-sm"
          readonly
        ></textarea>
      </div>
    </div>

    <!-- RESULT & CONSOLE -->
    <div class="p-6 bg-white rounded-lg">
      <!-- Tabs -->
      <div class="flex justify-around border-b mb-4">
        <button
          @click="activeResultTab = 'result'"
          :class="{
            'text-red-500 border-b-2 border-red-500': activeResultTab === 'result',
            'text-gray-500 hover:text-red-500': activeResultTab !== 'result',
          }"
          class="py-2 px-4 focus:outline-none"
        >
          TEST RESULTS
        </button>
        <button
          @click="activeResultTab = 'console'"
          :class="{
            'text-red-500 border-b-2 border-red-500': activeResultTab === 'console',
            'text-gray-500 hover:text-red-500': activeResultTab !== 'console',
          }"
          class="py-2 px-4 focus:outline-none"
        >
          CONSOLE
        </button>
      </div>

      <!-- Content -->
      <div v-if="activeResultTab === 'result'">
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="font-semibold text-lg">
            TEST CASE RESULT:
            <span
              :class="{
                'text-green-500': runResult.finalResult === 'PASSED',
                'text-red-500': runResult.finalResult !== 'PASSED',
              }"
              class="ml-2"
              >{{ runResult.finalResult }}</span
            >
          </p>
        </div>
      </div>
      <div v-if="activeResultTab === 'console'">CONSOLE</div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import axios from 'axios'

export default {
  data() {
    return {
      activeTab: 'design',
      activeResultTab: 'result',
      testAutomation: { urls: '', id: null, actionList: { actions: [{}] }, generatedCode: '' },
      urls: [''],
      loading: false,
      errorMessage: '',
      runResult: {},
    }
  },
  props: {
    id: {
      type: String as PropType<string>,
      required: true,
    },
  },
  mounted() {
    this.fetchAutomationData()
  },
  methods: {
    addUrl() {
      this.urls.push('')
    },
    removeUrl(index: number) {
      this.urls.splice(index, 1)
    },
    async fetchAutomationData() {
      this.loading = true
      try {
        const response = await axios.get(`http://localhost:8080/api/automation/${this.id}`)
        this.testAutomation = response.data
        console.log(this.testAutomation)

        // Convert the URLs string into an array of objects
        this.urls = this.testAutomation.urls.split('|')
        //generatedCode.value = hljs.highlight(data.generatedCode, { language: 'java' }).value;
      } catch (error) {
        console.error('Error fetching automation data:', error)
      } finally {
        this.loading = false
      }
    },
    async generateAutomation() {
      this.errorMessage = ''
      if (!this.urls.every((url) => url.trim() !== '')) {
        this.errorMessage = 'Please ensure all URLs are filled out.'
        console.log(this.errorMessage);
        return
      }

      this.loading = true
      try {
        const response = await axios.post('http://localhost:8080/api/automation/gen', {
          targetUrls: this.urls,
          testCaseId: this.id,
        })

        this.testAutomation = response.data
        console.log(this.testAutomation)
        //generatedCode.value = hljs.highlight(data.generatedCode, { language: 'java' }).value;
      } catch (error) {
        console.error('Error generating automation:', error)
      } finally {
        this.loading = false
      }
    },
    async runAutomation() {
      this.loading = true
      try {
        const response = await axios.post(
          `http://localhost:8080/api/automation/${this.testAutomation.id}/run`,
        )
        this.runResult = response.data
        console.log(this.runResult)
      } catch (error) {
        console.error('Error Running automation:', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
/* Ensure the loading overlay covers the entire screen */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.75);
  z-index: 50;
}

.min-h-screen {
  min-height: 100vh;
}
</style>
