<template>
  <PrimeStepper>
    <PrimeStepperPanel header="Bilgİleri gir">
      <template #content="{ nextCallback }">
        <div class="col-between align-stretch h-full">
          <PrimeFloatLabel class="w-full md:w-14rem">
            <PrimeDropdown
              v-model="selectedPodcast"
              inputId="selectPodcast"
              :options="usersPodcasts.profile.createdPodcastList"
              optionLabel="title"
              emptyMessage="Henüz bir Podcast paylaşılmamış"
              @change="
                setItem({
                  key: 'selectedPodcast',
                  value: selectedPodcast._id,
                })
              "
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
            <PrimeButton @click="nextCallback" label="İleri" />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
    <PrimeStepperPanel :header="prop ? 'Sesi güncelle' : 'Ses yükle'">
      <template #content="{ prevCallback, nextCallback }">
        <div class="col-between gap w-full h-full">
          <UploadAudio :prop="prop" />

          <div class="row-between">
            <PrimeButton @click="prevCallback" label="Geri" text />
            <PrimeButton @click="nextCallback" label="İleri" />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
    <PrimeStepperPanel header="Önizle">
      <template #content="{ prevCallback }">
        <div class="col-between h-full">
          <ErrorMessage v-if="error" :message="error" />
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
            />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
  </PrimeStepper>
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
      pending: false,
    };
  },
  computed: {
    ...mapState(usePodcastStore, ["usersPodcasts"]),
  },
  methods: {
    ...mapActions(useToggleStore, ["toggleState"]),

    ...mapActions(usePodcastStore, ["createEpisode", "updateEpisode"]),
    handleUpdateOrCreate() {
      this.prop ? this.handleUpdateEpisode() : this.handleCreateEpisode();
    },
    async handleCreateEpisode() {
      if (
        !this.episodeTitle ||
        !this.episodeDescription ||
        !this.selectedPodcast
      ) {
        this.error = "Lütfen zorunlu alanları doldurunuz";
      } else {
        const formData = new FormData();
        formData.append("episodeTitle", this.episodeTitle);
        formData.append("episodeDescription", this.episodeDescription);
        const { data, error, pending } = await this.createEpisode({
          formData,
          podcastId: this.selectedPodcast._id,
        });
        this.pending = pending;
        if (!error.value) {
          this.toggleState("visible");

          this.$toast.add({
            severity: "success",
            summary: "Bölüm başarıyla oluşturuldu",
            detail: `${data.value.title} başlıklı bölümünüz eklendi.`,
            life: 4000,
          });
        } else {
          this.error = error.value.statusCode;
        }
      }
    },
    async handleUpdateEpisode() {
      if (!this.episodeTitle && !this.episodeDescription && !this.file) {
        this.error = "Lütfen zorunlu alanları doldurunuz";
      } else {
        const episodeInfo = {};
        if (this.prop.title !== this.episodeTitle) {
          episodeInfo.episodeTitle = this.episodeTitle;
        }
        if (this.prop.description !== this.episodeDescription) {
          episodeInfo.episodeDescription = this.episodeDescription;
        }

        // this.prop._id !== this.selectedPodcast._id &&
        //   episodeInfo.append("selectedPodcast", this.selectedPodcast);

        const { data, error, pending } = await this.updateEpisode({
          episodeInfo,
          podcastId: this.selectedPodcast._id,
          episodeId: this.prop._id,
        });

        this.pending = pending;

        if (!error.value) {
          this.toggleState("visible");

          this.$toast.add({
            severity: "success",
            summary: "Bölüm başarıyla güncellendi",
            detail: `${data.value.name} başlıklı bölümünüz güncellendi.`,
            life: 4000,
          });
        } else {
          alert("HATA", error.value);
        }
      }
    },
    setItem(obj) {
      const { key, value } = obj;
      if (!this.prop && value && value.length > 0) {
        localStorage.setItem(key, value);
      }
    },
  },
  mounted() {
    if (this.prop) {
      this.episodeTitle = this.prop.title;
      this.episodeDescription = this.prop.description;
      this.selectedPodcast = this.usersPodcasts.profile.createdPodcastList.find(
        (e) => {
          return e._id === this.prop.podcastId;
        }
      );
    } else {
      this.episodeTitle = localStorage.getItem("episodeTitle");
      this.episodeDescription = localStorage.getItem("episodeDescription");
      this.selectedPodcast = this.usersPodcasts.profile.createdPodcastList.find(
        (e) => {
          return e._id === localStorage.getItem("selectedPodcast");
        }
      );
    }
  },
};
</script>

<style scoped>
.p-fileupload {
  width: 100%;
}
</style>
