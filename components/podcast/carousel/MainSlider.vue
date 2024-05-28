<script setup>
const dataFetch = async () => {
  const { data, error } = await useFetch(
    "https://www.trtdinle.com/api/detail?path=${path}"
  );
  console.log("data :>> ", data);
  console.log("error :>> ", error);
};
dataFetch();
</script>
<template>
  <div class="col-center">
    <Swiper
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      class="mainSlider"
      :autoplay="autoplay"
    >
      <!-- <SwiperSlide
        v-if="podcasts"
        v-for="(slide, index) in podcasts.featuredPodcasts.contents"
        :key="index"
        class="mainSlide"
      >
        <img :src="slide.imageUrl" alt="image" class="mainSliderImage" />
      </SwiperSlide> -->
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCards, Autoplay } from "swiper/modules";
import { mapState } from "pinia";

export default {
  name: "MainSlider",
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapState(usePodcastStore, ["podcasts", "pending"]),
  },
  setup() {
    return {
      modules: [EffectCards, Autoplay],
      autoplay: {
        disableOnInteraction: false,
      },
    };
  },
};
</script>

<style scoped>
.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
}

.mainSlider {
  overflow: hidden;
  white-space: nowrap;
}
.mainSlide {
  height: auto;
}
.mainSliderImage {
  width: 20vw;
  min-width: 250px;
  height: auto;
  border-radius: 15px;
}
</style>
