<template>
  <PrimeCard class="card col-center p">
    <template #header>
      <img
        width="200"
        height="200"
        :src="content.imageUrl ? content.imageUrl : '/defaultCardImage.webp'"
        :alt="content.title"
        class="cardImage"
      />
    </template>
    <template #content>
      <p class="cardDescription" v-text="content.description" />
      <div v-show="index >= 0" class="center">
        <CardMenu :id="content.id" />
        <PrimeButton
          @click="getPodcast(content.path)"
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
      required: true,
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
    ...mapActions(usePodcastStore, ["getPodcast"]),
  },
};
</script>

<style scoped></style>
