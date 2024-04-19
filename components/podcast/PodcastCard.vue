<template>
  <div class="col-center gap">
    <div
      v-show="set.index !== 0"
      v-for="set in podcasts.sets"
      :key="set.id"
      class="col-center gap"
    >
      {{ console.log("set :>> ", set) }}
      <h3>{{ set.title }}</h3>
      <Swiper
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        slidesPerView="4"
        :spaceBetween="50"
        :loop="true"
        :lazy="set.index > 3"
        :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }"
        :pagination="true"
        :modules="modules"
      >
        <SwiperSlide v-for="content in set.contents">
          <PrimeCard>
            <template #header>
              <img :src="content.imageUrl" alt="image" />
            </template>
          </PrimeCard>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import { mapState } from "pinia";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "swiper/css/pagination";

export default {
  name: "PodcastCard",
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapState(usePodcastStore, ["podcasts"]),
  },
  setup() {
    return {
      modules: [EffectCoverflow, Autoplay, Pagination],
      autoplay: {
        disableOnInteraction: false,
      },
    };
  },
  name: "PodcastCard",
  computed: {
    ...mapState(usePodcastStore, ["podcasts"]),
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
.swiper {
  max-width: 80vw;
}
img {
  width: 100%;
  height: auto;
}
</style>
