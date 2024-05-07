<template>
  <ul v-if="currentPodcast" class="col-center playlist">
    <img :src="currentPodcast.imageUrl" alt="image" width="150" height="150" />
    <li v-for="(episode, index) in currentPodcast.items" class="w-full">
      <PrimeDivider>
        <h5>{{ episode.episodeNo }}. Bölüm</h5>
      </PrimeDivider>

      <div class="row-between gap">
        <PrimeButton icon="pi pi-heart" size="large" text />
        <p class="w-full">{{ episode.title }}</p>
        <div>
          <h5>{{ episode.duration }}</h5>
        </div>
      </div>
    </li>
  </ul>
  <EmptyPlaylist v-else />
</template>

<script>
import { mapState } from "pinia";
import EmptyPlaylist from "./EmptyPlaylist.vue";

export default {
  name: "Playlist",
  data() {
    return {};
  },
  components: {
    EmptyPlaylist,
  },
  computed: {
    ...mapState(usePodcastStore, ["currentPodcast"]),
  },
};
</script>

<style scoped>
img {
  border-radius: 12px;
}
.p-divider.p-divider-horizontal {
  margin: 1rem 0 0 0;
  padding: 0 1rem;
}
</style>
