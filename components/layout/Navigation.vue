<template>
  <nav class="row">
    <MenuSidebar />
    <!-- <SearchBar /> -->
    <QueueSidebar />
  </nav>
</template>

<script>
import MenuSidebar from "./MenuSidebar.vue";
import QueueSidebar from "./QueueSidebar.vue";
import SearchBar from "./SearchBar.vue";

export default {
  name: "Navigation",
  components: {
    MenuSidebar,
    QueueSidebar,
    SearchBar,
  },
};
</script>

<style scoped>
nav {
  justify-content: space-between;
}
</style>
