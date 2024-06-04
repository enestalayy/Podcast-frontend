<script setup>
const route = useRoute();
const userId = ref(route.params);
if (!userId.length > 0) {
  userId.value = "profile";
}
</script>
<template>
  <PrimePanel
    v-if="usersPodcasts[userId]"
    v-for="podcast in usersPodcasts[userId].createdPodcastList"
    toggleable
    collapsed
    class="m"
  >
    <template #header>
      <div class="w-full">
        <span class="w-full row-stretch gap">
          <div class="row gap">
            <img :src="podcast.imageUrl" width="120" height="120" class="br" />
            <div class="col p gap">
              <p class="m-0" v-text="podcast.title" />
              <p class="m-0" v-text="podcast.description" />
              <p class="m-0">12 Ocak 2023 - 1s 52 dk 24sn</p>
            </div>
          </div>
        </span>
        <UsersPodcastsFooter :podcast="podcast" />
      </div>
    </template>
    <template #icons>
      <PodcastSettings :podcast="podcast" />
      <PrimeBadge
        v-if="podcast.episodes"
        :value="podcast.episodes.length"
        class="podcastBadge"
      />
    </template>
    <UsersEpisodes
      v-if="podcast.episodes.length > 0"
      :podcast="{
        episodes: [...podcast.episodes],
        podcastId: podcast._id,
        imageUrl: podcast.imageUrl,
      }"
    />
  </PrimePanel>
</template>

<script>
import { mapState } from "pinia";
import UsersEpisodes from "~/components/episode/UsersEpisodes.vue";
import PodcastSettings from "../card/PodcastSettings.vue";

// import { profilePodcasts } from "~/assets/jsons/profilePodcasts.json";
import UsersPodcastsFooter from "./UsersPodcastsFooter.vue";

export default {
  name: "UsersPodcasts",
  components: {
    UsersEpisodes,
    PodcastSettings,
    UsersPodcastsFooter,
  },
  // data() {
  //   return {
  //     profilePodcasts: profilePodcasts,
  //   };
  // },
  computed: {
    ...mapState(usePodcastStore, ["usersPodcasts"]),
  },
  // created() {
  //   console.log(profilePodcasts);
  // },
};
</script>

<style scoped>
.podcastBadge {
  position: absolute;
  right: 0px;
  bottom: 20px;
  min-width: 15px;
  width: 15px;
  height: 15px;
  line-height: 15px;
}
</style>
