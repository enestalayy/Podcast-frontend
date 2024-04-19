import { defineStore } from "pinia";

export const usePodcastStore = defineStore("podcastStore", {
  state: () => ({
    podcasts: [],
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
      const { data, error } = await useLazyFetch(
        "https://www.trtdinle.com/api/detail?path=/genre/podcast",
        {
          key: "podcasts",
          getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          },
        }
      );
      console.log("data :>> ", data);
      if (!error) {
        this.podcasts = data;
      } else return error;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePodcastStore, import.meta.hot));
}
