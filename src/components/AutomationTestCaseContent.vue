<template>
  <div class="flex justify-between items-center mb-4">
    <div class="flex space-x-4">
      <button class="text-white bg-red-500 px-4 py-2 rounded">Design</button>
      <button class="text-red-500 border border-red-500 px-4 py-2 rounded">Script</button>
    </div>
    <div class="flex space-x-4">
      <button class="text-red-500 border border-red-500 px-4 py-2 rounded">Edit</button>
      <button class="text-white bg-red-500 px-4 py-2 rounded">Run</button>
    </div>
  </div>
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
          <input type="text" v-model="url.link" class="w-full border p-2 rounded" />
        </td>
        <td class="py-2 px-4 text-center">
          <button @click="removeUrl(index)" class="text-red-500">-</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="flex justify-between mt-4">
      <button @click="addUrl" class="text-red-500 border border-red-500 px-4 py-2 rounded">Add more</button>
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
      <tr class="border-b">
        <td class="py-2 px-4 text-gray-800">1. Navigate to URL</td>
        <td class="py-2 px-4 text-gray-500">https://google.com</td>
      </tr>
      <tr class="border-b">
        <td class="py-2 px-4 text-gray-800">2. Set text → object.inputSearch</td>
        <td class="py-2 px-4 text-gray-800 bg-gray-100">Total of days on 2024 Feb</td>
      </tr>
      <tr class="border-b">
        <td class="py-2 px-4 text-gray-800">3. Verify data → object.days</td>
        <td class="py-2 px-4 text-gray-800 bg-gray-100">29</td>
      </tr>
      <tr>
        <td class="py-2 px-4 text-gray-800">4. Close browser</td>
        <td class="py-2 px-4"></td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {
  data() {
    return {
      urls: [
        { link: "https://www.lazada.vn/products/pdp-i3417spm=a20a.10441748.0.0.77cd4f79CaP6yV" },
        { link: "https://www.lazada.vn/products/pdp-i3417spm=a20a.10441748.0.0.77cd4f79CaP6yV" },
        { link: "https://www.lazada.vn/products/pdp-i3417spm=a20a.10441748.0.0.77cd4f79CaP6yV" },
        { link: "https://www.lazada.vn/products/pdp-i3417spm=a20a.10441748.0.0.77cd4f79CaP6yV" },
        { link: "https://www.lazada.vn/products/pdp-i3417spm=a20a.10441748.0.0.77cd4f79CaP6yV" }
      ]
    };
  },
  methods: {
    addUrl() {
      this.urls.push({ link: "" });
    },
    removeUrl(index) {
      this.urls.splice(index, 1);
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
