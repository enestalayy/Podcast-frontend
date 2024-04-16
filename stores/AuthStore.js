import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    // Supabase sadece data ve error dönüyor bu yüzden pending oluşturuyoruz.
    pending: false,
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
        const isConflict = data.user?.identities.length === 0; // already a member
        if (isConflict) {
          return { error: 409 };
        } else return error;
      } catch (error) {
        return error;
      }
    },
    async login(payload) {
      const { email, password } = payload;
      const supabase = useSupabaseClient();
      this.pending = true;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      this.pending = false;
      if (!error) {
        alert("Giriş Başarılı!");
      } else return error;
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
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
