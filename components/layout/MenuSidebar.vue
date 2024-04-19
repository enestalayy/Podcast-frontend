<template>
  <div class="sidebar col-center">
    <PrimeSidebar v-model:visible="visible" :modal="false" header="Sidebar">
      <Menu />
    </PrimeSidebar>
    <PrimeButton
      class="sidebarButton"
      icon="pi pi-align-left"
      @click="visible = true"
      text
    />
  </div>
</template>
<script>
import Menu from "./Menu.vue";

export default {
  name: "MenuSidebar",
  components: {
    Menu,
  },
  data() {
    return {
      visible: false,
    };
  },
};
</script>
