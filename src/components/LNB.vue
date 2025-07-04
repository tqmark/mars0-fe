<script setup lang="ts">
import { computed, ref } from 'vue'
import LogoIconWhite from '@/components/icon/LogoIconWhite.vue'
import { useRoute } from 'vue-router'
import dashboardIcon from '@/assets/dashboard.svg'
import inventoryIcon from '@/assets/inventory.svg'
import analyzeIcon from '@/assets/analyze.svg'
import arrowDownIcon from '@/assets/arrowDown.svg'
import settingIcon from '@/assets/setting.svg'
import helpIcon from '@/assets/help.svg'
import reportIcon from '@/assets/report.svg'


const expandedSection = ref(null)
const isCollapsed = ref(false)
const route = useRoute()
const toggleSection = (section: any) => {
  expandedSection.value = expandedSection.value === section ? null : section
}

const toggleNavbar = () => {
  isCollapsed.value = !isCollapsed.value
}

const isAnalyzeSpec = computed(() => {
  console.log('Current route:', route.path)
  return route.path.includes('/analyze-specs')
})

const isAutomationTestCase = computed(() => {
  return route.path.includes('/auto-testcase')
})

const isAnalyzeTestCase = computed(() => {
  return route.path === '/generate-testcases'
})
const isDemo = computed(() => {
  return route.path === '/demo'
})
</script>

<style scoped></style>

<template>
  <div class="flex">
    <div
      :class="[
        'bg-red-custom h-screen text-white transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
      ]"
    >
      <div class="p-4 text-xl font-bold flex items-center">
        <button @click="toggleNavbar" class="focus:outline-none">
          <i class="icon-toggle text-4xl">
            <logo-icon-white />
          </i>
        </button>
        <RouterLink to="/" v-if="!isCollapsed" class="font-extrabold pl-2">MARS</RouterLink>
      </div>
      <ul>
        <li
          @click="toggleSection('dashboard')"
          class="p-4 pl-7 hover:bg-red-600 cursor-pointer flex items-center"
        >
          <img :src="dashboardIcon" alt="Card Image" class="pr-4" />
          <span v-if="!isCollapsed">Dashboard</span>
        </li>
        <li>
          <div
            @click="toggleSection('inventory')"
            class="p-4 pl-7 bg-[rgba(255,255,255,0.13)] hover:bg-red-600 cursor-pointer flex items-center justify-between"
          >
            <div class="flex">
              <img :src="inventoryIcon" alt="Card Image" class="pr-4" />
              <span>Inventory</span>
            </div>
            <img
              v-if="expandedSection === 'inventory' && !isCollapsed"
              :src="arrowDownIcon"
              alt="Arrow Icon"
              class="pr-4"
            />
            <img
              v-else-if="!isCollapsed"
              :src="arrowDownIcon"
              alt="Arrow Icon"
              class="rotate-180 pl-4"
            />
          </div>
          <ul v-if="expandedSection === 'inventory' && !isCollapsed" class="pl-8">
            <li class="py-2 pl-5 mr-8 hover:bg-red-600 cursor-pointer  border-l-2 border-l-[rgba(255,255,255,0.13)]">
              <RouterLink to="/analyze-specs">Specs</RouterLink>
            </li>
            <li class="py-2 pl-5 mr-8 hover:bg-red-600 cursor-pointer  border-l-2 border-l-[rgba(255,255,255,0.13)]">Manual test case</li>
            <li class="py-2 pl-5 mr-8 hover:bg-red-600 cursor-pointer  border-l-2 border-l-[rgba(255,255,255,0.13)]"
                :class="{ 'bg-red-600 ': isAutomationTestCase,
                'border-l-white': isAutomationTestCase}">Automation test case</li>
            <li class="py-2 pl-5 mr-8 hover:bg-red-600 cursor-pointer  border-l-2 border-l-[rgba(255,255,255,0.13)]">Element Locator</li>
          </ul>
        </li>
        <li>
          <div
            @click="toggleSection('analyze')"
            class="p-4 pl-7 hover:bg-red-600 cursor-pointer flex items-center justify-between"
          >
            <div class="flex">
              <img :src="analyzeIcon" alt="Card Image" class="pr-4" />
              <span v-if="!isCollapsed">Analyze</span>
            </div>
            <img
              v-if="expandedSection === 'analyze' && !isCollapsed"
              :src="arrowDownIcon"
              alt="Arrow Icon"
              class="pr-4"
            />
            <img
              v-else-if="!isCollapsed"
              :src="arrowDownIcon"
              alt="Arrow Icon"
              class="rotate-180 pl-4"
            />
          </div>
          <ul v-if="expandedSection === 'analyze' && !isCollapsed" class="pl-8">

            <li
              class="py-2 pl-5 mr-8 hover:bg-red-600 cursor-pointer border-l-2 border-l-[rgba(255,255,255,0.13)]"
              :class="{ 'bg-red-600': isAnalyzeSpec,
                'border-l-white': isAnalyzeSpec,
            }"

            >
              <RouterLink to="/analyze-specs">Specs</RouterLink>
            </li>
            <li class="py-2 pl-5 mr-8 hover:bg-red-600 cursor-pointer  border-l-2 border-l-[rgba(255,255,255,0.13)]"
            :class="{ 'bg-red-600 ': isAnalyzeTestCase,
                'border-l-white': isAnalyzeTestCase}"
               >
              <RouterLink to="/generate-testcases">Generate test case</RouterLink>
            </li>
            <li class="py-2 pl-5 mr-8 hover:bg-red-600 cursor-pointer  border-l-2 border-l-[rgba(255,255,255,0.13)]">Element detector</li>
          </ul>
        </li>
        <li class="p-4 pl-7 hover:bg-red-600 cursor-pointer flex items-center">
          <img :src="reportIcon" alt="Card Image" class="pr-4" />
          <RouterLink v-if="!isCollapsed" to="/report">Reports</RouterLink>

        </li>
      </ul>
      <div class="absolute bottom-0 left-0 py-10 border-t-1 border-t-gray-300 w-64">
        <ul>
        <li
          @click="toggleSection('dashboard')"
          class="p-4 hover:bg-red-600 cursor-pointer flex items-center"
        >
          <img :src="settingIcon" alt="Card Image" class="pr-4 w-[45px]" />
          <span>Setting</span>
        </li>
        <li
          @click="toggleSection('dashboard')"
          class="p-4 hover:bg-red-600 cursor-pointer flex items-center"
        >
          <img :src="helpIcon" alt="Card Image" class="pr-4 w-[45px]" />
          <span>help</span>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>
