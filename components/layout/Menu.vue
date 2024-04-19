<template>
  <ul class="col">
    <li>
      <NuxtLink to="/">
        <PrimeButton icon="pi pi-home" label="Ana Sayfa" />
      </NuxtLink>
    </li>
    <li>
      <SearchBar />
    </li>
    <li>
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
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  name: "Menu",
  components: {
    SearchBar,
  },
};
</script>

<style scoped>
ul {
  gap: 20px;
}
</style>
