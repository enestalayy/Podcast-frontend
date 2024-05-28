import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    profilePodcasts: null,
    usersPodcasts: null,
  }),
  getters: {},
  actions: {
    async getProfilePodcasts(userId) {
      const { data, error } = await useFetch(`/api/user/podcast/${userId}`);
      if (!error.value) {
        this.profilePodcasts = data.value.createdPodcastList;
      } else {
        console.error(error.value);
      }
    },
    async getUsersPodcasts(userId) {
      const { data, error } = await useFetch(`/api/user/podcast/${userId}`);
      if (!error.value) {
        this.usersPodcasts = data.value;
      } else {
        console.error(error.value);
      }
    },

    async uploadAvatar(file) {
      const supabase = useSupabaseClient();
      const authStore = useAuthStore();
      const filePath = `${authStore.session.user.id}/avatar`;

      const { data, error } = await supabase.storage
        .from("Avatars")
        .upload(filePath, file);
      if (!error) {
        console.log("data :>> ", data);
      } else console.log("error :>> ", error);
    },
    async updateAvatar(file) {
      const supabase = useSupabaseClient();
      const authStore = useAuthStore();
      const filePath = `${authStore.session.user.id}/avatar`;

      const { data, error } = await supabase.storage
        .from("Avatars")
        .update(filePath, file, {
          cacheControl: "1",
          upsert: true,
        });
      if (!error) {
        return { data };
      } else console.log("error :>> ", error);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
