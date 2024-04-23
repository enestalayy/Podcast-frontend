<template>
  <div class="col-center gap w-full">
    <div
      v-show="set.index !== 0"
      v-for="set in podcasts.sets"
      :key="set.id"
      class="col w-full py pl"
    >
      <NuxtLink :to="`genres${set.path}`">
        <PrimeButton size="large" link :label="set.title" />
      </NuxtLink>

      <Swiper
        :grabCursor="true"
        :slidesPerView="'auto'"
        :spaceBetween="30"
        class="w-full"
      >
        <SwiperSlide
          class="cardSlide"
          v-for="(content, index) in set.contents"
          :key="index"
          :lazy="set.index > 8"
        >
          <PrimeCard class="card">
            <template #header>
              <NuxtImg
                format="webp"
                quality="20"
                size="200"
                :src="content.imageUrl"
                :alt="content.title"
                :placeholder="set.index > 8 ? 200 : false"
                :loading="set.index > 8 ? 'lazy' : 'eager'"
              />
            </template>
            <template #content>
              <p class="cardDescription" v-text="content.description" />
            </template>
            <template #footer>
              <div class="row-between">
                <div>
                  <CardMenu :id="content.id" :index="index" />
                </div>
                <NuxtLink :to="`genres${set.path}`">
                  <PrimeButton icon="pi pi-play" aria-label="Oynat" />
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
import { mapState } from "pinia";
import "swiper/css";
import CardMenu from "./CardMenu.vue";

export default {
  name: "PodcastCard",
  components: {
    Swiper,
    SwiperSlide,
    CardMenu,
  },
  computed: {
    ...mapState(usePodcastStore, ["podcasts"]),
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card {
  max-width: 200px;
  height: 100%;
  text-align: center;
}
.cardSlide {
  width: fit-content;
  border-radius: 12px;
  height: auto;
  overflow: hidden;
}

.cardDescription {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
