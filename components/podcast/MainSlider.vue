<template>
  <div class="col-center">
    <Swiper
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      class="bigSlider"
      :autoplay="autoplay"
    >
      <SwiperSlide
        v-for="(slide, index) in podcasts.sets[0].contents"
        :key="index"
        class="bigSlide"
      >
        <NuxtImg
          :src="slide.imageUrl"
          format="webp"
          alt="image"
          quality="100"
          sizes="50vw md:30vw lg:20vw"
          class="bigSliderImage"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCards, Autoplay } from "swiper/modules";
import { mapState } from "pinia";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/autoplay";

export default {
  name: "MainSlider",
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapState(usePodcastStore, ["podcasts"]),
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

.bigSlider {
  overflow: hidden;
  white-space: nowrap;
}
.bigSlide {
  height: auto;
}
.bigSliderImage {
  width: 20vw;
  height: auto;
  border-radius: 15px;
}
</style>
