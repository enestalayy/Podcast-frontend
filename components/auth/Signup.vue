<template>
  <form @submit.prevent="handleSignup">
    <ErrorMessage
      v-if="showMessage"
      :message="error ? error : 'Lütfen gelen e-postanızı onaylayınız'"
      :severity="error && 'warn'"
    />
    <PrimeFloatLabel>
      <PrimeInputText
        id="name"
        v-model="name"
        :required="true"
        minlength="2"
        maxlength="20"
        style="text-transform: capitalize"
      />
      <label for="name" v-text="'Ad*'" />
    </PrimeFloatLabel>
    <PrimeFloatLabel>
      <PrimeInputText
        id="surname"
        v-model="surname"
        :required="true"
        minlength="2"
        maxlength="20"
        style="text-transform: capitalize"
      />
      <label for="surname" v-text="'Soyad*'" />
    </PrimeFloatLabel>
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

    <PrimeFloatLabel>
      <label for="password" v-text="'Şifre*'" />
      <PrimePassword
        id="password"
        v-model="password"
        toggleMask
        promptLabel="Şifrenizi belirleyin"
        weakLabel="Zayıf"
        mediumLabel="Ortalama"
        strongLabel="Güçlü"
        :required="true"
        :inputProps="{ autocomplete: 'false' }"
        @update:modelValue="() => (error = null)"
        :class="error ? 'p-invalid' : null"
      >
        <template #footer>
          <ul style="line-height: 1.4">
            <li>En az 1 büyük harf</li>
            <li>En az 1 sayı</li>
            <li>Minimum 6 karakter</li>
          </ul>
        </template>
      </PrimePassword>
    </PrimeFloatLabel>

    <BirthDate />

    <PrimeDivider type="dotted">
      <b v-text="'Diğer Seçenekler'" />
    </PrimeDivider>

    <PrimeButton
      @click="setPopupComponent({ header: 'Giriş yap', name: 'Login' })"
      :loading="pending"
      :disabled="error"
      link
      size="small"
      label="Zaten bir hesabın var mı?"
      severity="danger"
    />

    <PrimeButton
      @click="loginWithGoogle"
      :loading="pending"
      :disabled="error"
      outlined
      severity="contrast"
      label="Google ile kayıt ol"
      icon="pi pi-google"
    />
    <PrimeButton
      type="submit"
      :loading="pending"
      :disabled="error"
      :label="pending ? 'Kayıt yapılıyor...' : 'Kayıt ol'"
      class="bg-white text-black"
    />
  </form>
</template>

<script>
import { mapActions, mapState } from "pinia";
import BirthDate from "./BirthDate.vue";

export default {
  name: "Signup",
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      showMessage: false,
      data: null,
      error: null,
    };
  },
  components: {
    BirthDate,
  },
  computed: {
    ...mapState(useAuthStore, ["pending"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["signup", "loginWithGoogle"]),
    ...mapActions(useToggleStore, ["setPopupComponent"]),
    async handleSignup() {
      const mediumRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
      );
      if (mediumRegex.test(this.password)) {
        const { data, error } = await this.signup({
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
        });
        if (error) {
          this.error = error;
        } else {
          this.data = data;
        }
      } else {
        this.error = "Lütfen daha iyi bir şifre giriniz.";
      }
      this.showMessage = true;
    },
  },
};
</script>

<style scoped>
span,
div {
  width: 100%;
}

label {
  z-index: 1;
}
</style>
