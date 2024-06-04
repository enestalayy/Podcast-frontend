<template>
  <div class="w-full h-full col align-center gap">
    <div class="w-fit row gap">
      <PrimeFileUpload
        id="file"
        mode="basic"
        name="demo[]"
        accept="image/jpeg,image/png,image/webp"
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
      :src="imageFromLocal"
      width="200"
      height="200"
      alt="image"
      class="br m"
    />
  </div>
</template>

<script>
import * as imageConversion from "image-conversion";

export default {
  name: "UploadImage",
  data() {
    return {
      uploadedImage: null,
    };
  },
  props: {
    imageUrl: {
      type: String,
      required: false,
    },
  },
  computed: {
    imageFromLocal() {
      const localImg = localStorage.getItem("podcastImage");
      if (this.uploadedImage) {
        return this.uploadedImage;
      } else if (this.imageUrl) {
        return this.imageUrl;
      } else if (localImg) {
        return localImg;
      } else return "/defaultCardImage.webp";
    },
  },

  methods: {
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
        this.uploadedImage = url;
        localStorage.setItem("podcastImage", url);
        this.$emit("update:imageUrl", url);
      });

      // this.uploadImg(compressedImage); // Resized image is uploaded here
    },

    clearImage() {
      this.imageFromLocal = null;
      localStorage.removeItem("podcastImage");
      this.$emit("update:imageUrl", "");
    },
  },
};
</script>

<style scoped></style>
