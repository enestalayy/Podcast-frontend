<template>
  <PrimeSpeedDial
    :id="podcast.id"
    :model="items"
    :radius="60"
    type="quarter-circle"
    direction="down-left"
    style="position: relative"
    :transitionDelay="120"
    :tooltipOptions="{ position: 'left' }"
    buttonClass="settingSpeedialButton"
    class="podcastSpeedial"
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
    podcast: {
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
            this.deletePodcast(this.podcast._id);
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
