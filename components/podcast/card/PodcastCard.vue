<template>
  <PrimeCard class="card col-center p">
    <template #header>
      <NuxtImg
        width="200"
        height="200"
        quality="80"
        :src="content.imageUrl"
        :alt="content.title"
        class="cardImage"
      />
    </template>
    <template #content>
      <p class="cardDescription" v-text="content.description" />
      <div v-show="index >= 0" class="center">
        <CardMenu v-if="content.id" :podcast="content" />
        <PlayButton :content="content" />
      </div>
    </template>
  </PrimeCard>
</template>

<script>
import CardMenu from "./CardMenu.vue";
import PlayButton from "~/components/audio/PlayButton.vue";
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
    PlayButton,
  },
  methods: {
    ...mapActions(useQueueStore, ["setQueue"]),
  },
};
</script>

<style scoped></style>
