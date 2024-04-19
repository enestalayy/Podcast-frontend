<template>
  <div class="sidebar">
    <PrimeSidebar
      v-model:visible="visible"
      :modal="false"
      position="right"
      header="Sidebar"
    >
      <p>QUEUE</p>
      <p>QUEUE</p>
      <p>QUEUE</p>
      <p>QUEUE</p>
      <p>QUEUE</p>
      <p>QUEUE</p>
    </PrimeSidebar>
    <PrimeButton
      class="sidebarButton"
      icon="pi pi-align-right"
      @click="visible = true"
      text
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
};
</script>
