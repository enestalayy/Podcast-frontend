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
        <PrimeButton text icon="pi pi-share-alt" />
        <PrimeButton text icon="pi pi-list" />
        <PrimeButton text icon="pi pi-ban" />
      </div>
    </div>
    <PrimeButton v-if="userId" text label="Takip et" />

    <PrimeButton icon="pi pi-play" rounded />
  </div>
</template>

<script>
export default {
  name: "UsersPodcastsFooter",
};
</script>

<style scoped></style>
