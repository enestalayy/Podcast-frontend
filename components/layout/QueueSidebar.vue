<template>
  <div class="sidebar">
    <PrimeSidebar
      v-model:visible="visible"
      :modal="false"
      position="right"
      header="Sidebar"
    >
      <Playlist />
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
import Playlist from "../podcast/Playlist.vue";

export default {
  data() {
    return {
      visible: false,
    };
  },
  components: {
    Playlist,
  },
};
</script>
