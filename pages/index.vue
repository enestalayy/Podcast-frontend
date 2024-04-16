<template>
  <div class="container">
    <div class="">
      <PrimeButton
        @click="setPopupComponent({ header: 'Giriş yap', name: 'Login' })"
        class=""
        >Giriş yap</PrimeButton
      >
      <PrimeButton
        @click="setPopupComponent({ header: 'Kayıt ol', name: 'Signup' })"
        class=""
        >Kayıt ol</PrimeButton
      >
      <PrimeButton
        @click="
          setPopupComponent({
            name: 'FirstComponent',
          })
        "
        class=""
        >FirstComponent</PrimeButton
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useToggleStore } from "@/stores/ToggleStore";

export default {
  methods: {
    ...mapActions(useToggleStore, ["setPopupComponent"]),
  },
};
</script>

<style scoped></style>
