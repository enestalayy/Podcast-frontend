<template>
  <div class="col-around menu">
    <ul class="col">
      <li>
        <NuxtLink to="/">
          <PrimeButton icon="pi pi-home" label="Ana Sayfa" />
        </NuxtLink>
      </li>
      <li>
        <SearchBar />
      </li>
      <li v-if="session">
        <NuxtLink>
          <PrimeButton icon="pi pi-user" label="Hesabım" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink>
          <PrimeButton icon="pi pi-book" label="Kitaplık" />
        </NuxtLink>
      </li>
    </ul>
    <PrimeInputGroup class="center" v-if="!session">
      <PrimeButton
        @click="setPopupComponent({ header: 'Kayıt ol', name: 'Signup' })"
        label="Kayıt ol"
        outlined
        size="small"
      />
      <PrimeButton
        @click="setPopupComponent({ header: 'Giriş yap', name: 'Login' })"
        label="Giriş yap"
        size="small"
      />
    </PrimeInputGroup>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import SearchBar from "./SearchBar.vue";

export default {
  name: "Menu",
  components: {
    SearchBar,
  },
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
}
.menu {
  height: 100%;
}
button {
  white-space: nowrap;
}
@media (max-width: 1024px) {
  div {
    align-items: center;
  }
}
</style>
