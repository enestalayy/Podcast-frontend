<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
import { mapActions } from "pinia";

export default {
  methods: {
    ...mapActions(usePodcastStore, ["getPodcasts"]),
  },
  created() {
    console.log("çalıştı");

    this.getPodcasts();
  },
};
</script>

<style scoped></style>
