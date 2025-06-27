<template>
  <div class="relative min-h-screen bg-white">
    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
    >
      <img src="@/assets/cua_new3.gif" alt="Loading" class="max-w-3/12" />
    </div>

    <div class="flex justify-between items-center mb-4">
      <div class="flex space-x-1 tab-group">
        <button
          @click="activeTab = 'design'"
          :class="{
            active: activeTab === 'design',
          }"
          class="px-4 py-2 rounded tab-btn"
        >
          Design
        </button>
        <button
          @click="activeTab = 'code'"
          :class="{
            active: activeTab === 'code',
          }"
          class="px-4 py-2 rounded tab-btn"
        >
          Script
        </button>
      </div>
      <div class="flex space-x-2">
        <button class="btn-secondary border px-4 py-2 rounded">
          <font-awesome-icon :icon="['fas', 'pen']" />
          Edit
        </button>
        <button
          @click="generateAutomation()"
          class="btn bg-red-custom text-white border px-4 py-2 rounded"
        >
          <font-awesome-icon :icon="['fas', 'rocket']" />
          Generate Automation
        </button>
        <button @click="runAutomation()" class="btn bg-red-custom text-white px-4 py-2 rounded">
          <font-awesome-icon :icon="['fas', 'play']" />
          Run
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'design'">
      <h2 class="text-2xl font-bold">{{ testAutomation.testCaseName }}</h2>
      <p>{{ testAutomation.description }}</p>
      <div class="w-full mt-8">
        <h3 class="font-bold mb-4">SOURCE (input all Links used for this test case)</h3>
        <table class="min-w-full border-collapse">
          <thead>
            <tr>
              <th class="bg-red-custom text-white py-2 px-4 rounded-tl-lg rounded-bl-lg w-1/12">
                ID
              </th>
              <th class="bg-red-custom text-white py-2 px-4">URL</th>
              <th class="bg-red-custom text-white py-2 px-4 rounded-tr-lg rounded-br-lg w-1/12">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(url, index) in urls" :key="index" class="">
              <td class="py-2 px-4 text-center text-gray-800">{{ index + 1 }}</td>
              <td class="py-2 px-4">
                <input
                  type="text"
                  v-model="urls[index]"
                  class="w-full border p-2 rounded input-grey"
                />
              </td>
              <td class="py-2 px-4 text-center">
                <button @click="removeUrl(index)" class="btn-secondary px-4 py-2">-</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="errorMessage" class="text-red-custom mt-2">{{ errorMessage }}</div>
        <div class="flex justify-between mt-4">
          <button @click="addUrl" class="btn-secondary border px-4 py-2 rounded btn-secondary">
            Add more
          </button>
        </div>
      </div>

      <div class="w-full mt-8">
        <h2 class="text-lg font-bold mb-4">STEPS</h2>
        <table class="min-w-full border-collapse striped">
          <thead>
            <tr>
              <th class="bg-red-custom text-white py-2 px-4 rounded-tl-lg rounded-bl-lg">
                ACTION / TARGET
              </th>
              <th class="bg-red-custom text-white py-2 px-4">VALUE</th>
              <th class="bg-red-custom text-white py-2 px-4 rounded-tr-lg rounded-br-lg">
                RUN RESULT
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="action in testAutomation.actionList.actions" :key="action.id" class="">
              <td class="py-2 px-4 text-gray-800">
                {{ action.action }} {{ action.itemAlias ? ' -> ' + action.itemAlias : '' }}
              </td>
              <td class="py-2 px-4 text-gray-500">{{ action.value || '' }}</td>
              <td class="py-2 px-4" style="text-align: center">
                <p v-if="action.result === 'PASSED'">
                  <font-awesome-icon :icon="['fas', 'circle-check']" class="passed ml-2" />
                </p>
                <p v-if="action.result === 'FAILED'">
                  <font-awesome-icon :icon="['fas', 'circle-xmark']" class="failed ml-2" />
                </p>
              </td>
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
        <CodeBlock :code="testAutomation.generatedCode" language="java" />
      </div>
    </div>

    <!-- RESULT & CONSOLE -->
    <div class="bg-white w-full mt-8 mb-16">
      <h2 class="text-lg font-bold mb-4">AUTOMATION Result</h2>
      <!-- Tabs -->
      <div class="flex space-x-1 tab-group">
        <button
          @click="activeResultTab = 'result'"
          :class="{ active: activeResultTab === 'result' }"
          class="px-4 py-2 rounded tab-btn"
        >
          TEST RESULTS
        </button>
        <button
          @click="activeResultTab = 'console'"
          :class="{ active: activeResultTab === 'console' }"
          class="px-4 py-2 rounded tab-btn"
        >
          CONSOLE
        </button>
      </div>

      <!-- Content -->
      <div v-if="activeResultTab === 'result'">
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="font-semibold text-lg mr-2">
            TEST CASE RESULT:
            <span
              :class="{
                'text-green-500': runResult.finalResult === 'PASSED',
                'text-red-500': runResult.finalResult !== 'PASSED',
              }"
              class="ml-2"
              >{{ runResult.finalResult }}</span
            >
            <span v-if="runResult.finalResult === 'PASSED'"
              ><font-awesome-icon :icon="['fas', 'circle-check']" class="passed ml-2"
            /></span>
            <span v-if="runResult.finalResult === 'FAILED'"
              ><font-awesome-icon :icon="['fas', 'circle-xmark']" class="failed ml-2"
            /></span>
          </p>
        </div>
      </div>
      <div v-if="activeResultTab === 'console'">
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="font-semibold text-lg">CONSOLE:</p>
          <textarea
            v-model="runResult.error"
            class="w-full min-h-100 border p-2 rounded font-mono text-sm"
            readonly
          ></textarea>
        </div>
      </div>
    </div>
  </div>
  <div ref="bottomEl"></div>
  <footer class="p-2 text-xl text-gray-800 font-bold text-center"></footer>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import axios from 'axios'
import 'prismjs/themes/prism.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css' // Default theme, you can choose another
import 'prismjs/plugins/line-numbers/prism-line-numbers.css' // Line numbers CSS
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import CodeBlock from '@/components/CodeBlock.vue' // Line numbers plugin
export default {
  components: { CodeBlock },
  data() {
    return {
      activeTab: 'design',
      activeResultTab: 'result',
      testAutomation: {
        urls: '',
        id: null,
        actionList: { actions: [{ id: null, result: '' }] },
        generatedCode: '',
      },
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
        console.log(this.errorMessage)
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

        this.testAutomation.actionList.actions.forEach((action) => {
          if (action.id != null && this.runResult.hasOwnProperty(action.id)) {
            action.result = this.runResult[action.id]
          } else {
            action.result = 'FAILED'
          }
        })
      } catch (error) {
        console.error('Error Running automation:', error)
      } finally {
        this.loading = false
        this.$refs.bottomEl?.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
}
</script>

<style>
@import './automation.css';
</style>
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
