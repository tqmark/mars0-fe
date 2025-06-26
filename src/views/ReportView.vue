<template>
  <div class="p-8 space-y-8 bg-gray-100">
    <div class="grid grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold">Bug Count</h2>
        <!-- Bug Count Chart -->
        <canvas id="bugCountChart"></canvas>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold">Conversion</h2>
        <!-- Conversion Chart -->
        <canvas id="conversionChart"></canvas>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold">Test Case</h2>
        <!-- Test Case Chart -->
        <canvas id="testCaseChart"></canvas>
        <ul class="mt-4">
          <li class="flex items-center">
            <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Pass
          </li>
          <li class="flex items-center">
            <span class="w-3 h-3 bg-red-500 rounded-full mr-2"></span> Fail
          </li>
        </ul>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold">Bug Type</h2>
        <!-- Bug Type Chart -->
        <canvas id="bugTypeChart"></canvas>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold">Status</h2>
      <table class="min-w-full mt-4">
        <thead>
        <tr class="bg-red-500 text-white">
          <th class="py-2 px-4">Name</th>
          <th class="py-2 px-4">File</th>
          <th class="py-2 px-4">Category</th>
          <th class="py-2 px-4">Author</th>
          <th class="py-2 px-4">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in tableData" :key="index" class="text-center">
          <td class="py-2 px-4">{{ item.name }}</td>
          <td class="py-2 px-4">{{ item.file }}</td>
          <td class="py-2 px-4">{{ item.category }}</td>
          <td class="py-2 px-4">{{ item.author }}</td>
          <td class="py-2 px-4">{{ item.status }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      tableData: [
        { name: 'Test_Case_1', file: 'PDF', category: 'App', author: 'Kong', status: 'IN PROGRESS' },
        { name: 'Test_Case_1', file: 'JPEG', category: 'Web', author: 'Robug', status: 'IN PROGRESS' },
        { name: 'Test_Case_1', file: 'URL', category: 'Web', author: 'Robug', status: 'IN PROGRESS' },
      ],
    };
  },
  methods: {
    createCharts() {
      new Chart(document.getElementById('bugCountChart'), {
        type: 'bar',
        data: {
          labels: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan'],
          datasets: [{
            label: 'Bugs',
            data: [30, 70, 50, 60, 40],
            backgroundColor: 'rgba(220, 38, 38, 0.5)',
            borderColor: 'rgba(220, 38, 38, 1)',
            borderWidth: 1,
          }],
        },
      });

      new Chart(document.getElementById('conversionChart'), {
        type: 'doughnut',
        data: {
          labels: ['Conversion'],
          datasets: [{
            data: [27, 73],
            backgroundColor: ['rgba(220, 38, 38, 1)', 'rgba(220, 38, 38, 0.1)'],
          }],
        },
      });

      new Chart(document.getElementById('testCaseChart'), {
        type: 'doughnut',
        data: {
          labels: ['Pass', 'Fail'],
          datasets: [{
            data: [60, 40],
            backgroundColor: ['rgba(34, 197, 94, 1)', 'rgba(220, 38, 38, 1)'],
          }],
        },
      });

      new Chart(document.getElementById('bugTypeChart'), {
        type: 'bar',
        data: {
          labels: ['Critical', 'High', 'Medium', 'Low', 'Cosmetic'],
          datasets: [{
            label: 'Bugs',
            data: [150, 200, 100, 50, 25],
            backgroundColor: 'rgba(220, 38, 38, 0.5)',
            borderColor: 'rgba(220, 38, 38, 1)',
            borderWidth: 1,
          }],
        },
      });
    },
  },
  mounted() {
    this.createCharts();
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
