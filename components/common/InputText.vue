<template>
  <PrimeFloatLabel>
    <PrimeInputText
      :id="prop.id"
      @update:modelValue="() => (prop.error = null)"
    />
    <label :for="prop.id">{{ prop.label }}</label>
  </PrimeFloatLabel>
</template>

<script>
export default {
  name: "InputText",
  props: {
    prop: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
