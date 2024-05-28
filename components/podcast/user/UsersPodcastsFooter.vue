<script setup>
const route = useRoute();
const { userId } = route.params;
</script>
<template>
  <div class="w-full row-between p">
    <div class="center gap">
      <div class="row gap">
        <p class="m-0">25 takipçi</p>
        <p class="m-0">25 yorum</p>
      </div>
      <div>
        <ShareButton
          :shareObject="{
            ...podcast,
            shareUrl: `http://localhost:3000/podcast/${podcast._id}`,
          }"
        />
        <PrimeButton text icon="pi pi-list" />
        <PrimeButton text icon="pi pi-ban" />
        <!-- <NuxtLink :to="'podcast/' + podcast._id"> GİT </NuxtLink> -->
      </div>
    </div>
    <PrimeButton v-if="userId" text label="Takip et" />

    <PrimeButton icon="pi pi-play" rounded />
  </div>
</template>

<script>
export default {
  name: "UsersPodcastsFooter",
  props: {
    podcast: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style scoped></style>
