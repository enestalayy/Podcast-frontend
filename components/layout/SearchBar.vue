<template>
  <PrimeInputGroup class="searchBar">
    <PrimeButton
      @click="handleShowAutoComplete"
      icon="pi pi-search"
      class="transition"
      text
      :class="{ 'p-button-label searchButton': !showAutoComplete }"
      :label="showAutoComplete ? '' : 'Arama'"
    />
    <PrimeAutoComplete
      inputId="autoCompleteInput"
      class="transition"
      :class="showAutoComplete ? 'showAutoComplete' : 'hideAutoComplete'"
      @blur="showAutoComplete = false"
    />
  </PrimeInputGroup>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      showAutoComplete: false,
    };
  },
  methods: {
    handleShowAutoComplete() {
      this.showAutoComplete = !this.showAutoComplete;
      if (this.showAutoComplete) {
        const autoCompleteInput = document.getElementById("autoCompleteInput");
        autoCompleteInput.focus();
      }
    },
  },
};
</script>

<style scoped></style>
