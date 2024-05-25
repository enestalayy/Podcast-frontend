<script setup>
const authStore = useAuthStore();
const { birthDate } = storeToRefs(authStore);
</script>
<template>
  <PrimeFloatLabel>
    <PrimeCalendar
      v-model="birthDate"
      :minDate="new Date(1900, 0, 1)"
      :maxDate="new Date(2015, 11, 31)"
      :manualInput="false"
      dateFormat="dd/mm/yy"
      inputId="birthDate"
      class="w-full"
    />
    <label for="birthDate" v-text="'Doğum Tarihi'" />
  </PrimeFloatLabel>
</template>
