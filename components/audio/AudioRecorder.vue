<template>
  <div class="col res-gap br">
    <Logo
      style="
        position: absolute;
        top: 0;
        left: 25%;
        transition: all 0.1s;
        z-index: 0;
        opacity: 0.05;
      "
      :style="{
        transform: `scale(${scale * 2.5}%)`,
        filter: `brightness(${scale * 2}%)`,
      }"
    />
    <div class="col w-full center gap relative">
      <ErrorMessage
        :message="'Sayfa yenilendiğinde tüm veriler kaybolacaktır'"
      />
      <div class="row gap">
        <PrimeButton
          @click="handleRecordAudio"
          :icon="isRecording ? 'pi pi-pause' : 'pi pi-microphone'"
          rounded
          outlined
        />
        <p>{{ currentTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";

export default {
  name: "AudioRecorder",
  props: {
    stream: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      seconds: 0,
      currentTime: "00:00",
      scale: 100,
    };
  },

  methods: {
    ...mapActions(usePodcastStore, ["readFile"]),
    handleRecordAudio() {
      if (this.isRecording) {
        setTimeout(() => {}, 200);
        this.mediaRecorder.stop();
        clearInterval(this.timer);
        this.isRecording = false;
      } else {
        setTimeout(() => {}, 200);
        this.isRecording = true;
        this.mediaRecorder = new MediaRecorder(this.stream);
        this.mediaRecorder.start();

        this.timer = setInterval(() => {
          this.seconds += 0.1;
          const minutes = Math.floor(this.seconds / 60);
          const seconds = Math.floor(this.seconds % 60);
          this.currentTime =
            (minutes < 10 ? "0" : "") +
            minutes +
            ":" +
            (seconds < 10 ? "0" : "") +
            seconds;
        }, 100);

        this.mediaRecorder.addEventListener("dataavailable", (event) => {
          this.audioChunks.push(event.data);
          const concatenatedFile = new File(
            this.audioChunks,
            "concatenated_audio.webm",
            {
              type: "audio/webm;codecs=opus",
            }
          );
          this.readFile(concatenatedFile);
        });
      }
    },

    visualizeAudio() {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(this.stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      const draw = () => {
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        let average = 0;
        for (let i = 0; i < bufferLength; i++) {
          average += dataArray[i];
        }
        average /= bufferLength;
        this.scale = (average / 2 + 50).toFixed(2);
      };

      draw();
    },
  },
  mounted() {
    this.visualizeAudio();
  },
};
</script>

<style scoped>
.relative {
  position: relative;
  z-index: 2;
}
</style>
