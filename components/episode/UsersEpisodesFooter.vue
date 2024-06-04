<template>
  <div class="w-full row-between p">
    <div class="center gap">
      <div class="row gap">
        <p v-text="'25 beğeni'" />
        <p v-text="'5 yorum'" />
      </div>
      <div class="showOnEpisodeHover">
        <ShareButton :shareObject="episode" />
        <PrimeButton @click="addToQueue(episode)" text icon="pi pi-list" />
        <PrimeButton text icon="pi pi-ban" />
      </div>
    </div>
    <PrimeButton icon="pi pi-play" rounded class="showOnEpisodeHover" />
  </div>
</template>

<script>
import { mapActions } from "pinia";

export default {
  name: "UsersEpisodesFooter",
  props: {
    episode: {
      type: Object,
      required: false,
    },
  },
  methods: {
    ...mapActions(useQueueStore, ["addToQueue"]),
  },
};
</script>

<style scoped></style>
