<template>
  <div>
    <PrimeSpeedDial
      :id="podcast.id"
      :model="items"
      :radius="60"
      type="quarter-circle"
      direction="down-left"
      style="position: relative"
      :transitionDelay="120"
      :tooltipOptions="{ position: 'left' }"
      :hideOnClickOutside="false"
      buttonClass="settingSpeedialButton"
      class="podcastSpeedial"
      showIcon="pi pi-ellipsis-v"
      hideIcon="pi pi-times"
      aria-label="Hızlı İşlem Menüsü"
    />
    <!-- <PrimeConfirmPopup></PrimeConfirmPopup> -->
    <PrimeConfirmDialog></PrimeConfirmDialog>
  </div>
</template>

<script>
import { mapActions } from "pinia";

export default {
  name: "PodcastSettings",

  props: {
    podcast: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions(usePodcastStore, ["deletePodcast"]),
    ...mapActions(useToggleStore, ["setPopupComponent"]),

    async handleDeletePodcast() {
      const { data, error, pending } = await this.deletePodcast(
        this.podcast._id
      );
      if (!error.value) {
        this.$toast.add({
          severity: "success",
          summary: "Podcast başarıyla silindi",
          detail: `${data.value[0].status} başlıklı podcastiniz başarıyla silindi.`,
          life: 4000,
        });
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "Podcast silme başarısız",
          detail: `${data.value[0].status} başlıklı podcastiniz silinemedi.`,
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
          command: (event) => {
            this.$confirm.require({
              target: event.originalEvent.currentTarget,
              header: "Podcast silme onayı",
              message: `${this.podcast.title} başlıklı podcastinizi silmek istediğinize emin misiniz?`,
              icon: "pi pi-info-circle",
              rejectClass: "p-button-secondary p-button-outlined p-button-sm",
              acceptClass: "p-button-danger p-button-sm",
              rejectLabel: "İptal et",
              acceptLabel: "Sil",
              accept: () => {
                this.handleDeletePodcast();
              },
            });
          },
        },
        {
          label: "Düzenle",
          icon: "pi pi-pencil",
          command: () => {
            this.setPopupComponent({
              header: "Podcast Düzenle",
              name: "CreateOrUpdatePodcast",
              prop: this.podcast,
            });
          },
        },
      ],
    };
  },
};
</script>

<style></style>
