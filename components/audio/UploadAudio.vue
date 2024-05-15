<template>
  <PrimeFileUpload
    name="audio"
    accept="audio/mpeg"
    :maxFileSize="100000000"
    label="Ses Dosyası Yükle"
    mode="advanced"
    @input="saveAudioToLocal"
  >
    <template
      #header="{ chooseCallback, uploadCallback, clearCallback, files }"
    >
      <div class="w-full center gap relative">
        <PrimeButton
          @click="showRecorder ? toggleShowRecorder() : chooseCallback()"
          :icon="showRecorder ? 'pi pi-angle-left' : 'pi pi-file-import'"
          rounded
          outlined
        />
        <PrimeButton
          @click="uploadCallback"
          icon="pi pi-upload"
          :disabled="!files || files.length === 0"
          rounded
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
    <template
      #content="{
        files,
        uploadedFiles,
        removeUploadedFileCallback,
        removeFileCallback,
      }"
    >
      <div v-if="files && files.length !== 0"></div>
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
    getUserMedia() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.stream = stream;
      });
      this.toggleShowRecorder();
    },
    toggleShowRecorder() {
      this.showRecorder = !this.showRecorder;
    },
    saveAudioToLocal(event) {
      const file = event.target.files[0];
      const audioUrl = URL.createObjectURL(file);
      localStorage.setItem("audioUrl", audioUrl);
    },
  },
};
</script>

<style scoped>
.relative {
  position: relative;
  z-index: 2;
}
</style>
