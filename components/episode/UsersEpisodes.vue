<template>
  <div
    v-for="(episode, index) in episodes"
    :key="episode.id"
    class="w-full h-full episodeWrapper cardSurface br"
  >
    <PrimeDivider />
    <div class="row-between" style="align-items: stretch">
      <div class="row gap m p">
        <img :src="episode.imageUrl" width="80" height="80" class="br" />
        <div class="col gap">
          <p class="m-0">#{{ index + 1 }} - {{ episode.title }}</p>
          <p class="m-0" v-text="episode.description" />
          <p class="m-0">23 Mayıs - 14dk 53s</p>
        </div>
      </div>
      <div>
        <EpisodeSettings
          :episode="{ ...episode, podcastId: podcastId }"
          class="settingSpeedialButton"
        />
      </div>
    </div>
    <UsersEpisodesFooter :episode="episode" />
  </div>
</template>

<script>
import EpisodeSettings from "./EpisodeSettings.vue";
import UsersEpisodesFooter from "./UsersEpisodesFooter.vue";

export default {
  name: "UsersEpisodes",
  props: {
    episodes: {
      type: Array,
      required: true,
    },
    podcastId: {
      type: String,
      required: true,
    },
  },
  created() {
    this.episode;
  },
  components: {
    UsersEpisodesFooter,
    EpisodeSettings,
  },
};
</script>

<style scoped></style>
