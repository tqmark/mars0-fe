<script lang="ts" setup>
import { toRefs } from 'vue';
import { useRoute } from 'vue-router';
import BackIcon from '@/components/icon/BackIcon.vue'

const route = useRoute();
const { id } = toRefs(route.params);

const generateTC = () => {
  // Logic to generate test case
  console.log(`Generating test case for ID: ${id.value}`);
};
</script>


<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-4">
      <div class="flex space-x-1 ">
          <BackIcon />
      </div>
      <div class="flex space-x-2">
        <button class="btn-secondary border px-4 py-2 rounded"><font-awesome-icon :icon="['fas', 'pen']" /> Edit</button>
        <button
          class="btn bg-red-custom text-white border px-4 py-2 rounded"
        >
          Save to Inventory
        </button>
        <button @click="generateTC" class="btn bg-red-custom text-white px-4 py-2 rounded">
         Generate TC
        </button>
      </div>
    </div>
    <div class="pb-5 border-b-1 border-b-gray-300">
      <h2 class="text-lg font-bold">SUMMARY {{id}}</h2>
      <p>Validate that users can log in successfully with correct credentials and receive appropriate error messages with incorrect credentials</p>
    </div>

    <div class="grid grid-cols-4 gap-12 my-10">
      <div class ="border-b-1 border-b-gray-300">
        <h3 class="font-semibold">TYPE</h3>
        <p>Automated</p>
      </div>
      <div class ="border-b-1 border-b-gray-300">
        <h3 class="font-semibold">PRIORITY</h3>
        <p>5 - Must Test</p>
      </div>
      <div class ="border-b-1 border-b-gray-300">
        <h3 class="font-semibold">ESTIMATE</h3>
        <p>None</p>
      </div>
      <div class ="border-b-1 border-b-gray-300">
        <h3 class="font-semibold">MILESTONE</h3>
        <p>None</p>
      </div>
      <div class ="border-b-1 border-b-gray-300">
        <h3 class="font-semibold">REFERENCES</h3>
        <p>MP-1790</p>
      </div>
      <div class ="border-b-1 border-b-gray-300">
        <h3 class="font-semibold">TAGS</h3>
        <p>1.3</p>
      </div>
      <div class ="border-b-1 border-b-gray-300">
        <h3 class="font-semibold">AUTOMATION TYPE</h3>
        <p>None</p>
      </div>
    </div>

    <div class="pb-5 border-b-1 border-b-gray-300">
      <h3 class="font-bold">PRE-CONDITION</h3>
      <p>Available Admin account</p>
    </div>

    <div class="mt-10">
      <h3 class="font-bold my-4">STEPS</h3>
      <table class="min-w-full bg-white">
        <thead class="bg-red-500 text-white">
        <tr class="bg-red-custom text-white">
          <th class="rounded-s-lg w-1/2 p-2 text-left">STEP</th>
          <th dir="rtl"  class="rounded-s-lg w-1/2 p-2 text-left">EXPECTED RESULT</th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-gray-100">
          <td class="p-4">1. When user opens Browser And navigates to system URL</td>
          <td class="p-4">Then Login screen is displayed</td>
        </tr>
        <tr>
          <td class="p-4">2. When user input valid data on all fields</td>
          <td class="p-4">Then all fields are displayed data</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="p-4">3. When user clicks Login button</td>
          <td class="p-4">Then Homepage is displayed</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
