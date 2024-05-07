<template>
  <nav class="col-center menu">
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

    <PrimeButton v-else icon="pi pi-sign-out" />

    <Logo />

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
        <NuxtLink class="w-full">
          <PrimeButton icon="pi pi-user" text label="Hesabım" />
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
