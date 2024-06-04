<template>
  <!-- <div v-for="(item, index) in podcast.items"> -->
  <PodcastCard :content="podcast" :index="0" />
  <!-- </div> -->
</template>

<script>
import podcast from "~/assets/jsons/podcast.json";
import PodcastCard from "./card/PodcastCard.vue";

export default {
  name: "test",
  data() {
    return {
      podcast: podcast,
    };
  },
  components: {
    PodcastCard,
  },
  methods: {},
};
</script>

<!-- <template>
  <div class="draggable-list">
    <h2>Draggable List</h2>
    <draggable v-model="items" @end="onEnd">
      <transition-group>
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="draggable-item"
        >
          {{ index + 1 }}. {{ item.name }}
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

export default {
  name: "Test",
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      items: Array.from({ length: 20 }, (v, k) => ({
        id: k + 1,
        name: `Item ${k + 1}`,
      })),
    };
  },
  methods: {
    onEnd(event) {
      console.log("List reordered:", this.items);
    },
  },
};
</script>

<style scoped>
.draggable-list {
  width: 300px;
  margin: 0 auto;
  text-align: left;
}
.draggable-item {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
}
</style> -->
