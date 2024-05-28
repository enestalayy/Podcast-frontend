<script setup>
// useHead({
//   title: podcast.value ? podcast.value.title : "Podcast Sayfası",
//   meta: [
//     {
//       hid: "description",
//       name: "description",
//       content: podcast.value ? podcast.value.description : "Podcast açıklaması",
//     },
//     {
//       hid: "og:title",
//       property: "og:title",
//       content: podcast.value ? podcast.value.title : "Podcast Sayfası",
//     },
//     {
//       hid: "og:description",
//       property: "og:description",
//       content: podcast.value ? podcast.value.description : "Podcast açıklaması",
//     },
//     {
//       hid: "og:image",
//       property: "og:image",
//       content: podcast.value
//         ? podcast.value.imageUrl
//         : "/defaultCardImage.webp",
//     },
//   ],
// });
</script>
<template>
  <div>{{ podcast }}</div>
  <img :src="podcast.imageUrl" alt="image" />
  <h1>{{ podcast.title }}</h1>
  <h3>{{ podcast.description }}</h3>
</template>

<script>
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      podcastId: null,
    };
  },
  computed: {
    ...mapState(useUserStore, ["profilePodcasts"]),
    podcast() {
      return this.profilePodcasts.find((e) => {
        return e._id === this.podcastId;
      });
    },
  },
  methods: {
    ...mapActions(useUserStore, ["getProfilePodcasts"]),
  },
  created() {
    const route = useRoute();
    if (!this.profilePodcasts) {
      this.getProfilePodcasts();
      this.podcastId = route.params.podcastId;
    }
  },
};
</script>

<style scoped></style>
