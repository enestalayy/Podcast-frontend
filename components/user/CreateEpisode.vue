<template>
  <PrimeStepper>
    <PrimeStepperPanel header="Bilgİleri gir">
      <template #content="{ nextCallback }">
        <div class="col-stretch gap-25 h-full">
          <PrimeFloatLabel class="w-full md:w-14rem">
            <PrimeDropdown
              v-model="selectedPodcast"
              inputId="selectPodcast"
              :options="podcasts"
              optionLabel="name"
              emptyMessage="Henüz bir Podcast paylaşılmamış"
              class="w-full"
            />
            <label for="selectPodcast">Podcast Seç</label>
          </PrimeFloatLabel>

          <PrimeFloatLabel>
            <PrimeInputText
              v-model="episodeTitle"
              id="episodeTitle"
              @blur="
                setToLocalStorage({
                  key: 'episodeTitle',
                  value: episodeTitle,
                })
              "
              @update:modelValue="() => (error = null)"
              maxlength="20"
              placeholder="Maksimum 20 karakter"
            />
            <label for="episodeTitle">Bölüm Başlığı*</label>
          </PrimeFloatLabel>
          <PrimeFloatLabel>
            <PrimeTextarea
              v-model="episodeDescription"
              id="episodeDescription"
              rows="6"
              autocapitalize="on"
              @blur="
                setToLocalStorage({
                  key: 'episodeDescription',
                  value: episodeDescription,
                })
              "
              @update:modelValue="() => (error = null)"
              maxlength="200"
              placeholder="Maksimum 200 karakter"
              class="w-full pb"
            />
            <label for="episodeDescription">Bölüm Açıklaması*</label>
            <p class="maksLength">
              {{ episodeDescription ? episodeDescription.length : 0 }} / 200
            </p>
          </PrimeFloatLabel>
          <div class="w-full reversed">
            <PrimeButton @click="nextCallback" label="İleri" text />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
    <PrimeStepperPanel header="Ses yükle">
      <template #content="{ prevCallback, nextCallback }">
        <div class="col gap w-full h-full">
          <UploadAudio />

          <div class="row-between">
            <PrimeButton @click="prevCallback" label="Geri" text />
            <PrimeButton @click="nextCallback" label="İleri" text />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
    <PrimeStepperPanel header="Önizle">
      <template #content="{ prevCallback, nextCallback }">
        <div class="col-between min-h-dialog">
          <ReviewEpisode :episode="{ episodeTitle, episodeDescription }" />
          <div class="row-between">
            <PrimeButton @click="prevCallback" label="Geri" text />
            <PrimeButton @click="nextCallback" label="Paylaş" text />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
  </PrimeStepper>
</template>

<script>
import UploadAudio from "../audio/UploadAudio.vue";
import ReviewEpisode from "./ReviewEpisode.vue";

export default {
  name: "CreateEpisode",
  components: {
    UploadAudio,
    ReviewEpisode,
  },
  data() {
    return {
      episodeTitle: "",
      episodeDescription: "",
      podcasts: null,
      selectedPodcast: null,
      error: null,
    };
  },
  methods: {
    handleCreateEpisode() {
      if (this.episodeTitle.length < 2 || this.episodeDescription.length < 20) {
        this.error = "Lütfen zorunlu alanları doldurunuz";
        console.log("this.error :>> ", this.error);
      } else {
      }
    },
    setToLocalStorage(obj) {
      const { key, value } = obj;
      localStorage.setItem(key, value);
    },
  },
  mounted() {
    this.episodeTitle = localStorage.getItem("episodeTitle");
    this.episodeDescription = localStorage.getItem("episodeDescription");
  },
};
</script>

<style scoped></style>
