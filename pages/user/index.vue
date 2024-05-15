<template>
  <div>
    <PrimeButton
      @click="
        setPopupComponent({ header: 'Podcast Oluştur', name: 'CreatePodcast' })
      "
      label="Podcast oluştur"
    />
    <PrimeButton
      @click="
        setPopupComponent({ header: 'Bölüm Ekle', name: 'CreateEpisode' })
      "
      label="Bölüm ekle"
    />
  </div>
</template>

<script>
import { mapActions } from "pinia";
import UploadAudio from "~/components/audio/UploadAudio.vue";

export default {
  components: {
    UploadAudio,
  },
  methods: {
    ...mapActions(useToggleStore, ["setPopupComponent"]),
  },
};
</script>

<style lang="scss" scoped></style>
