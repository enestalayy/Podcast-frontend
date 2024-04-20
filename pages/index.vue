<template>
  <div class="container col-center gap">
    <MainSlider />
    <PodcastCard />
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useToggleStore } from "@/stores/ToggleStore";
import PodcastCard from "~/components/podcast/PodcastCard.vue";
import MainSlider from "~/components/podcast/MainSlider.vue";

export default {
  components: {
    PodcastCard,
    MainSlider,
  },
  methods: {
    ...mapActions(useToggleStore, ["setPopupComponent"]),
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
</style>
