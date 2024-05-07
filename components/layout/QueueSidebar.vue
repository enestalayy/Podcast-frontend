<script setup>
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();
</script>
<template>
  <div>
    <PrimeSidebar
      v-model:visible="visible"
      :modal="false"
      :position="width > 1024 ? 'right' : 'bottom'"
      header="Çalma Listesi"
      :dismissable="false"
      class="queueSidebar"
    >
      <Playlist />
    </PrimeSidebar>
    <PrimeButton
      @click="visible = true"
      icon="pi pi-list"
      class="showPlaylistButton"
      size="large"
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
<style scoped></style>
