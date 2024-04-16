<template>
  <div>
    <span class="p-text-secondary block mb-5">First Component</span>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-6rem">Username</label>
      <PrimeInputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-6rem">Email</label>
      <PrimeInputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-content-end gap-2">
      <PrimeButton
        type="button"
        label="Cancel"
        severity="secondary"
        @click="toggleState('visible')"
      ></PrimeButton>
      <PrimeButton
        type="button"
        label="Save"
        @click="toggleState('visible')"
      ></PrimeButton>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";

export default {
  name: "FirstComponent",
  methods: {
    ...mapActions(useToggleStore, ["toggleState"]),
  },
};
</script>

<style lang="scss" scoped></style>
