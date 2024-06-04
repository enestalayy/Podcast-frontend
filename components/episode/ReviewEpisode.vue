<script setup></script>
<template>
  <div class="w-full h-full col-around pb">
    <div>
      <h3>Bölüm Başlığı:</h3>
      <h4 class="m-0">
        {{ episode.episodeTitle || episodeTitle }}
      </h4>
    </div>
    <!-- <h4 v-text="episode.episodeTitle || episodeTitle" /> -->
    <div>
      <h3>Bölüm Açıklaması:</h3>
      <p class="m-0">
        {{ episode.episodeDescription || episodeDescription }}
      </p>
    </div>
    <!-- <p v-text="episode.episodeDescription || episodeDescription" /> -->
    <audio
      ref="audio"
      class="w-full"
      :src="episode.audio ? episode.audio : uploadedFileUrl"
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
      audio: {
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
