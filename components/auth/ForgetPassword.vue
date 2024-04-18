<template>
  <form @submit.prevent="handleResetPassword">
    <Message
      v-if="showMessage"
      :message="
        error
          ? error
          : data
          ? 'Sıfırlama e-postası gönderildi'
          : 'Geçersiz e-posta'
      "
      :severity="error ? 'warn' : 'success'"
    />
    <PrimeFloatLabel>
      <label for="email" v-text="'Email*'" />
      <PrimeInputText
        id="email"
        v-model="email"
        type="email"
        inputmode="email"
        :required="true"
        @update:modelValue="() => (error = null)"
        :class="error ? 'p-invalid' : null"
      />
    </PrimeFloatLabel>
    <PrimeButton
      type="submit"
      :loading="pending"
      :disabled="error"
      :label="
        pending
          ? 'Sıfırlama e-postası gönderiliyor'
          : 'Sıfırlama e-postası gönder'
      "
    />
  </form>
</template>

<script>
import { mapActions, mapState } from "pinia";

export default {
  name: "ForgetPassword",
  data() {
    return {
      email: "",
      data: null,
      error: null,
      showMessage: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["pending"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["resetPassword"]),
    async handleResetPassword() {
      const { data, error } = await this.resetPassword(this.email);
      this.data = data;
      this.error = error;
      this.showMessage = true;
    },
  },
};
</script>

<style scoped></style>
