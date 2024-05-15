<template>
  <div class="col-center gap w-full">
    <div
      v-show="index <= indexToShowSlide"
      v-for="(set, index) in podcasts.sets"
      :key="set.id"
      class="col w-full py pl"
    >
      <NuxtLink :to="`genre${set.path}`">
        <PrimeButton size="large" link :label="set.title" />
      </NuxtLink>
      <Slider :set="set" />
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import Slider from "./Slider.vue";

export default {
  name: "Carousel",
  components: {
    Slider,
  },
  data() {
    return {
      indexToShowSlide: 2,
    };
  },
  computed: {
    ...mapState(usePodcastStore, ["podcasts"]),
  },

  mounted() {
    this.scroll();
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        const scrollPosition =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) + window.innerHeight;

        const bottomOfWindow =
          scrollPosition >= document.documentElement.offsetHeight - 100;

        if (
          bottomOfWindow &&
          this.indexToShowSlide <= this.podcasts.sets.length
        ) {
          this.indexToShowSlide += 2;
        }
      };
    },
  },
};
</script>
