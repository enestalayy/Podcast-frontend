import { defineStore } from "pinia";
import { staticPodcasts, trtPodcasts } from "#nuxt-prepare";

export const usePodcastStore = defineStore("podcastStore", {
  state: () => ({
    staticPodcasts: staticPodcasts || [],
    trtPodcasts: trtPodcasts || [],
    podcasts: null,
    usersPodcasts: {},
    uploadedFile: null,
    uploadedFileUrl: null,
    pending: false,
  }),
  getters: {},
  actions: {
    // GET
    async getPodcasts() {
      const { data, pending, error } = await useFetch("/api/podcast");
      // const { data, pending, error } = await useFetch(
      //   "https://www.trtdinle.com/api/detail?path=/genre/podcast"
      // );
      this.pending = pending.value;
      if (!error.value) {
        this.podcasts = data.value;
      } else {
        console.log("error :>> ", error);
        return error;
      }
    },
    async getUsersPodcasts(userId) {
      const { data, error, pending } = await useFetch(
        `/api/user/podcast/${userId}`
      );
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
      return { error, pending };
    },

    // POST

    async createPodcast(podcast) {
      const { formData } = podcast;
      const { data, error, pending } = await useFetch("/api/podcast", {
        method: "POST",
        body: formData,
      });
      if (!error.value) {
        localStorage.removeItem("podcastTitle");
        localStorage.removeItem("podcastDescription");
        localStorage.removeItem("selectedCategories");
        localStorage.removeItem("podcastImage");
      }
      this.usersPodcasts.profile.createdPodcastList.push(data.value);
      return { data, error, pending };
    },

    async createEpisode(prop) {
      console.log("çalışıyor");
      const { formData, podcastId } = prop;
      formData.append("file", this.uploadedFile);
      const { data, error, pending } = await useFetch(
        `/api/episode/${podcastId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!error.value) {
        const podcast = this.usersPodcasts.profile.createdPodcastList.find(
          (e) => {
            return e._id === data.value._id;
          }
        );
        podcast.episodes = data.value.episodes;
        localStorage.removeItem("episodeTitle");
        localStorage.removeItem("episodeDescription");
        localStorage.removeItem("selectedPodcast");
      }
      return { data, error, pending };
    },

    // PATCH

    // Podcast
    async updatePodcastInfo(prop) {
      const { formInfo, podcastId } = prop;

      const { data, error, pending } = await useFetch(
        `/api/podcast/data/${podcastId}`,
        {
          method: "PATCH",
          body: formInfo,
        }
      );

      return { data, error, pending };
    },
    async updatePodcastFile(prop) {
      const { formFile, podcastId } = prop;
      const { data, error, pending } = await useFetch(
        `/api/podcast/file/${podcastId}`,
        {
          method: "PATCH",
          body: formFile,
        }
      );

      return { data, error, pending };
    },

    // Episode

    async updateEpisode(prop) {
      const { episodeInfo, podcastId, episodeId } = prop;
      const toggleStore = useToggleStore();
      if (episodeInfo) {
        const { data, error, pending } = await useFetch(
          `/api/episode/data/${podcastId}/${episodeId}`,
          {
            method: "PATCH",
            body: episodeInfo,
          }
        );
        return { data, error, pending };
      }
      const mediaData = new FormData();
      if (this.uploadedFile) {
        mediaData.append("file", this.uploadedFile);
        const { data, error, pending } = await useFetch(
          `/api/episode/file/${podcastId}/${episodeId}`,
          {
            method: "PATCH",
            body: mediaData,
          }
        );
        return { data, error, pending };
      }

      if (!error.value) {
        toggleStore.toggleState("visible");
      } else console.error(error.value);
    },

    // DELETE

    async deletePodcast(podcastId) {
      const { data, error, pending } = await useFetch(
        `/api/podcast/${podcastId}`,
        {
          method: "DELETE",
        }
      );
      if (!error.value) {
        this.usersPodcasts.profile.createdPodcastList =
          this.usersPodcasts.profile.createdPodcastList.filter((e) => {
            return e._id !== podcastId;
          });
      }
      return { data, error, pending };
    },
    async deleteEpisode(prop) {
      const { podcastId, episodeId } = prop;
      const { data, error, pending } = await useFetch(
        `/api/episode/${podcastId}/${episodeId}`,
        {
          method: "DELETE",
        }
      );
      console.log("data :>> ", data);
      console.log("error :>> ", error);
      if (!error.value) {
        const index = this.usersPodcasts.profile.createdPodcastList.findIndex(
          (e) => e._id === data.value._id
        );
        this.usersPodcasts.profile.createdPodcastList[index] = data.value;
      }
      return { data, error, pending };
    },

    readFile(file) {
      console.log("file :>> ", file);
      this.uploadedFile = file;
      this.uploadedFileUrl = URL.createObjectURL(file);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePodcastStore, import.meta.hot));
}
