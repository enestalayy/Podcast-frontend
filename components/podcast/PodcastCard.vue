<template>
  <div class="col-center gap">
    <div
      v-show="set.index !== 0"
      v-for="set in podcasts.sets"
      :key="set.id"
      class="col-center gap"
    >
      {{ console.log("set :>> ", set) }}
      <NuxtLink>
        <PrimeButton
          :badge="set.contents.length"
          iconPos="right"
          icon="pi pi-arrow-right"
          size="large"
          link
          :label="set.title"
        />
      </NuxtLink>
      <Swiper
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        slidesPerView="4"
        :loop="true"
        :lazy="set.index > 3"
        :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :pagination="false"
        :modules="modules"
        :breakpoints="{
          1025: {
            slidesPerView: 4,
          },
          1441: {
            slidesPerView: 4,
          },
        }"
      >
        <SwiperSlide class="cardSlide" v-for="content in set.contents">
          <PrimeCard class="card">
            <template #header>
              <img :src="content.imageUrl" alt="image" />
            </template>
            <!-- <template #title>
              {{ content.title }}
            </template> -->
            <template #content>
              <p class="cardDescription" v-text="content.description" />
            </template>
            <template #footer>
              <div class="row-between">
                <PrimeButton text icon="pi pi-heart" />
                <NuxtLink>
                  <PrimeButton icon="pi pi-play" />
                </NuxtLink>
              </div>
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

img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.card {
  text-align: center;
}
.cardSlide {
  border-radius: 12px;
  height: max-content;
  overflow: hidden; /* slide shadowun taşmaması için */
}
.cardDescription {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
