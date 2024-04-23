<template>
  <PrimeSpeedDial
    :id="id + '-' + index"
    :model="items"
    direction="up"
    :transitionDelay="120"
    :tooltipOptions="{ position: 'right' }"
    mask
    :maskClass="'cardMask'"
    class="cardSpeedial"
    showIcon="pi pi-ellipsis-v"
    hideIcon="pi pi-times"
    aria-label="Hızlı İşlem Menüsü"
  />
</template>

<script>
export default {
  name: "CardMenu",
  props: {
    id: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
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
          icon: "pi pi-list",
        },
        {
          label: "Sıraya ekle",
          icon: "pi pi-plus",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
