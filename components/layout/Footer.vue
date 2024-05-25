<template>
  <AudioPlayer v-if="currentEpisode" />
</template>

<script>
import { mapState } from "pinia";
import AudioPlayer from "../audio/AudioPlayer.vue";

export default {
  name: "Footer",
  components: {
    AudioPlayer,
  },
  computed: {
    ...mapState(usePodcastStore, ["currentEpisode", "playlist"]),
  },
};
</script>

<style lang="scss" scoped></style>
