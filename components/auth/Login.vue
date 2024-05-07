<template>
  <form @submit.prevent="handleLogin" action="">
    <Message v-if="error" :message="error" />
    <PrimeFloatLabel>
      <PrimeInputText
        id="email"
        v-model="email"
        inputmode="email"
        :required="true"
        @update:modelValue="() => (error = null)"
      />
      <label for="email">E-mail</label>
    </PrimeFloatLabel>
    <PrimeFloatLabel>
      <PrimePassword
        v-model="password"
        toggleMask
        :feedback="false"
        :required="true"
        inputClass="w-full"
        @update:modelValue="() => (error = null)"
        :class="error ? 'p-invalid' : null"
      />
      <label for="password">Password</label>
    </PrimeFloatLabel>
    <PrimeDivider type="dotted">
      <b v-text="'Diğer Seçenekler'" />
    </PrimeDivider>
    <PrimeButton
      @click="
        setPopupComponent({ header: 'Şifremi Unuttum', name: 'ForgetPassword' })
      "
      :loading="pending"
      :disabled="error"
      link
      size="small"
      label="Şifremi unuttum"
      severity="danger"
    />
    <PrimeButton
      @click="loginWithGoogle"
      :loading="pending"
      :disabled="error"
      outlined
      severity="contrast"
      label="Google ile giriş yap"
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
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["pending"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["login", "loginWithGoogle"]),
    ...mapActions(useToggleStore, ["setPopupComponent"]),
    async handleLogin() {
      const { error } = await this.login({
        email: this.email,
        password: this.password,
      });
      if (error) {
        this.error = error;
      } else {
        console.log("Giriş Başarılı!");
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
</style>
<!-- <template>
  <div>
    <PrimeButton
      label="Giriş yap"
      @click="visible = true"
      class="focus:shadow-none p-2 lg:py-1 lg:px-2 min-w-36 border bg-transparent text-[var(--surface-900)] lg:min-w-24"
    />

    <div v-if="!isForget">
      <h2
        class="text-2xl font-bold text-center py-4"
        v-text="'Giriş yap'"
      />
      <form
        @submit.prevent="handleLogin"
        class="flex flex-col gap-4 w-full overflow-auto"
      >
        <Message
          v-if="error"
          :statusCode="error"
          :message="$t('errors.auth.404')"
        />
        <PrimeInlineMessage v-if="showLastStepInfo" severity="success">{{
          $t("popups.lastStep")
        }}</PrimeInlineMessage>
        <div class="flex flex-col gap-1 w-full">
          <label for="email">Email</label>
          <PrimeInputText
            id="email"
            v-model="email"
            inputmode="email"
            :required="true"
            @update:modelValue="() => (error = null)"
            :class="error ? 'p-invalid' : null"
          />
        </div>

        <div class="flex flex-col gap-1 w-full">
          <div class="flex justify-between">
            <label for="password" v-text="t('user.password')" />
            <span
              class="cursor-pointer text-sm font-bold text-[var(--primary-color)] hover:text-[var(--teal-200)]"
              @click="toggleShow('isForget')"
              v-text="t('user.forgetPassword')"
            ></span>
          </div>
          <PrimePassword
            id="password"
            v-model="password"
            toggleMask
            :feedback="false"
            :required="true"
            inputClass="w-full"
            @update:modelValue="() => (error = null)"
            :class="error ? 'p-invalid' : null"
          />
        </div>

        <PrimeButton
          type="submit"
          :loading="pending"
          :disabled="error"
          :label="pending ? t('user.logging') : t('user.logIn')"
          class="bg-white text-black"
        />

        <PrimeDivider type="dotted">
          <b v-text="t('user.logInWithOther')" />
        </PrimeDivider>

        <PrimeButton
          @click="loginWithGoogle"
          icon="pi pi-google"
          :label="t('user.continueWithGoogle')"
          class="border-none"
          iconClass="text-2xl"
          style="background: var(--text-color); color: var(--surface-0)"
        />
      </form>
    </div>
    <ForgetPassword v-else />
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import Message from "../messages/Message.vue";
import ForgetPassword from "./ForgetPassword.vue";
export default {
  name: "Login",
  components: { Message, ForgetPassword },

  data() {
    return {
      email: "",
      password: "",
      visible: false,
      error: null,
    };
  },

  computed: {
    ...mapState(useAuthStore, [
      "pending",
      "showLoginPopup",
      "showLastStepInfo",
      "isForget",
    ]),
  },

  methods: {
    ...mapActions(useAuthStore, ["login", "loginWithGoogle", "toggleShow"]),
    async handleLogin() {
      const error = await this.login({
        email: this.email,
        password: this.password,
      });
      if (!error) {
        this.visible = false;
        this.email = "";
        this.password = "";
        this.showLastStepInfo = false;
      } else {
        this.error = 404;
      }
    },
  },
  watch: {
    showLoginPopup(newValue) {
      if (newValue) {
        this.visible = true;
        this.toggleShow("showLoginPopup");
      }
    },
  },
};
</script> -->
