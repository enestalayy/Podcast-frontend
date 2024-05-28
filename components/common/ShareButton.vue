<template>
  <PrimeButton @click="sharePopup" text icon="pi pi-share-alt" />
</template>

<script>
import { mapActions } from "pinia";

export default {
  name: "ShareButton",
  props: {
    shareObject: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(useToggleStore, ["setPopupComponent"]),
    sharePopup() {
      this.setPopupComponent({
        header: "Paylaş",
        name: "ShareComponent",
        prop: this.shareObject,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
