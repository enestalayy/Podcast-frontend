<template>
  <div class="row">
    <MenuSidebar />
    <!-- <SearchBar /> -->
  </div>
</template>

<script>
import MenuSidebar from "./MenuSidebar.vue";
import QueueSidebar from "./QueueSidebar.vue";
import SearchBar from "./SearchBar.vue";

export default {
  name: "Header",
  components: {
    MenuSidebar,
    QueueSidebar,
    SearchBar,
  },
};
</script>

<style scoped>
div {
  justify-content: space-between;
}
</style>
