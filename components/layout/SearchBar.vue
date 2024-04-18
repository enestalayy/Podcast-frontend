<template>
  <div>
    <PrimeButton
      v-show="!showAutoComplete"
      @click="handleShowAutoComplete"
      icon="pi pi-search"
      label="Arama"
    />
    <PrimeAutoComplete
      inputId="autoCompleteInput"
      style="transition: all 0.5s"
      :class="showAutoComplete ? 'showAutoComplete' : 'hideAutoComplete'"
      @blur="showAutoComplete = false"
    />
  </div>
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
      this.showAutoComplete = true;
      const autoCompleteInput = document.getElementById("autoCompleteInput");
      autoCompleteInput.focus();
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
}
.showAutoComplete {
  width: 100%;
  opacity: 1;
}
.hideAutoComplete {
  width: 0%;
  opacity: 0;
}
</style>
