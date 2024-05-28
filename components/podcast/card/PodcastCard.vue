<template>
  <PrimeCard class="card col-center p">
    <template #header>
      <img
        width="200"
        height="200"
        :src="content.imageUrl"
        :alt="content.title"
        class="cardImage"
      />
    </template>
    <template #content>
      <p class="cardDescription" v-text="content.description" />
      <div v-show="index >= 0" class="center">
        <CardMenu v-if="content.id" :id="content.id" />
        <PrimeButton
          @click="getPlaylist(content.path)"
          icon="pi pi-play"
          aria-label="Oynat"
          class="cardPlayButton"
          size="large"
          iconClass="playIcon"
          rounded
        />
      </div>
    </template>
  </PrimeCard>
</template>

<script>
import CardMenu from "./CardMenu.vue";
import { mapActions } from "pinia";

export default {
  name: "PodcastCard",
  props: {
    content: {
      type: Object,
      required: false,
      title: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      imageUrl: {
        type: String,
        required: false,
      },
    },

    index: {
      type: Number,
      required: false,
    },
  },
  components: {
    CardMenu,
  },
  methods: {
    ...mapActions(usePodcastStore, ["getPlaylist"]),
  },
};
</script>

<style scoped></style>
