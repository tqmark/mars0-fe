<template>
  <Loading v-if="loading" />
  <div v-if="!loading" class="p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-xl font-bold mb-10 pb-6">
      {{ analyzeSpec.title || analyzeSpec.wikiUrl.join(', ') }}
    </h1>

    <h2 class="text-xl font-bold mb-4">Key Summary</h2>
    <p class="pb-6 text-gray-600 pt-4">{{ analyzeSpec.keySummary }}</p>

    <hr class="border-black border-t-1 pb-6" />

    <h2 class="text-xl font-bold pb-4">Key Features and Capabilities</h2>
    <ul class="list-disc list-inside pb-6 font-light text-gray-600">
      <li v-for="(feature, index) in analyzeSpec.keyFeatures" :key="index">{{ feature }}</li>
    </ul>

    <h2 class="text-xl font-bold mb-4">Review and Recommendation</h2>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-left font-light text-gray-600">UI Screen</th>
          <th class="p-3 text-left jjllczfont-light text-gray-600">Recommendation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(review, index) in analyzeSpec.reviews" :key="index" class="border-t">
          <td class="p-3">
            <div class="justify-self-center">
              <img src="/banner.png" alt="UI Screen" class="w-64 h-64 object-cover rounded-lg" />
            </div>
          </td>
          <td class="p-3">
            <div>
              <h2
                v-if="review.category !== 'ui_ux'"
                class="font-bold pb-4 pt-4 pl-4 bg-gray-100 flex mb-4 rounded-md"
              >
                {{
                  review.category
                    .split('_')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                }}
              </h2>
              <h2 v-else class="font-bold pb-4 pt-4 pl-4 bg-gray-100 flex mb-4 rounded-md">
                UI/UX
              </h2>
            </div>
            <div
              v-for="(recommendation, rIndex) in review.recommendations"
              :key="rIndex"
              class="mb-4"
            >
              <h3 class="font-bold pb-4">{{ recommendation.title }}</h3>
              <ul class="list-disc list-inside pb-6 font-light text-gray-600">
                <li v-for="(detail, dIndex) in recommendation.details" :key="dIndex">
                  {{ detail }}
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { useRoute } from 'vue-router'
import Loading from '@/components/Loading.vue'

export default {
  components: { Loading },
  data() {
    return {
      analyzeSpec: {
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
          },
        ],
      },
      loading: false,
    }
  },
  mounted() {
    this.fetchSpecsData()
  },
  methods: {
    async fetchSpecsData() {
      this.loading = true
      try {
        const route = useRoute()
        const response = await axios.get(
          `https://drs-rag-api-drs.app.linecorp-dev.com/api/v1/specs/${route.params.id}`,
        )
        this.analyzeSpec = response.data
      } catch (error) {
        console.error('Error fetching automation data:', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
