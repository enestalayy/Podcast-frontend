import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    // Supabase sadece data ve error dönüyor bu yüzden pending oluşturuyoruz.
    pending: false,
    session: null,
  }),
  getters: {},
  actions: {
    async signup(payload) {
      const { name, surname, email, password, birthDate } = payload;
      const supabase = useSupabaseClient();
      this.penging = true;
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              surname,
              birthDate,
              isPremium: false,
            },
          },
        });
        this.pending = false;
        console.log("data :>> ", data);
        console.log("error :>> ", error);
        const isConflict = data.user?.identities.length === 0; // already a member
        if (isConflict) {
          return { error: 409 };
        } else return { error: error.message };
      } catch (error) {
        return 500;
      }
    },
    async login(payload) {
      const { email, password } = payload;
      const supabase = useSupabaseClient();
      try {
        this.pending = true;
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        this.pending = false;
        if (!error) {
          this.session = data.value;
        } else return { error };
      } catch (error) {
        return 500;
      }
    },
    async loginWithGoogle() {
      const supabase = useSupabaseClient();
      this.pending = true;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      this.pending = false;
      return error;
    },
    async resetPassword(forgetEmail) {
      const supabase = useSupabaseClient();
      try {
        this.pending = true;
        const { data, error } = await supabase.auth.resetPasswordForEmail(
          forgetEmail
        );
        console.log("data :>> ", data);
        console.log("error :>> ", error);
        this.pending = false;
        return { data, error };
      } catch (err) {
        return 500;
      }
    },
    async getSession() {
      const supabase = useSupabaseClient();

      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        this.session = data.value;
      }
      return { error };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
