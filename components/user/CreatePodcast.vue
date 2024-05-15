<template>
  <PrimeStepper class="createPodcastStepper h-full">
    <PrimeStepperPanel header="Bilgileri gir" class="h-full">
      <template #content="{ nextCallback }">
        <div class="w-full h-full col-between">
          <div class="col-stretch gap-25">
            <PrimeFloatLabel class="w-full md:w-20rem">
              <PrimeMultiSelect
                id="categories"
                v-model="selectedCategories"
                :options="categories"
                optionLabel="name"
                :maxSelectedLabels="1"
                selectedItemsLabel="{0} tür seçildi"
                :selectionLimit="3"
                @change="
                  localStorage.setItem('selectedCategories', selectedCategories)
                "
                class="w-full"
              />
              <label for="categories">Podcast Türleri*</label>
            </PrimeFloatLabel>

            <PrimeFloatLabel>
              <PrimeInputText
                v-model="PodcastTitle"
                id="PodcastTitle"
                @blur="localStorage.setItem('PodcastTitle', PodcastTitle)"
                @update:modelValue="() => (error = null)"
                maxlength="20"
                placeholder="Maksimum 20 karakter"
                class="capitalize"
              />
              <label for="PodcastTitle">Podcast Başlığı*</label>
            </PrimeFloatLabel>
            <PrimeFloatLabel>
              <PrimeTextarea
                v-model="PodcastDescription"
                id="PodcastDescription"
                rows="6"
                autocapitalize="on"
                @blur="
                  localStorage.setItem('PodcastDescription', PodcastDescription)
                "
                @update:modelValue="() => (error = null)"
                maxlength="200"
                placeholder="Maksimum 200 karakter"
                class="w-full pb"
              />
              <label for="PodcastDescription">Podcast Açıklaması*</label>
              <p class="maksLength">{{ PodcastDescription.length }} / 200</p>
            </PrimeFloatLabel>
          </div>
          <div class="w-full reversed">
            <PrimeButton
              @click="nextCallback"
              label="İleri"
              icon="pi pi-angle-right"
              iconPos="right"
              text
            />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
    <PrimeStepperPanel header="Resim yükle" class="h-full col-between">
      <template #content="{ prevCallback, nextCallback }">
        <div class="h-full col-between">
          <UploadImage />
          <div class="row-between">
            <PrimeButton
              @click="prevCallback"
              label="Geri"
              icon="pi pi-angle-left"
              text
            />
            <PrimeButton
              @click="nextCallback"
              label="İleri"
              icon="pi pi-angle-right"
              iconPos="right"
              text
            />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
    <PrimeStepperPanel header="Önizle" class="h-full">
      <template #content="{ prevCallback }">
        <div class="h-full col-center gap">
          <div class="col-center gap">
            <Message v-if="error" :message="error" />

            <PodcastCard
              :content="{
                title: PodcastTitle ? PodcastTitle : 'Başlık',
                description: PodcastDescription
                  ? PodcastDescription
                  : 'Açıklama',
                imageUrl: PodcastImage,
              }"
            />
          </div>
          <div class="row-between">
            <PrimeButton
              @click="prevCallback"
              label="Geri"
              icon="pi pi-angle-left"
              text
            />
            <PrimeButton
              @click.prevent="handleCreatePodcast"
              label="Oluştur"
              icon="pi pi-plus"
            />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
  </PrimeStepper>
</template>

<script>
import { mapActions } from "pinia";
import UploadImage from "./UploadImage.vue";
import PodcastCard from "../podcast/PodcastCard.vue";
import { categories } from "~/assets/jsons/categories.json";

export default {
  name: "CreatePodcast",
  components: {
    UploadImage,
    PodcastCard,
  },
  data() {
    return {
      PodcastTitle: "",
      PodcastDescription: "",
      PodcastImage: null,
      selectedCategories: null,
      categories: categories,
      error: null,
    };
  },
  created() {
    if (localStorage.getItem("PodcastTitle")) {
      this.PodcastTitle = localStorage.getItem("PodcastTitle");
    }
    if (localStorage.getItem("PodcastDescription")) {
      this.PodcastDescription = localStorage.getItem("PodcastDescription");
    }
    if (localStorage.getItem("selectedCategories")) {
      this.selectedCategories = localStorage.getItem("selectedCategories");
    }
    if (localStorage.getItem("podcastImage")) {
      this.podcastImage = localStorage.getItem("podcastImage");
    }
  },
  methods: {
    ...mapActions(useToggleStore, ["setPopopComponent"]),
    ...mapActions(usePodcastStore, ["createPodcast"]),
    handleCreatePodcast() {
      const byteCharacters = atob(this.PodcastImage.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      const file = new File([blob], "image.webp");

      if (this.PodcastTitle.length < 2 || this.PodcastDescription.length < 20) {
        this.error = "Lütfen zorunlu alanları doldurunuz";
        console.log("this.error :>> ", this.error);
      } else {
        this.createPodcast({
          podcastName: this.PodcastTitle,
          podcastCategory: selectedCategories,
          podcastDescription: this.PodcastDescription,
          file: file,
        });
      }
    },
  },
};
</script>

<style scoped></style>
