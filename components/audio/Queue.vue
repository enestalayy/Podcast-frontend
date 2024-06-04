<template>
  <ul class="w-full col gap res-gap queue">
    <li v-if="playingEpisode" class="col w-full">
      <h3>Şu anda çalıyor</h3>

      <div class="w-full row gap">
        <img
          :src="playingEpisode.show.imageUrl"
          alt="görsel"
          width="50"
          height="50"
        />
        <p class="m-0" v-text="playingEpisode.title" />
      </div>
    </li>
    <div v-if="queue" class="queueWrapper">
      <div class="w-full row-between">
        <h3>Sıradaki</h3>
        <PrimeButton
          v-show="queue.length > 0"
          @click="clearQueue"
          label="Temizle"
          text
        />
      </div>
      <draggable v-model="newQueue" @end="updateOrder" class="w-full col">
        <li
          v-for="(episode, index) in queue"
          :key="episode.id"
          class="w-full br p"
        >
          <div class="row-between gap py">
            <div class="center relative">
              <img
                :src="episode.show.imageUrl"
                alt="görsel"
                width="50"
                height="50"
              />
              <PlayButton :content="episode" />
            </div>
            <p class="w-full m-0">{{ episode.title }}</p>
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
                :id="episode.id + 'menu'"
                :model="items"
                :popup="true"
              />
              <h5 class="m-0">{{ episode.duration }}</h5>
            </div>
          </div>
        </li>
      </draggable>
    </div>
    <EmptyPlaylist v-else />
  </ul>
</template>

<script>
import { mapActions, mapState } from "pinia";
import EmptyPlaylist from "./EmptyQueue.vue";
import { VueDraggableNext } from "vue-draggable-next";
import PlayButton from "./PlayButton.vue";

export default {
  name: "Queue",
  components: {
    EmptyPlaylist,
    draggable: VueDraggableNext,
    PlayButton,
  },
  data() {
    return {
      newQueue: null,
      items: [
        {
          label: "Sıradan çıkar",
          icon: "pi pi-times",
          command: (e) => {
            const eId = e.id.split("menu");

            console.log("eId :>> ", eId);
            this.removeFromQueue(eId[0]);
          },
        },
        {
          label: "Export",
          icon: "pi pi-upload",
          command: (e) => {
            console.log("e :>> ", e);
          },
        },
      ],
    };
  },
  mounted() {
    this.newQueue = this.queue;
  },
  computed: {
    ...mapState(useQueueStore, ["queue", "playingEpisode"]),
  },
  watch: {
    playingEpisode(newVal) {
      console.log("newVal :>> ", newVal);
      this.newQueue = newVal;
    },
  },
  methods: {
    ...mapActions(useQueueStore, ["setQueue", "clearQueue", "removeFromQueue"]),
    updateOrder() {
      this.setQueue(this.newQueue);
      sessionStorage.setItem("queue", JSON.stringify(this.newQueue));
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
.playButton {
  position: absolute;
  opacity: 0;
}
.queueWrapper {
  li:hover {
    cursor: grab;
    background-color: var(--surface-border);
    .playButton {
      opacity: 1;
    }
  }
}
</style>
<!-- <template>
  <ul v-if="currentPodcast" class="col-center playlist">
    <img :src="currentPodcast.imageUrl" alt="image" width="150" height="150" />
    <draggable v-model="episodes" @end="updateOrder">
      <li v-for="(episode, index) in episodes" :key="episode.id" class="w-full">
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
    </draggable>
  </ul>
  <EmptyQueue v-else />
</template>

<script>
import { mapState } from "pinia";
import draggable from "vuedraggable";
import EmptyQueue from "./EmptyQueue.vue";

export default {
  name: "Queue",
  components: {
    EmptyQueue,
    draggable,
  },
  data() {
    return {
      episodes: [],
    };
  },
  computed: {
    ...mapState(usePodcastStore, ["currentPodcast"]),
  },
  watch: {
    currentPodcast: {
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
      this.$store.dispatch("updatePodcastOrder", this.episodes);
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
</style> -->
