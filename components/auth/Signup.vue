<template>
  <form @submit.prevent="handleSignup">
    <Message v-if="error" :message="error" />

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
        @update:modelValue="() => test"
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

    <PrimeFloatLabel>
      <PrimeCalendar
        v-model="birthDate"
        :minDate="new Date(1900, 0, 1)"
        :maxDate="new Date(2015, 11, 31)"
        :manualInput="false"
        dateFormat="dd/mm/yy"
        showIcon
        inputId="birthDate"
      />
      <label for="birthDate" v-text="'Doğum Tarihi'" />
    </PrimeFloatLabel>
    <PrimeDivider type="dotted">
      <b v-text="'Diğer Seçenekler'" />
    </PrimeDivider>

    <PrimeButton
      :loading="pending"
      :disabled="error"
      link
      size="small"
      label="Zaten bir hesabın var mı?"
      severity="danger"
    />

    <PrimeButton
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
      :label="pending ? 'Giriş yapılıyor...' : 'Giriş yap'"
      class="bg-white text-black"
    />
  </form>
</template>

<script>
import { mapActions, mapState } from "pinia";

export default {
  name: "Signup",
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      birthDate: "",
      confirmMessage: false,
      error: null,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["pending"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["signup"]),
    async handleSignup() {
      const mediumRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
      );
      if (!mediumRegex.test(this.password)) {
        const { data, error } = await this.signup({
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
          birthDate: this.birthDate,
        });
        if (error) {
          this.error = error;
        } else {
        }
      } else {
        alert("kötü şifre!");
      }
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
