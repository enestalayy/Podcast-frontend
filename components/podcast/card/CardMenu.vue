<template>
  <PrimeSpeedDial
    :id="podcast.id"
    :model="items"
    direction="right"
    :radius="60"
    type="semi-circle"
    :transitionDelay="120"
    :tooltipOptions="{ position: 'right' }"
    mask
    :maskClass="'cardMask'"
    buttonClass="cardSpeedialButton"
    class="cardSpeedial"
    showIcon="pi pi-ellipsis-v"
    hideIcon="pi pi-times"
    aria-label="Hızlı İşlem Menüsü"
  />
</template>

<script>
import { mapActions } from "pinia";

export default {
  name: "CardMenu",
  props: {
    podcast: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      items: [
        {
          label: "İlgilenmiyorum",
          icon: "pi pi-ban p-button-danger",
        },
        {
          label: "İndir",
          icon: "pi pi-download",
        },
        {
          label: "Çalma listesine ekle",
          icon: "pi pi-plus",
        },
        {
          label: "Sıraya ekle",
          icon: "pi pi-list",
          command: () => {
            this.addToQueue(this.podcast.items);
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(useQueueStore, ["addToQueue"]),
  },
  created() {},
};
</script>
<style scoped></style>
