<template>
  <div
    class="mainWrap"
    @mousedown="dragStart"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
    @mousemove="dragging"
  >
    <div v-for="(content, index) in set.contents" :key="index" class="wrap">
      <PodcastCard :content="content" :index="index" />
    </div>
  </div>
</template>

<script>
import PodcastCard from "../card/PodcastCard.vue";

export default {
  name: "Slider",
  components: {
    PodcastCard,
  },
  props: {
    set: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
    };
  },
  methods: {
    dragStart(e) {
      this.isDragging = true;
      this.startX = e.pageX - this.$el.offsetLeft;
      this.scrollLeft = this.$el.scrollLeft;
    },
    dragging(e) {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - this.$el.offsetLeft;
      const walk = x - this.startX; // Hareket hızını ayarlayın
      this.$el.scrollLeft = this.scrollLeft - walk;
    },
    dragEnd() {
      this.isDragging = false;
    },
  },
};
</script>

<style scoped>
.mainWrap {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: start;
  gap: 30px;
  width: 100%;
  padding: 15px;
  height: 100%;
  overflow-x: auto;
  cursor: grab;
}
.mainWrap.active {
  cursor: grabbing;
}
.wrap {
  width: 230px;
  user-select: none;
  pointer-events: all;
  margin-right: 25px;
}
</style>

<!-- <template>
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
      <PodcastCard :content="content" :setIndex="set.index" :index="index" />
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import PodcastCard from "./PodcastCard.vue";

export default {
  name: "Slider",
  components: {
    Swiper,
    SwiperSlide,
    PodcastCard,
  },
  props: {
    set: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.cardSlide {
  width: fit-content;
  border-radius: 12px;
  height: auto;
  overflow: hidden;
}
.mainWrap {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: start;
  gap: 30px;
  width: 100%;
  height: fit-content;
  overflow-x: auto;
}
.wrap {
  width: 200px;
  cursor: grab;
}
</style> -->
