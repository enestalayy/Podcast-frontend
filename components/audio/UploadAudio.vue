<template>
  <PrimeFileUpload
    name="audio"
    accept="audio/mpeg"
    :maxFileSize="100000000"
    label="Ses Dosyası Yükle"
    mode="advanced"
    @change="deneme"
  >
    <template #header="{ chooseCallback, clearCallback, files }">
      <div class="w-full center gap relative">
        <PrimeButton
          @click="showRecorder ? toggleShowRecorder() : chooseCallback()"
          :icon="showRecorder ? 'pi pi-angle-left' : 'pi pi-file-import'"
          label="Ses yükle"
          :disabled="files[0]"
          outlined
        />

        <PrimeButton
          @click="clearCallback"
          icon="pi pi-times"
          :disabled="!files || files.length === 0"
          rounded
          severity="danger"
          outlined
        />
      </div>
    </template>
    <template #content="{ files }">
      <div v-if="files && files[0]">
        {{ readFile(files[0]) }}
        <p v-text="files[0].name" />
        <p>{{ (files[0].size / 1000000).toFixed(2) }} MB</p>
      </div>
      <div v-else-if="showRecorder" class="col-center">
        <AudioRecorder v-if="stream" :stream="stream" />
      </div>
    </template>
    <template v-if="!showRecorder" #empty>
      <div class="col-center">
        <i class="pi pi-cloud-upload font-32" />
        <p class="">Dosyayı sürükle ve bırak</p>
        <div class="row gap">
          <p class="">veya ses kaydet</p>
          <PrimeButton @click="getUserMedia" icon="pi pi-microphone" rounded />
        </div>
      </div>
    </template>
  </PrimeFileUpload>
</template>

<script>
import { mapActions } from "pinia";
import AudioRecorder from "../audio/AudioRecorder.vue";

export default {
  name: "UploadAudio",
  components: {
    AudioRecorder,
  },
  data() {
    return {
      showRecorder: false,
      audioUrl: null,
      stream: null,
    };
  },
  methods: {
    ...mapActions(usePodcastStore, ["readFile"]),
    getUserMedia() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.stream = stream;
      });
      this.toggleShowRecorder();
    },
    toggleShowRecorder() {
      this.showRecorder = !this.showRecorder;
    },
    handleFileUpload(event) {
      console.log("event :>> ", event);
      const files = event;
      if (files.length > 0) {
        const file = files[0];
      }
    },
  },
};
</script>

<style scoped>
/* İsteğe bağlı stiller */
</style>

<style scoped>
.relative {
  position: relative;
  z-index: 2;
}
.p-fileupload {
  min-height: 250px;
}
.p-fileupload-content {
  min-height: 150px;
}
</style>
