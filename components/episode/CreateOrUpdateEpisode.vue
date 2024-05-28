<template>
  <PrimeStepper>
    <PrimeStepperPanel header="Bilgİleri gir">
      <template #content="{ nextCallback }">
        <div class="col-stretch gap-25 h-full">
          <PrimeFloatLabel class="w-full md:w-14rem">
            {{ console.log("asd", usersPodcasts.profile) }}
            <PrimeDropdown
              v-model="selectedPodcast"
              inputId="selectPodcast"
              :options="usersPodcasts.profile.createdPodcastList"
              optionLabel="title"
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
                setItem({
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
                setItem({
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
    <PrimeStepperPanel :header="prop ? 'Sesi güncelle' : 'Ses yükle'">
      <template #content="{ prevCallback, nextCallback }">
        <div class="col-between gap w-full min-h-dialog">
          <UploadAudio :prop="prop" />

          <div class="row-between">
            <PrimeButton @click="prevCallback" label="Geri" text />
            <PrimeButton @click="nextCallback" label="İleri" text />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
    <PrimeStepperPanel header="Önizle">
      <template #content="{ prevCallback }">
        <div class="col-between min-h-dialog">
          <ReviewEpisode
            :episode="{
              episodeTitle,
              episodeDescription,
              audio: prop ? prop.audioUrl : '',
            }"
          />
          <div class="row-between">
            <PrimeButton @click="prevCallback" label="Geri" text />
            <PrimeButton
              @click="handleUpdateOrCreate"
              :label="prop ? 'Güncelle' : 'Paylaş'"
              text
            />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
  </PrimeStepper>
  {{ console.log("selectedPodcast  >> ", selectedPodcast) }}
</template>

<script>
import { mapActions, mapState } from "pinia";
import UploadAudio from "../audio/UploadAudio.vue";
import ReviewEpisode from "./ReviewEpisode.vue";

export default {
  name: "CreateOrUpdateEpisode",
  components: {
    UploadAudio,
    ReviewEpisode,
  },
  props: {
    prop: {
      type: Object,
      required: false,
    },
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
  computed: {
    ...mapState(usePodcastStore, ["usersPodcasts"]),
  },
  methods: {
    ...mapActions(usePodcastStore, ["createEpisode", "updateEpisode"]),
    handleUpdateOrCreate() {
      this.prop ? this.handleUpdateEpisode() : this.handleCreateEpisode();
    },
    async handleCreateEpisode() {
      if (
        this.episodeTitle.length < 2 ||
        this.episodeDescription.length < 20 ||
        !this.selectedPodcast
      ) {
        this.error = "Lütfen zorunlu alanları doldurunuz";
      } else {
        const formData = new FormData();
        formData.append("episodeTitle", this.episodeTitle);
        formData.append("episodeDescription", this.episodeDescription);
        const { data, error } = await this.createEpisode({
          formData,
          podcastId: this.selectedPodcast._id,
        });
        if (!error.value) {
          this.$toast.add({
            severity: "success",
            summary: "Bölüm başarıyla oluşturuldu",
            detail: `${data.value.title} başlıklı bölümünüz eklendi.`,
            life: 4000,
          });
        }
        console.log("data :>> ", data);
        console.log("error :>> ", error);
      }
    },
    async handleUpdateEpisode() {
      if (this.episodeTitle.length < 2 || this.episodeDescription.length < 20) {
        this.error = "Lütfen zorunlu alanları doldurunuz";
        console.log("this.error :>> ", this.error);
      } else {
        const formData = new FormData();
        this.prop.title !== this.episodeTitle &&
          formData.append("episodeTitle", this.episodeTitle);
        this.prop.description !== this.episodeDescription &&
          formData.append("episodeDescription", this.episodeDescription);
        // this.prop._id !== this.selectedPodcast._id &&
        //   formData.append("selectedPodcast", this.selectedPodcast);

        await this.updateEpisode({
          formData,
          podcastId: this.selectedPodcast._id,
          episodeId: this.prop._id,
        });
      }
    },
    setItem(obj) {
      const { key, value } = obj;
      localStorage.setItem(key, value);
    },
  },
  mounted() {
    if (this.prop) {
      this.episodeTitle = this.prop.title;
      this.episodeDescription = this.prop.description;
      this.selectedPodcast = this.profilePodcasts.find((e) => {
        return e._id === this.prop.podcastId;
      });
    } else {
      this.episodeTitle = localStorage.getItem("episodeTitle");
      this.episodeDescription = localStorage.getItem("episodeDescription");
    }
  },
};
</script>

<style scoped>
.p-fileupload {
  width: 100%;
}
</style>
