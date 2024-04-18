<template>
  <div></div>
</template>

<script>
import { mapState } from "pinia";

export default {
  name: "PodcastCard",
  computed: {
    ...mapState(usePodcastStore, ["podcasts"]),
  },
};
</script>

<style scoped></style>
