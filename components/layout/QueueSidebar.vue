<template>
  <div>
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
      size="large"
    />
    <PrimeButton
      @click="visible = true"
      icon="pi pi-align-right"
      class="showPlaylistButton"
      size="large"
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
<style scoped></style>
