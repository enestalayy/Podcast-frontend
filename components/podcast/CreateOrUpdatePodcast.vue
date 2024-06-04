<template>
  <PrimeStepper class="createPodcastStepper h-full">
    <PrimeStepperPanel
      :header="prop ? 'Bilgileri güncelle' : 'Bilgileri gir'"
      class="h-full"
    >
      <template #content="{ nextCallback }">
        <div class="w-full h-full col-between align-stretch">
          <PrimeFloatLabel class="w-full md:w-20rem">
            <PrimeMultiSelect
              id="categories"
              v-model="selectedCategories"
              :options="categories"
              optionLabel="name"
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
              @blur="setItem({ key: 'podcastTitle', value: podcastTitle })"
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
          <div class="w-full reversed">
            <PrimeButton
              @click="nextCallback"
              label="İleri"
              icon="pi pi-angle-right"
              iconPos="right"
            />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
    <PrimeStepperPanel
      :header="prop ? 'Resmi güncelle' : 'Resim yükle'"
      class="h-full col-between"
    >
      <template #content="{ prevCallback, nextCallback }">
        <div class="h-full col-between">
          <UploadImage
            :imageUrl="prop && prop.imageUrl"
            @update:imageUrl="updateImageUrl"
          />
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
            />
          </div>
        </div>
      </template>
    </PrimeStepperPanel>
    <PrimeStepperPanel header="Önizle" class="h-full">
      <template #content="{ prevCallback }">
        <div class="h-full col-between gap">
          <div class="col-center gap">
            <ErrorMessage v-if="error" :message="error" />
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
              @click.prevent="handleCreateOrUpdatePodcast"
              :loading="pending"
              :label="prop ? 'Kaydet' : 'Oluştur'"
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
import PodcastCard from "./card/PodcastCard.vue";
import { categories } from "~/assets/jsons/categories.json";
import messages from "~/assets/jsons/messages.json";

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
      pending: false,
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
      const selectedCategory = this.prop.category.map((e) => {
        return this.categories.find((category) => {
          return category.name === e;
        });
      });
      this.selectedCategories = selectedCategory;
      this.podcastTitle = this.prop.title;
      this.podcastDescription = this.prop.description;
      this.podcastImage = this.prop.imageUrl;
    }
  },
  computed: {
    async blob() {
      if (this.podcastImage) {
        const byteCharacters = atob(this.podcastImage.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        return blob;
      } else {
        const response = await fetch("/defaultCardImage.webp");
        const defaultBlob = await response.blob();
        console.log("defaultBlob :>> ", defaultBlob);
        return defaultBlob;
      }
    },
  },
  methods: {
    ...mapActions(useToggleStore, ["setPopopComponent", "toggleState"]),
    ...mapActions(usePodcastStore, [
      "createPodcast",
      "updatePodcastInfo",
      "updatePodcastFile",
    ]),
    handleCreateOrUpdatePodcast() {
      this.prop ? this.handleUpdatePodcast() : this.handleCreatePodcast();
    },
    async handleCreatePodcast() {
      const blob = await this.blob;
      const file = new File([blob], "image.webp");
      if (
        !this.selectedCategories ||
        !this.podcastTitle ||
        !this.podcastDescription
      ) {
        this.error = "Lütfen zorunlu alanları doldurunuz";
      } else {
        const selectedCategoriesNames = [];
        this.selectedCategories.map((e) => {
          selectedCategoriesNames.push(e.name);
        });
        const formData = new FormData();
        console.log("selectedCategoriesNames :>> ", selectedCategoriesNames);
        formData.append("podcastTitle", this.podcastTitle);
        formData.append(
          "podcastCategory",
          JSON.stringify(selectedCategoriesNames)
        );

        formData.append("podcastDescription", this.podcastDescription);
        formData.append("file", file);

        const { data, error, pending } = await this.createPodcast({
          formData,
        });
        this.pending = pending;
        if (!error.value) {
          this.toggleState("visible");

          this.$toast.add({
            severity: "success",
            summary: "Podcast başarıyla oluşturuldu",
            detail: `${data.value.title} başlıklı podcastiniz eklendi.`,
            life: 4000,
          });
        } else {
          this.$toast.add({
            severity: "warn",
            summary: "Podcast oluşturma başarısız",
            detail: messages[error.value.statusCode],
            life: 4000,
          });
        }
      }
    },

    async handleUpdatePodcast() {
      const formInfo = {};
      const formFile = new FormData();

      if (this.prop.title !== this.podcastTitle) {
        formInfo.podcastTitle = this.podcastTitle;
      }
      if (this.prop.description !== this.podcastDescription) {
        formInfo.podcastDescription = this.podcastDescription;
      }
      const selectedCategoriesNames = [];
      this.selectedCategories.map((e) => {
        selectedCategoriesNames.push(e.name);
      });
      const oldCategories = JSON.stringify([...this.prop.category].sort());
      const newCategories = JSON.stringify(selectedCategoriesNames.sort());
      if (oldCategories != newCategories) {
        formInfo.podcastCategory = selectedCategoriesNames;
      }

      if (this.prop.imageUrl !== this.podcastImage) {
        const blob = await this.blob;
        const file = new File([blob], "image.webp");
        formFile.append("file", file);
        const fileResponse = await this.updatePodcastFile({
          formFile,
          podcastId: this.prop._id,
        });
        this.pending = fileResponse.pending;

        if (!fileResponse.error.value) {
          this.toggleState("visible");

          this.$toast.add({
            severity: "success",
            summary: "Podcast görseli başarıyla Güncellendi",
            detail: `${fileResponse.data.value.title} başlıklı podcastinizin görseli güncellendi.`,
            life: 4000,
          });
        } else {
          this.$toast.add({
            severity: "warn",
            summary: "Podcast görseli güncellenemedi",
            detail: messages[fileResponse.error.value.statusCode],
          });
        }
      }

      if (Object.keys(formInfo).length > 0) {
        const infoResponse = await this.updatePodcastInfo({
          formInfo,
          podcastId: this.prop._id,
        });
        this.pending = infoResponse.pending;

        if (!infoResponse.error.value) {
          this.toggleState("visible");

          this.$toast.add({
            severity: "success",
            summary: "Podcast bilgileri başarıyla Güncellendi",
            detail: `${infoResponse.data.value.title} başlıklı podcastiniz güncellendi.`,
            life: 4000,
          });
        } else {
          this.$toast.add({
            severity: "warn",
            summary: "Podcast bilgileri güncellenemedi",
            detail: messages[infoResponse.error.value.statusCode],
          });
        }
      } else {
        this.$toast.add({
          severity: "info",
          summary: "Güncelleme Başarısız.",
          detail: "Lütfen güncellemek istediğiniz bilgileri giriniz",
          life: 4000,
        });
      }
    },
    setItem(obj) {
      const { key, value } = obj;
      if (!this.prop && value && value.length > 0) {
        localStorage.setItem(key, value);
      }
    },
    updateImageUrl(newImageUrl) {
      this.podcastImage = newImageUrl;
    },
  },
};
</script>

<style scoped></style>
