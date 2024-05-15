<template>
  <div class="w-full gap col-between">
    <h3 v-text="episode.episodeTitle || episodeTitle" />
    <p v-text="episode.episodeDescription || episodeDescription" />
    <audio :src="audioUrl" controls></audio>
  </div>
</template>

<script>
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
      audioUrl: null,
    };
  },
  mounted() {
    this.episodeTitle = localStorage.getItem("episodeTitle");
    this.episodeDescription = localStorage.getItem("episodeDescription");
    this.audioUrl = localStorage.getItem("audioUrl");
  },
};
</script>

<style scoped></style>
