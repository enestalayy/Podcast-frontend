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
      <div class="center">
        <CardMenu :id="content.id" :index="index" />
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
      required: true,
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
