<template>
  <div class="row-between typeCardContainer gap p">
    <NuxtLink
      :to="genre.path"
      v-for="genre in podcasts.podcastGenres.contents"
      class="typeCardWrapper"
    >
      <img class="typeCardImage" :src="genre.imageUrl" alt="image" />
      <p class="typeCardTitle" v-text="genre.title" />
    </NuxtLink>
  </div>
</template>

<script>
import { mapState } from "pinia";

export default {
  name: "TypeCards",
  computed: {
    ...mapState(usePodcastStore, ["podcasts"]),
  },
};
</script>

<style scoped></style>
