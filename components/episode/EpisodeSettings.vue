<template>
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
    ...mapActions(usePodcastStore, ["deletePodcast"]),
    ...mapActions(useToggleStore, ["setPopupComponent"]),
  },
  data() {
    return {
      items: [
        {
          label: "Sil",
          icon: "pi pi-trash",
          command: () => {
            this.deletePodcast(this.podcast);
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
