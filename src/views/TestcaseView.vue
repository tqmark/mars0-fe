<script lang="ts" setup>
import { toRefs } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { id } = toRefs(route.params);
</script>


<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <div class="mb-4">
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

    <div class="mb-4">
      <h3 class="font-bold">PRE-CONDITION</h3>
      <p>Available Admin account</p>
    </div>

    <div class="mt-10">
      <h3 class="font-bold my-4">STEPS</h3>
      <table class="min-w-full border-separate border-spacing-y-2.5 bg-white">
        <thead class="bg-red-500 text-white">
        <tr class="bg-red-custom text-white">
          <th class="rounded-s-lg w-1/2 p-2 text-left">STEP</th>
          <th dir="rtl"  class="rounded-s-lg w-1/2 p-2 text-left">EXPECTED RESULT</th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-gray-100">
          <td class="p-2">1. When user opens Browser And navigates to system URL</td>
          <td class="p-2">Then Login screen is displayed</td>
        </tr>
        <tr>
          <td class="p-2">2. When user input valid data on all fields</td>
          <td class="p-2">Then all fields are displayed data</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="p-2">3. When user clicks Login button</td>
          <td class="p-2">Then Homepage is displayed</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
