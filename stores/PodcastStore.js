import { defineStore } from "pinia";

export const usePodcastStore = defineStore("podcastStore", {
  state: () => ({
    podcasts: null,
    currentPodcast: null,
    currentEpisode: null,
    pending: false,
    types: [
      "din-ve-yasam",
      "aile-ve-cocuk",
      "haber",
      "tarih-8687",
      "soylesi",
      "biyografi",
      "sanat",
      "edebiyat",
      "muzik-7134",
      "genel-kultur",
      "teknoloji",
      "spor",
    ],
  }),
  getters: {},
  actions: {
    async getPodcasts() {
      const nuxtApp = useNuxtApp();
      const { data, pending, error } = await useLazyFetch(
        "/api/podcast/fetchTrtPodcast",
        {
          key: "podcasts",
          getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          },
        }
      );
      this.pending = pending.value;
      console.log("data :>> ", data);
      console.log("error :>> ", error);
      if (!error.value) {
        this.podcasts = data.value;

        // JSON-server için
        // this.podcasts = data.value.fetchTrtPodcast;
      } else {
        return error;
      }
    },
    async getPodcast(path) {
      // const nuxtApp = useNuxtApp();
      const { data, error } = await useAsyncData(
        () => $fetch(`/api/podcast${path}`),
        {
          // key: `${path}`,
          // getCachedData(key) {
          //   return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          // },
        }
      );
      if (!error.value) {
        this.currentPodcast = data.value;
        this.currentEpisode = data.value.items[0];
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePodcastStore, import.meta.hot));
}
