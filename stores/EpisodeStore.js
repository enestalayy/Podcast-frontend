import { defineStore } from "pinia";

export const useEpisodeStore = defineStore("podcastStore", {
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
    async createEpisode(prop) {
      const { formData, podcastId } = prop;
      formData.append("file", this.uploadedFile);
      const { data, error } = await useFetch(
        `/api/aws/addEpisode/${podcastId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!error.value) {
        const userStore = useUserStore();
        const podcast = userStore.profilePodcasts.find((e) => {
          return e._id === data.value._id;
        });
        podcast.episodes = data.value.episodes;
        localStorage.removeItem("episodeTitle");
        localStorage.removeItem("episodeDescription");
      }
      return { data, error };
    },

    async updateEpisode(prop) {
      const { formData, podcastId, episodeId } = prop;
      if (formData) {
        const { data, error } = await useFetch(
          `/api/episode/updateData/${podcastId}/${episodeId}`,
          {
            method: "PATCH",
            body: formData,
          }
        );
        return { data, error };
      }
      const mediaData = new FormData();
      if (this.uploadedFile) {
        mediaData.append("file", this.uploadedFile);
        const { data, error } = await useFetch(
          `/api/aws/updateEpisode/${podcastId}/${episodeId}`,
          {
            method: "PATCH",
            body: mediaData,
          }
        );
        return { data, error };
      }

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
