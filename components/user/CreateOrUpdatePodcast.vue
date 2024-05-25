<template>
  <PrimeStepper class="createPodcastStepper h-full">
    <PrimeStepperPanel header="Bilgileri gir" class="h-full">
      <template #content="{ nextCallback }">
        <div class="w-full min-h-dialog col-between">
          <div class="w-full col-stretch gap-25">
            <PrimeFloatLabel v-if="!prop" class="w-full md:w-20rem">
              <PrimeMultiSelect
                id="categories"
                v-model="selectedCategories"
                :options="categories"
                optionLabel="name"
                :maxSelectedLabels="1"
                selectedItemsLabel="{0} tür seçildi"
                :selectionLimit="3"
                @change="
                  setItem({
                    key: 'selectedCategories',
                    value: JSON.stringify(selectedCategories),
                  })
                "
                class="w-full"
              />
              <label for="categories">Podcast Türleri*</label>
            </PrimeFloatLabel>

            <PrimeFloatLabel>
              <PrimeInputText
                v-model="podcastTitle"
                id="podcastTitle"
                @blur="
                  !prop && setItem({ key: 'podcastTitle', value: podcastTitle })
                "
                @update:modelValue="() => (error = null)"
                maxlength="20"
                :placeholder="prop ? prop.title : 'Maksimum 20 karakter'"
                class="capitalize"
              />
              <label for="podcastTitle">Podcast Başlığı*</label>
            </PrimeFloatLabel>
            <PrimeFloatLabel>
              <PrimeTextarea
                v-model="podcastDescription"
                id="podcastDescription"
                rows="6"
                autocapitalize="on"
                @blur="
                  !prop &&
                    setItem({
                      key: 'podcastDescription',
                      value: podcastDescription,
                    })
                "
                @update:modelValue="() => (error = null)"
                maxlength="200"
                :placeholder="prop ? prop.title : 'Maksimum 200 karakter'"
                class="w-full pb"
              />
              <label for="podcastDescription">Podcast Açıklaması*</label>
              <p class="maksLength">{{ podcastDescription.length }} / 200</p>
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
          <UploadImage :imageUrl="prop.imageUrl" />
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
                title: podcastTitle ? podcastTitle : 'Başlık',
                description: podcastDescription
                  ? podcastDescription
                  : 'Açıklama',
                imageUrl: podcastImage
                  ? podcastImage
                  : '/defaultCardImage.webp',
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
              @click.prevent="prop ? handleUpdatePodcast : handleCreatePodcast"
              :label="prop ? 'Güncelle' : 'Oluştur'"
              :icon="prop ? '' : 'pi pi-plus'"
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
  name: "CreateOrUpdatePodcast",
  props: {
    prop: {
      type: Object,
      required: false,
    },
  },
  components: {
    UploadImage,
    PodcastCard,
  },
  data() {
    return {
      podcastTitle: "",
      podcastDescription: "",
      podcastImage: null,
      selectedCategories: null,
      categories: categories,
      error: null,
    };
  },
  created() {
    if (!this.prop) {
      if (localStorage.getItem("podcastTitle")) {
        this.podcastTitle = localStorage.getItem("podcastTitle");
      }
      if (localStorage.getItem("podcastDescription")) {
        this.podcastDescription = localStorage.getItem("podcastDescription");
      }
      if (localStorage.getItem("selectedCategories")) {
        this.selectedCategories = JSON.parse(
          localStorage.getItem("selectedCategories")
        );
      }
      if (localStorage.getItem("podcastImage")) {
        this.podcastImage = localStorage.getItem("podcastImage");
      }
    } else {
      this.podcastTitle = this.prop.title;
      this.podcastDescription = this.prop.description;
      this.podcastImage = this.prop.imageUrl;
    }
  },
  // computed: {
  //   podcastImage() {
  //     if (localStorage.getItem("podcastImage")) {
  //       return localStorage.getItem("podcastImage");
  //     } else return null;
  //   },
  // },
  methods: {
    ...mapActions(useToggleStore, ["setPopopComponent"]),
    ...mapActions(usePodcastStore, ["createPodcast"]),
    handleCreatePodcast() {
      const byteCharacters = atob(this.podcastImage.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      const file = new File([blob], "image.webp");
      if (this.podcastTitle.length < 2 || this.podcastDescription.length < 20) {
        this.error = "Lütfen zorunlu alanları doldurunuz";
        console.log("this.error :>> ", this.error);
      } else {
        const formData = new FormData();
        formData.append("podcastName", this.podcastTitle);
        formData.append("podcastCategory", this.selectedCategories[0].name);
        formData.append("podcastDescription", this.podcastDescription);
        formData.append("file", file);

        const { data, error } = this.createPodcast({
          formData,
        });
        if (!error) {
          this.$toast.add({
            severity: "success",
            summary: "Podcast başarıyla oluşturuldu",
            detail: `${data.value.title} başlıklı podcastiniz eklendi.`,
            life: 4000,
          });
        } else console.error(error);
      }
    },
    handleUpdatePodcast() {
      alert("güncellendi");
    },
    setItem(obj) {
      const { key, value } = obj;
      localStorage.setItem(key, value);
    },
  },
};
</script>

<style scoped></style>
