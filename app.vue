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
    ...mapActions(useAuthStore, ["getSession"]),
  },
  created() {
    this.getPodcasts();
    this.getSession();
  },
};
</script>

<style scoped></style>
