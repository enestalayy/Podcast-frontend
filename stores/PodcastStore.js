import { defineStore } from "pinia";

export const usePodcastStore = defineStore("podcastStore", {
  state: () => ({
    podcasts: null,
    playlist: null,
    currentEpisode: null,
    uploadedFile: null,
    uploadedFileUrl: null,
    pending: false,
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
      if (!error.value) {
        this.podcasts = data.value;

        // JSON-server için
        // this.podcasts = data.value.fetchTrtPodcast;
      } else {
        return error;
      }
    },
    async getPlaylist(path) {
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
        this.playlist = data.value;
        this.currentEpisode = data.value.items[0];
      }
    },
    async createPodcast(podcast) {
      const { formData } = podcast;
      const { data, error, pending } = await useFetch("/api/aws/emptyPodcast", {
        method: "POST",
        body: formData,
      });
      return { data, error };
    },
    async deletePodcast(podcastId) {
      const { data, error, pending } = await useFetch(`/api/aws/${podcastId}`, {
        method: "DELETE",
      });
      console.log("data :>> ", data);
      console.log("error :>> ", error);
    },
    async createEpisode(prop) {
      const { formData, podcastId } = prop;
      formData.append("files", this.uploadedFile);
      const { data, error } = useFetch(`/api/aws/addEpisode/${podcastId}`, {
        method: "POST",
        body: formData,
      });
      if (!error.value) {
        this.$toast.add({
          severity: "success",
          summary: "Bölüm başarıyla oluşturuldu",
          detail: `${data.value.name} başlıklı bölümünüz eklendi.`,
          life: 4000,
        });
      } else console.error(error.value);
    },

    async updateEpisode(prop) {
      const { formData, podcastId } = prop;
      this.uploadedFile && formData.append("files", this.uploadedFile);
      // // const { data, error } = useFetch(`/api/aws/addEpisode/${podcastId}`, {
      //   method: "POST",
      //   body: formData,
      // });
      if (!error.value) {
        this.$toast.add({
          severity: "success",
          summary: "Bölüm başarıyla güncellendi",
          detail: `${data.value.name} başlıklı bölümünüz güncellendi.`,
          life: 4000,
        });
      } else console.error(error.value);
    },

    readFile(file) {
      this.uploadedFile = file;
      this.uploadedFileUrl = URL.createObjectURL(file);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePodcastStore, import.meta.hot));
}
