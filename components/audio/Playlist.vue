<template>
  <ul v-if="playlist" class="w-full col gap res-gap playlist">
    <li v-if="currentEpisode" class="col w-full">
      <h3>Şu anda çalıyor</h3>
      {{ console.log("currentEpisode >> ", currentEpisode) }}

      <div class="w-full row gap">
        <img
          :src="currentEpisode.show.imageUrl"
          alt="görsel"
          width="50"
          height="50"
        />
        <p class="m-0" v-text="currentEpisode.title" />
      </div>
    </li>
    <draggable v-model="episodes" @end="updateOrder" class="w-full col">
      <h3>Sıradaki</h3>
      <li v-for="(episode, index) in episodes" :key="episode.id" class="w-full">
        <div class="row-between gap py">
          <img
            :src="episode.show.imageUrl"
            alt="görsel"
            width="50"
            height="50"
          />
          <p class="w-full">{{ episode.title }}</p>
          <div>
            <PrimeButton
              type="button"
              icon="pi pi-ellipsis-h"
              @click="toggle(index)"
              text
              aria-haspopup="true"
              aria-controls="overlay_menu"
            />
            <PrimeMenu
              ref="menu"
              :id="episode.id + 'overlay_menu'"
              :model="items"
              :popup="true"
            />
            <h5 class="m-0">{{ episode.duration }}</h5>
          </div>
        </div>
      </li>
    </draggable>
  </ul>
  <EmptyPlaylist v-else />
</template>

<script>
import { mapState } from "pinia";
import EmptyPlaylist from "./EmptyPlaylist.vue";
import { VueDraggableNext } from "vue-draggable-next";

export default {
  name: "Playlist",
  components: {
    EmptyPlaylist,
    draggable: VueDraggableNext,
  },
  data() {
    return {
      episodes: [],
      items: [
        {
          label: "Refresh",
          icon: "pi pi-refresh",
        },
        {
          label: "Export",
          icon: "pi pi-upload",
        },
      ],
    };
  },
  computed: {
    ...mapState(usePodcastStore, ["playlist", "currentEpisode"]),
  },
  watch: {
    playlist: {
      handler(newVal) {
        if (newVal) {
          this.episodes = [...newVal.items];
        }
      },
      immediate: true,
    },
  },
  methods: {
    updateOrder() {
      console.log("Episodes reordered:", this.episodes);
    },
    toggle(index) {
      this.$refs.menu[index].toggle(event);
    },
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
