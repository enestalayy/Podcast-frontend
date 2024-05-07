<template>
  <div class="row-between p res-p gap res-gap">
    <div class="playerPodcastInfo row gap res-gap">
      <img
        :src="currentPodcast.imageUrl"
        alt="image"
        width="70"
        height="70"
        class="br playerImage"
      />
      <p class="playerText word-break" v-text="currentEpisode.title" />
    </div>
    <div class="row gap res-gap">
      <div class="row center">
        <PrimeButton
          @click="seekBackward()"
          icon="pi pi-replay"
          text
          badge="10"
          badgeClass="seekBackwardBadge"
          class="max-lg-none seekButton"
        />
        <PrimeButton
          @click="togglePlay"
          :icon="isPlaying ? 'pi pi-pause' : 'pi pi-play'"
          class="playerButton"
        ></PrimeButton>
        <PrimeButton
          @click="seekForward()"
          icon="pi pi-refresh"
          text
          badge="10"
          badgeClass="seekForwardBadge"
          class="max-lg-none seekButton"
        />
      </div>

      <div class="row gap res-gap playerWrapper">
        <p class="playerText" v-text="convertTime(currentTime)" />
        <PrimeSlider
          v-model="currentTime"
          @change="setCurrentTime"
          :max="audio.duration"
          class="player"
        />
        <p class="playerText" v-text="convertTime(audio.duration)" />
      </div>
    </div>
    <div class="row gap res-gap">
      <div class="volumeWrapper center transition">
        <PrimeButton
          @click="toggleVolume"
          :icon="
            audio.volume === 0 || isMuted
              ? 'pi pi-volume-off'
              : audio.volume < parseFloat(0.5)
              ? 'pi pi-volume-down'
              : 'pi pi-volume-up'
          "
          text
          class="playerButton volumeButton"
        />
        <PrimeSlider
          v-model="volume"
          @change="setVolume"
          orientation="vertical"
          class="volumeSlider transition"
        />
      </div>

      <PrimeButton
        icon="pi pi-share-alt"
        text
        class="playerButton max-sm-none"
      />
      <QueueSidebar />
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import QueueSidebar from "../layout/QueueSidebar.vue";
export default {
  name: "AudioPlayer",
  components: {
    QueueSidebar,
  },
  data() {
    return {
      audio: null,
      audioDuration: null,
      currentTime: null,
      isPlaying: false,
      volume: 100,
      isMuted: false,
    };
  },

  computed: {
    ...mapState(usePodcastStore, ["currentPodcast", "currentEpisode"]),
    // audio() {
    //   return new Audio(this.currentEpisode.audio.downloadUrl);
    // },
  },
  created() {
    this.audio = new Audio(this.currentEpisode.audio.downloadUrl);
  },
  mounted: function () {
    this.currentTime = this.audio.currentTime;
    this.volume = this.audio.volume * 100;
    this.isMuted = this.audio.muted;
    this.togglePlay();
  },
  methods: {
    convertTime(sec) {
      const minutes = Math.floor(sec / 60);
      const seconds = Math.floor(sec % 60);
      return isNaN(sec)
        ? "00:00"
        : `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
    setCurrentTime() {
      // var diff = Math.abs(this.currentTime - this.audio.currentTime);
      // if (diff > 0.01) {
      //   this.audio.currentTime = this.currentTime;
      // }
      this.audio.currentTime = this.currentTime;
    },
    setVolume() {
      this.audio.volume = this.volume / 100;
    },
    togglePlay() {
      if (this.audio.paused) {
        this.audio.play();
        this.isPlaying = true;
      } else {
        this.audio.pause();
        this.isPlaying = false;
      }
    },
    toggleVolume() {
      this.audio.muted = !this.audio.muted;
      this.isMuted = !this.isMuted;
    },
    playbackListener(e) {
      this.currentTime = this.audio.currentTime;

      //Add listeners for audio pause and audio end events
      // audio.addEventListener("ended", this.endListener);
      // audio.addEventListener("pause", this.pauseListener);
    },
    seekForward() {
      this.audio.currentTime += 10;
      this.currentTime += 10;
    },
    seekBackward() {
      this.audio.currentTime -= 10;
      this.currentTime -= 10;
    },
  },
  watch: {
    isPlaying(newValue) {
      if (newValue) {
        this.audio.addEventListener("timeupdate", this.playbackListener);
      } else {
        this.audio.removeEventListener("timeupdate", this.playbackListener);
      }
    },
    // currentTime(newValue) {
    //   var diff = Math.abs(newValue - this.audio.currentTime);
    //   if (diff > 0.01) {
    //     this.audio.currentTime = newValue;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped></style>
