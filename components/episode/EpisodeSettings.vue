<template>
  <div>
    <PrimeSpeedDial
      :id="episode.id"
      :model="items"
      :radius="60"
      type="quarter-circle"
      direction="down-left"
      style="position: relative"
      :transitionDelay="120"
      :tooltipOptions="{ position: 'left' }"
      buttonClass="settingSpeedialButton"
      class="showOnEpisodeHover"
      showIcon="pi pi-ellipsis-v"
      hideIcon="pi pi-times"
      aria-label="Hızlı İşlem Menüsü"
    />
    <PrimeConfirmPopup />
  </div>
</template>

<script>
import { mapActions } from "pinia";

export default {
  name: "PodcastSettings",

  props: {
    episode: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions(usePodcastStore, ["deleteEpisode"]),
    ...mapActions(useToggleStore, ["setPopupComponent"]),
    ...mapActions(useQueueStore, ["addToQueue"]),
    async handleDeleteEpisode() {
      const { data, error } = await this.deleteEpisode({
        podcastId: this.episode.podcastId,
        episodeId: this.episode._id,
      });
      if (!error.value) {
        this.$toast.add({
          severity: "success",
          summary: "Bölüm başarıyla silindi",
          detail: `${data.value[0].status} başlıklı bölümünüz başarıyla silindi.`,
          life: 4000,
        });
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "Bölüm silme başarısız",
          detail: `${data.value[0].status} başlıklı bölümünüz silinemedi.`,
          life: 4000,
        });
      }
    },
  },
  data() {
    return {
      items: [
        {
          label: "Sil",
          icon: "pi pi-trash",
          command: () => {
            this.handleDeleteEpisode();
          },
        },
        {
          label: "Sıraya ekle",
          icon: "pi pi-list",
          command: () => {
            this.addToQueue(this.episodes);
          },
        },
        {
          label: "Düzenle",
          icon: "pi pi-pencil",
          command: () => {
            this.setPopupComponent({
              header: "Bölüm Düzenle",
              name: "CreateOrUpdateEpisode",
              prop: this.episode,
            });
          },
        },
      ],
    };
  },
};
</script>

<style></style>
