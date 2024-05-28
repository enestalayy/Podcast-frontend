<template>
  <div class="w-full min-h-dialog col-center gap">
    <div class="w-fit row gap">
      <PrimeFileUpload
        id="file"
        mode="basic"
        name="demo[]"
        accept="image/*"
        :maxFileSize="1000000"
        chooseLabel="Dosya seç"
        chooseIcon="pi pi-file-import"
        @input="resizeImg"
        class="w-fit center"
      />
      <PrimeButton
        @click="clearImage"
        icon="pi pi-times"
        rounded
        outlined
        severity="danger"
      />
    </div>
    <img
      v-show="imageFromLocal"
      :src="imageFromLocal"
      width="200"
      height="200"
      alt="image"
      class="br"
    />
  </div>
</template>

<script>
import * as imageConversion from "image-conversion";
import { mapActions } from "pinia";

export default {
  name: "UploadImage",
  props: {
    imageUrl: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      imageFromLocal: null,
    };
  },
  created() {
    this.imageFromLocal = this.imageUrl
      ? this.imageUrl
      : localStorage.getItem("podcastImage");
  },
  methods: {
    ...mapActions(usePodcastStore, ["uploadImg"]),
    async resizeImg(event) {
      const file = event.target.files[0];
      if (!file) return;

      const compressedImage = await imageConversion.compress(file, {
        quality: 0.8,
        type: "image/webp",
        width: 200,
        height: 200,
        orientation: 2,
      });

      const fr = new FileReader();
      fr.readAsDataURL(compressedImage);

      fr.addEventListener("load", () => {
        const url = fr.result;
        this.imageFromLocal = url;
        localStorage.setItem("podcastImage", url);
      });

      this.uploadImg(compressedImage); // Resized image is uploaded here
    },

    clearImage() {
      this.imageFromLocal = null;
      localStorage.removeItem("podcastImage");
    },
  },
};
</script>

<style scoped></style>
