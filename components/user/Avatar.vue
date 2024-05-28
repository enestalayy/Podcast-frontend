<template>
  <div class="relative">
    <img v-if="getUsersAvatar" :src="getUsersAvatar" class="profilePhoto br" />
    <PrimeAvatar v-else :label="user.value" class="profilePhoto br" />
    <PrimeFileUpload
      v-if="editProfile"
      class="updateAvatar"
      mode="basic"
      accept="image/*"
      url="/api/upload"
      :maxFileSize="1000000"
      uploadIcon="pi pi-pencil"
      chooseIcon="pi pi-check"
      @input="editAvatar"
      @upload="postAvatar"
    />
  </div>
</template>

<script>
import * as imageConversion from "image-conversion";
import { mapActions } from "pinia";
export default {
  name: "Avatar",
  props: {
    editProfile: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      user: useSupabaseUser(),
      avatarKey: 0,
      compressedImage: null,
    };
  },
  computed: {
    getUsersAvatar() {
      if (this.compressedImage && this.editProfile) {
        return URL.createObjectURL(this.compressedImage);
      } else {
        const supabase = useSupabaseClient();
        const { data } = supabase.storage
          .from("Avatars")
          .getPublicUrl(`${this.user.id}/avatar`);
        return data.publicUrl;
      }
    },
  },
  methods: {
    ...mapActions(useUserStore, ["uploadAvatar", "updateAvatar"]),

    async editAvatar(event) {
      const file = event.target.files[0];
      if (!file) return;
      const compressedImage = await imageConversion.compress(file, {
        quality: 0.8,
        type: "image/webp",
        width: 200,
        height: 200,
        orientation: 2,
      });
      this.compressedImage = compressedImage;
    },
    async postAvatar() {
      if (this.getUsersAvatar) {
        const { data, error } = await this.updateAvatar(this.compressedImage);
        this.$toast.add({
          severity: "success",
          summary: "Profil resmi güncellendi",
          detail: "Profil resmi başarıyla güncellendi",
          life: 4000,
        });
      } else {
        const { data, error } = await this.uploadAvatar(this.compressedImage);
        console.log("data :>> ", data);
        console.log("error :>> ", error);
      }
    },
  },
};
</script>

<style scoped>
.profilePhoto {
  width: 100px;
  height: 100px;
  font-size: 56px;
}
</style>
