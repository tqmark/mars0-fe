<template>
  <div class="flex">
    <div
      :class="[
        'bg-red-500 h-screen text-white transition-all duration-300',
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
          class="p-4 hover:bg-red-600 cursor-pointer flex items-center"
        >
          <i class="icon-dashboard mr-2"></i> <span v-if="!isCollapsed">Dashboard</span>
        </li>
        <li>
          <div
            @click="toggleSection('inventory')"
            class="p-4 hover:bg-red-600 cursor-pointer flex items-center justify-between"
          >
            <span><i class="icon-folder mr-2"></i> <span v-if="!isCollapsed">Inventory</span></span>
            <span v-if="expandedSection === 'inventory' && !isCollapsed">-</span>
            <span v-else-if="!isCollapsed">+</span>
          </div>
          <ul v-if="expandedSection === 'inventory' && !isCollapsed" class="pl-8">
            <li class="py-2 hover:bg-red-600 cursor-pointer">
              <RouterLink to="/analyze-specs">Specs</RouterLink>
            </li>
            <li class="py-2 hover:bg-red-600 cursor-pointer">Manual test case</li>
            <li class="py-2 hover:bg-red-600 cursor-pointer">Automation test case</li>
            <li class="py-2 hover:bg-red-600 cursor-pointer">Element Locator</li>
          </ul>
        </li>
        <li>
          <div
            @click="toggleSection('analyze')"
            class="p-4 hover:bg-red-600 cursor-pointer flex items-center justify-between"
          >
            <span><i class="icon-analyze mr-2"></i> <span v-if="!isCollapsed">Analyze</span></span>
            <span v-if="expandedSection === 'analyze' && !isCollapsed">-</span>
            <span v-else-if="!isCollapsed">+</span>
          </div>
          <ul v-if="expandedSection === 'analyze' && !isCollapsed" class="pl-8">
            <li class="py-2 hover:bg-red-600 cursor-pointer">
              <RouterLink to="/analyze-specs">Specs</RouterLink>
            </li>
            <li class="py-2 hover:bg-red-600 cursor-pointer">
              <RouterLink to="/analyze-testcases">Generate test case</RouterLink>
            </li>
            <li class="py-2 hover:bg-red-600 cursor-pointer">Element detector</li>
          </ul>
        </li>
        <li class="p-4 hover:bg-red-600 cursor-pointer flex items-center">
          <i class="icon-reports mr-2"></i> <span v-if="!isCollapsed">Reports</span>
        </li>
      </ul>
      <div class="mt-auto p-4">
        <div class="py-2 hover:bg-red-600 cursor-pointer flex items-center">
          <i class="icon-help mr-2"></i>  <RouterLink to="/demo" v-if="!isCollapsed">Demo</RouterLink>
        </div>
        <div class="py-2 hover:bg-red-600 cursor-pointer flex items-center">
          <i class="icon-help mr-2"></i><RouterLink to="/confirmation" v-if="!isCollapsed">confirmation</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LogoIconWhite from '@/components/icon/LogoIconWhite.vue'

const expandedSection = ref(null)
const isCollapsed = ref(false)

const toggleSection = (section: any) => {
  expandedSection.value = expandedSection.value === section ? null : section
}

const toggleNavbar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped></style>
