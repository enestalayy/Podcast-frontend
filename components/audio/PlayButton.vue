<template>
  <PrimeButton
    @click="play()"
    icon="pi pi-play"
    aria-label="Oynat"
    class="playButton"
    size="large"
    iconClass="playIcon"
    rounded
  />
</template>

<script>
import { mapActions } from "pinia";
export default {
  name: "PlayButton",
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(useQueueStore, ["playPodcast", "playEpisode"]),
    play() {
      this.content.items
        ? this.playPodcast(this.content)
        : this.playEpisode(this.content);
    },
  },
};
</script>

<style scoped></style>
