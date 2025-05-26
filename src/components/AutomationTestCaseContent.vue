<template>
  <div class="w-3/4 p-6">
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
    <div class="mt-4">
      <h3 class="font-bold mb-2">SOURCE (input all Links used for this test case)</h3>
      <table class="min-w-full bg-white border rounded-md">
        <thead>
        <tr class="bg-red-500 text-white">
          <th class="py-2 px-4 w-1/12">ID</th>
          <th class="py-2 px-4">URL</th>
          <th class="py-2 px-4 w-1/12">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="i in 5" :key="i" class="border-b">
          <td class="py-2 px-4 text-center">{{ i }}</td>
          <td class="py-2 px-4">
            <input type="text" class="w-full border p-2 rounded" value="https://www.lazada.vn/products/pdp-i3417spm=a20a.10441748.0.0.77cd4f79CaP6yV" />
          </td>
          <td class="py-2 px-4 text-center">
            <button class="text-red-500">-</button>
          </td>
        </tr>
        </tbody>
      </table>
      <button class="text-red-500 border border-red-500 px-4 py-2 rounded mt-4">Add more</button>
    </div>
    <button class="text-white bg-red-500 px-6 py-2 rounded mt-4 float-right">Next</button>
  </div>
</template>
