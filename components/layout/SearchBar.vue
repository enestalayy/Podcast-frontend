<template>
  <PrimeInputGroup class="searchBar">
    <PrimeButton
      @click="handleShowAutoComplete"
      icon="pi pi-search"
      style="transition: all 0.5s ease-out"
      :class="{ 'p-button-label firstInput': !showAutoComplete }"
      :label="showAutoComplete ? '' : 'Arama'"
    />
    <PrimeAutoComplete
      inputId="autoCompleteInput"
      style="transition: all 0.5s ease-in"
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

<style scoped>
.searchBar {
  width: 170px;
}

.firstInput {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.showAutoComplete {
  width: 80%;
  opacity: 1;
}

.hideAutoComplete,
.hideAutoComplete#autoCompleteInput {
  width: 0%;
  opacity: 0;
}
</style>
