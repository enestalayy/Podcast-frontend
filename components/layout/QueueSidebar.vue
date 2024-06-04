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
      header="Çalma Sırası"
      :dismissable="false"
      class="queueSidebar"
    >
      <Queue />
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
import Queue from "../audio/Queue.vue";

export default {
  data() {
    return {
      visible: false,
    };
  },
  components: {
    Queue,
  },
};
</script>
<style scoped></style>
