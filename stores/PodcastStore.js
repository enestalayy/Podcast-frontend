import { defineStore } from "pinia";

export const usePodcastStore = defineStore("podcastStore", {
  state: () => ({
    podcasts: null,
    usersPodcasts: {},
    playlist: null,
    currentEpisode: null,
    uploadedFile: null,
    uploadedFileUrl: null,
    pending: false,
  }),
  getters: {},
  actions: {
    async getPodcasts() {
      // const { data, pending, error } = await useFetch("/api/podcast");
      const { data, pending, error } = await useFetch(
        "https://www.trtdinle.com/api/detail?path=/genre/podcast"
      );
      this.pending = pending.value;
      if (!error.value) {
        this.podcasts = data.value;
      } else {
        console.log("error :>> ", error);
        return error;
      }
    },
    async getUsersPodcasts(userId) {
      const { data, error } = await useFetch(`/api/user/podcast/${userId}`);
      if (!error.value) {
        const user = useSupabaseUser();
        if (user.value.id === userId) {
          this.usersPodcasts.profile = data.value;
        } else {
          this.usersPodcasts[userId] = data.value;
        }
      } else {
        console.error(error.value);
      }
    },
    async getPlaylist(path) {
      const { data, error } = await useAsyncData(() =>
        // $fetch(`/api/podcast${path}`)
        $fetch(`https://www.trtdinle.com/api/detail?path=${path}`)
      );
      if (!error.value) {
        this.playlist = data.value;
        this.currentEpisode = data.value.items[0];
      }
    },
    async createPodcast(podcast) {
      const { formData } = podcast;
      const toggleStore = useToggleStore();
      const { data, error, pending } = await useFetch("/api/podcast", {
        method: "POST",
        body: formData,
      });
      if (!error.value) {
        localStorage.removeItem("podcastTitle");
        localStorage.removeItem("podcastDescription");
        localStorage.removeItem("selectedCategories");
        localStorage.removeItem("podcastImage");
        toggleStore.toggleState("visible");
      }
      this.usersPodcasts.profile.createdPodcastList.push(data.value);
      return { data, error };
    },
    async deletePodcast(podcastId) {
      const { data, error, pending } = await useFetch(
        `/api/podcast/${podcastId}`,
        {
          method: "DELETE",
        }
      );
      console.log("data :>> ", data);
      console.log("error :>> ", error);
    },

    // EPİSODE CRUD

    async createEpisode(prop) {
      const { formData, podcastId } = prop;
      const toggleStore = useToggleStore();
      formData.append("file", this.uploadedFile);
      const { data, error } = await useFetch(`/api/episode/${podcastId}`, {
        method: "POST",
        body: formData,
      });
      if (!error.value) {
        const podcast = this.usersPodcasts.profile.createdPodcastList.find(
          (e) => {
            return e._id === data.value._id;
          }
        );
        podcast.episodes = data.value.episodes;
        localStorage.removeItem("episodeTitle");
        localStorage.removeItem("episodeDescription");
        toggleStore.toggleState("visible");
      }
      return { data, error };
    },

    async updateEpisode(prop) {
      const { formData, podcastId, episodeId } = prop;
      const toggleStore = useToggleStore();
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
        toggleStore.toggleState("visible");
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
