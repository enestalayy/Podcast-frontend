<template>
  <div>
    <nav></nav>
    <main class="min-h-screen">
      <slot />
    </main>
    <PrimeDialog
      v-model:visible="toggleStore.visible"
      :header="popupComponent.header ? popupComponent.header : ' '"
      modal
      :pt="{
        mask: {
          style: 'backdrop-filter: blur(4.5px)',
        },
      }"
      class="bg-blue-200"
    >
      <div
        class="p-6 lg:p-8 w-screen h-screen lg:h-full lg:w-[496px] rounded-2xl bg-[var(--surface-ground)]"
      >
        <component class="popupComponent" :is="popupComponent.name" />
      </div>
    </PrimeDialog>
  </div>
</template>

<script>
import Login from "~/components/auth/Login.vue";
import Signup from "~/components/auth/Signup.vue";
import { useToggleStore } from "@/stores/ToggleStore";
import { mapState } from "pinia";

export default {
  data() {
    return {
      toggleStore: useToggleStore(),
    };
  },
  components: {
    Login,
    Signup,
  },
  computed: {
    ...mapState(useToggleStore, ["popupComponent"]),
  },
};
</script>

<style scoped></style>
