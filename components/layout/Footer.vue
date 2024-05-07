<template>
  <AudioPlayer v-if="currentEpisode" />
</template>

<script>
import { mapState } from "pinia";
import AudioPlayer from "../podcast/AudioPlayer.vue";

export default {
  name: "Footer",
  components: {
    AudioPlayer,
  },
  computed: {
    ...mapState(usePodcastStore, ["currentEpisode", "currentPodcast"]),
  },
};
</script>

<style lang="scss" scoped></style>
