<template>
  <div class="w-full row-between p">
    <div class="center gap">
      <div class="row gap">
        <p v-text="'25 beğeni'" />
        <p v-text="'5 yorum'" />
      </div>
      <div class="showOnEpisodeHover">
        <PrimeButton text icon="pi pi-share-alt" />
        <PrimeButton text icon="pi pi-list" />
        <PrimeButton text icon="pi pi-ban" />
      </div>
    </div>
    <PrimeButton icon="pi pi-play" rounded class="showOnEpisodeHover" />
  </div>
</template>

<script>
export default {
  name: "UsersEpisodesFooter",
};
</script>

<style scoped></style>
