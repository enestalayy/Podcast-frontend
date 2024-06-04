<template>
  <AudioPlayer v-if="playingEpisode" />
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
    ...mapState(useQueueStore, ["playingEpisode", "queue"]),
  },
};
</script>

<style lang="scss" scoped></style>
