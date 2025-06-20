<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <!-- Tabs -->
    <div class="flex justify-around border-b mb-4">
      <button class="py-2 px-4 text-gray-500 hover:text-red-500 focus:outline-none">
        PROBLEMS
      </button>
      <button class="py-2 px-4 text-gray-500 hover:text-red-500 focus:outline-none">
        OUTPUT
      </button>
      <button class="py-2 px-4 text-red-500 border-b-2 border-red-500 focus:outline-none">
        TEST RESULTS
      </button>
      <button class="py-2 px-4 text-gray-500 hover:text-red-500 focus:outline-none">
        TERMINALS
      </button>
      <button class="py-2 px-4 text-gray-500 hover:text-red-500 focus:outline-none">
        PORTS
      </button>
    </div>

    <!-- Content -->
    <div class="p-4 bg-gray-50 rounded-lg">
      <p class="font-semibold text-lg">
        Create space api testing › @api @space should create space with all configurations successfully
        <span class="text-green-500 ml-2">✔️</span>
      </p>
      <p class="text-gray-500 mt-1">
        api/media_storage/media_portal/api_test_create_space_admin.spec.ts:28
      </p>
      <div class="flex space-x-2 mt-3">
        <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">Manual</span>
        <span class="bg-yellow-100 text-yellow-500 px-3 py-1 rounded-full text-sm">Web</span>
        <span class="bg-green-100 text-green-500 px-3 py-1 rounded-full text-sm">Chrome</span>
      </div>
    </div>
  </div>
</template>
