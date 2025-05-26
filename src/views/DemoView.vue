<template>
  <div class="flex flex-col items-center">
    <div class="bg-gradient-to-r w-full from-pink-500 to-red-500 text-white text-center py-8">
      <h1 class="text-4xl font-bold">Mars Express Service</h1>
      <p>Your Gateway To The Red Planet!</p>
      <button
        class="mt-4 px-6 py-2 bg-red-600 rounded hover:bg-red-700"
        @click="handleMakeAppointment"
      >
        Make Appointment
      </button>
    </div>

    <div class="max-w-lg w-full mt-10 p-6 bg-white shadow-md rounded">
      <h2 class="text-2xl font-bold mb-4">Make Appointment</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="facility" class="block mb-1">Facility</label>
          <select id="facility" v-model="facility" class="w-full border rounded p-2" aria-label="Select Facility">
            <option value="Tokyo CURA Healthcare Center">Tokyo CURA Healthcare Center</option>
            <option value="Hongkong CURA Healthcare Center">Hongkong CURA Healthcare Center</option>
            <option value="Seoul CURA Healthcare Center">Seoul CURA Healthcare Center</option>
          </select>
        </div>

        <div class="mb-4">
          <label>
            <input type="checkbox" id="readmission" v-model="readmission" aria-label="Apply for hospital readmission" />
            Apply for hospital readmission
          </label>
        </div>

        <div class="mb-4">
          <label class="block mb-1">Healthcare Program</label>
          <div>
            <label>
              <input type="radio" id="medicare" value="Medicare" v-model="program" aria-label="Medicare" />
              Medicare
            </label>
            <label class="ml-4">
              <input type="radio" id="medicaid" value="Medicaid" v-model="program" aria-label="Medicaid" />
              Medicaid
            </label>
            <label class="ml-4">
              <input type="radio" id="none" value="None" v-model="program" aria-label="None" />
              None
            </label>
          </div>
        </div>

        <div class="mb-4">
          <label for="visitDate" class="block mb-1">Visit Date (Required)</label>
          <input
            type="date"
            id="visitDate"
            v-model="visitDate"
            class="w-full border rounded p-2"
            :min="minDate"
            aria-label="Select Visit Date"
            required
          />
          <span v-if="!visitDate && submitted" class="text-red-500">Date field cannot be empty</span>
        </div>

        <div class="mb-4">
          <label for="comment" class="block mb-1">Comment</label>
          <textarea
            id="comment"
            v-model="comment"
            class="w-full border rounded p-2"
            placeholder="Please input comment"
            maxlength="200"
            aria-label="Enter your comment"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          aria-label="Book Appointment"
        >
          Book Appointment
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const facility = ref('Tokyo CURA Healthcare Center');
    const readmission = ref(false);
    const program = ref('Medicare');
    const visitDate = ref('');
    const comment = ref('');
    const submitted = ref(false);

    const minDate = computed(() => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    });

    const handleMakeAppointment = () => {
      // Redirect to booking form or login
      router.push('/login');
    };

    const submitForm = () => {
      submitted.value = true;
      if (visitDate.value) {
        // Submit form logic
        // On success:
        localStorage.setItem('appointment', JSON.stringify({
          facility: facility.value,
          readmission: readmission.value,
          program: program.value,
          date: visitDate.value,
          comment: comment.value,
        }));
        router.push('/confirmation');
        // On failure:
        // alert('Failed to submit. Please try again.');
      }
    };

    return {
      facility,
      readmission,
      program,
      visitDate,
      comment,
      minDate,
      submitted,
      handleMakeAppointment,
      submitForm,
    };
  },
});
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
