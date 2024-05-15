<template>
  <div class="h-full col-center center gap">
    <PrimeFileUpload
      id="file"
      mode="basic"
      name="demo[]"
      url="/api/upload"
      accept="image/*"
      :maxFileSize="1000000"
      chooseLabel="Dosya seç"
      chooseIcon="pi pi-file-import"
      @input="resizeImg"
    />
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
import { compress } from "image-conversion";

export default {
  name: "UploadImage",
  data() {
    return {
      imageFromLocal: null,
    };
  },
  created() {
    this.imageFromLocal = localStorage.getItem("podcastImage");
  },
  methods: {
    async resizeImg(event) {
      const fr = new FileReader();
      const file = event.target.files[0];
      const compressedImage = await compress(file, {
        quality: 0.8,
        type: "image/webp",
        width: 200,
        height: 200,
        orientation: 2,
      });
      fr.readAsDataURL(compressedImage);

      fr.addEventListener("load", () => {
        const url = fr.result;
        this.imageFromLocal = url;
        localStorage.setItem("podcastImage", url);
      });
    },
  },
};
</script>

<style scoped></style>
