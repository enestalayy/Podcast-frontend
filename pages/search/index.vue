<template>
  <div class="container col">
    <SearchBar />
    <TypeCards />
  </div>
</template>

<script>
import SearchBar from "~/components/layout/SearchBar.vue";
import TypeCards from "~/components/podcast/TypeCards.vue";

export default {
  components: {
    TypeCards,
    SearchBar,
  },
};
</script>

<style lang="scss" scoped></style>
