<template>
  <div class="relative">
    <img v-if="getUsersAvatar" :src="getUsersAvatar" class="profilePhoto br" />
    <PrimeAvatar v-else :label="user.value" class="profilePhoto br" />
    <PrimeFileUpload
      v-if="editProfile"
      class="updateAvatar"
      mode="basic"
      accept="image/*"
      :maxFileSize="1000000"
      uploadIcon="pi pi-pencil"
      @input="editAvatar"
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
    };
  },
  computed: {
    getUsersAvatar() {
      const supabase = useSupabaseClient();
      const { data } = supabase.storage
        .from("Avatars")
        .getPublicUrl(`${this.user.id}/avatar`);
      return data.publicUrl;
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
      if (this.getUsersAvatar) {
        const { data, error } = await this.updateAvatar(compressedImage);
      } else {
        const { data, error } = await this.uploadAvatar(compressedImage);
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
