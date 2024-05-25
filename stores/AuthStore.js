import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    // Supabase sadece data ve error dönüyor bu yüzden pending oluşturuyoruz.
    pending: false,
    session: null,
    birthDate: null,
  }),
  getters: {},
  actions: {
    async signup(payload) {
      const { name, surname, email, password } = payload;
      const userData = {
        name,
        surname,
        isPremium: false,
      };

      // Eğer birthDate varsa, userData'ya ekleyin
      if (this.birthDate) {
        userData.birthDate = this.birthDate;
      }
      const supabase = useSupabaseClient();
      this.penging = true;
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: userData,
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

    async signOut() {
      const supabase = useSupabaseClient();
      const { error } = await supabase.auth.signOut();
      this.session = null;
      return { error };
    },

    async getSession() {
      const supabase = useSupabaseClient();

      const { data, error } = await supabase.auth.getSession();

      if (!error) {
        console.log("data :>> ", data);
        this.session = data.session;
      }
      return { error };
    },
    async updateEmail(newEmail) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
      });
      console.log("data :>> ", data);
      console.log("error :>> ", error);
      return { data, error };
    },
    async updateBirthDate() {
      const supabase = useSupabaseClient();
      if (this.birthDate) {
        const { error } = await supabase.auth.updateUser({
          data: { birthDate: this.birthDate },
        });
        return { error };
      } else return;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
