<template>
  <nav class="col-between pb menu">
    <NuxtLink to="/" class="w-full center">
      <Logo />
    </NuxtLink>
    <ul class="col-stretch">
      <li>
        <NuxtLink to="/">
          <PrimeButton
            class="w-full"
            text
            icon="pi pi-home"
            label="Ana Sayfa"
          />
        </NuxtLink>
      </li>

      <li v-if="session">
        <NuxtLink to="/profile">
          <PrimeButton icon="pi pi-user" text label="Hesabım" class="w-full" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="search">
          <PrimeButton
            class="w-full"
            text
            icon="pi pi-sparkles"
            label="Keşfet"
          />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink>
          <PrimeButton class="w-full" text icon="pi pi-book" label="Kitaplık" />
        </NuxtLink>
      </li>
    </ul>
    <PrimeInputGroup class="center" v-if="!session">
      <PrimeButton
        @click="setPopupComponent({ header: 'Kayıt ol', name: 'Signup' })"
        label="Kayıt ol"
        text
      />
      <PrimeButton
        @click="setPopupComponent({ header: 'Giriş yap', name: 'Login' })"
        label="Giriş yap"
        text
      />
    </PrimeInputGroup>

    <PrimeButton
      v-else
      @click="signOut"
      icon="pi pi-sign-out"
      class="w-full"
      text
      label="Çıkış yap"
    />
  </nav>
</template>

<script>
import { mapActions, mapState } from "pinia";

export default {
  name: "Menu",

  computed: {
    ...mapState(useAuthStore, ["session"]),
  },
  methods: {
    ...mapActions(useToggleStore, ["setPopupComponent"]),
    ...mapActions(useAuthStore, ["signOut"]),
  },
};
</script>

<style scoped>
ul {
  gap: 20px;
  width: 80%;
}
.menu {
  height: 100%;
}
button {
  white-space: nowrap;
}
@media (max-width: 1024px) {
  .menu {
    align-items: center;
  }
}
</style>
