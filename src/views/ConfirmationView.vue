<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-lg">
      <h1 class="text-2xl font-bold text-center mb-4">Appointment Confirmation</h1>
      <p class="text-center mb-6">
        Please be informed that your appointment has been booked as following:
      </p>

      <div class="space-y-4" v-if="appointment">
        <div class="flex justify-between">
          <span class="font-semibold">Facility</span>
          <span>{{ appointment.facility }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Apply for hospital readmission</span>
          <span>{{ appointment.readmission }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Healthcare Program</span>
          <span>{{ appointment.program }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Visit Date</span>
          <span>{{ appointment.date }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Comment</span>
          <span>{{ appointment.comment }}</span>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          @click="goToHomepage"
          class="mt-8 bg-red-custom text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Go to Homepage
        </button>
      </div>
      <p v-if="error" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const errorMessage = 'Redirect failed. Please try again later.'
const appointment = ref<any>(null)
const error = ref(false)
const router = useRouter()
const storedAppointment = localStorage.getItem('appointment');
appointment.value = storedAppointment ? JSON.parse(storedAppointment) : null;
const goToHomepage = () => {
  // Simulate a redirect failure
  const success = Math.random() > 0.5

  if (!success) {
    error.value = true
  } else {
    error.value = false
    router.push('/')
  }
}
</script>

<style scoped></style>
