<template>
  <div class="col-center gap">
    <MainSlider />
    <!-- <Test /> -->
    <Carousel />
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useToggleStore } from "@/stores/ToggleStore";
import Carousel from "~/components/podcast/carousel/Carousel.vue";
import MainSlider from "~/components/podcast/carousel/MainSlider.vue";
import Test from "~/components/podcast/test.vue";

export default {
  components: {
    Carousel,
    MainSlider,
    Test,
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
