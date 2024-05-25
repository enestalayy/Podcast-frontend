<script setup></script>
<template>
  <div class="w-full gap col-between">
    <h3 v-text="episode.episodeTitle || episodeTitle" />
    <p v-text="episode.episodeDescription || episodeDescription" />
    <audio
      ref="audio"
      :src="uploadedFileUrl"
      controls
      @loadedmetadata="setAudioDuration"
    ></audio>
  </div>
</template>

<script>
import { mapState } from "pinia";

export default {
  name: "ReviewEpisode",
  props: {
    episode: {
      type: Object,
      required: false,
      episodeTitle: {
        type: String,
        required: false,
      },
      episodeDescription: {
        type: String,
        required: false,
      },
    },
  },
  data() {
    return {
      episodeTitle: null,
      episodeDescription: null,
    };
  },
  mounted() {
    this.episodeTitle = localStorage.getItem("episodeTitle");
    this.episodeDescription = localStorage.getItem("episodeDescription");
  },
  computed: {
    ...mapState(usePodcastStore, ["uploadedFileUrl"]),
  },
};
</script>

<style scoped></style>
