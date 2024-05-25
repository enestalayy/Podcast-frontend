<template>
  <PrimePanel v-for="podcast in profilePodcasts" toggleable collapsed class="m">
    <template #header>
      <div class="w-full">
        <span class="w-full row-stretch gap">
          <div class="row-start gap">
            <img :src="podcast.imageUrl" width="120" height="120" class="br" />
            <div class="col p gap">
              <p class="m-0" v-text="podcast.title" />
              <p class="m-0" v-text="podcast.description" />
              <p class="m-0">12 Ocak 2023 - 1s 52 dk 24sn</p>
            </div>
          </div>
        </span>
        <UsersPodcastsFooter />
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
      v-if="podcast.episodes"
      :episodes="podcast.episodes"
      :podcastId="podcast.id"
    />
  </PrimePanel>
</template>

<script>
import { mapState } from "pinia";
import UsersEpisodes from "./UsersEpisodes.vue";
import PodcastSettings from "./PodcastSettings.vue";

import { profilePodcasts } from "~/assets/jsons/profilePodcasts.json";
import UsersPodcastsFooter from "./UsersPodcastsFooter.vue";

export default {
  name: "UsersPodcasts",
  components: {
    UsersEpisodes,
    PodcastSettings,
    UsersPodcastsFooter,
  },
  data() {
    return {
      profilePodcasts: profilePodcasts,
    };
  },
  // computed: {
  //   ...mapState(useUserStore, ["profilePodcasts"]),
  // },
  created() {
    console.log(profilePodcasts);
  },
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
