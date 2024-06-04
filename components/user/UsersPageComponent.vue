<template>
  <div class="w-full">
    <div class="p m profileContainer br">
      <div class="row-between" style="align-items: stretch">
        <div class="row gap">
          <Avatar :editProfile="editProfile" />
          <div class="col gap-25">
            <h3 class="font-32 m-0" v-text="session.user.user_metadata.name" />
            <div class="row gap">
              <p class="m-0">16 takipçi</p>
              <p class="m-0">20 takip edilen</p>
            </div>
          </div>
        </div>
        <div class="col p gap" style="align-items: end">
          <div class="row gap">
            <div v-if="updatingEmail" class="row gap">
              <PrimeInputText
                v-model="newEmail"
                :placeholder="session.user.user_metadata.email"
              />
            </div>
            <h3 v-else class="m-0" v-text="session.user.user_metadata.email" />
            <PrimeButton
              v-if="editProfile"
              @click="handleUpdateEmail"
              :icon="updatingEmail ? 'pi pi-check' : 'pi pi-pencil'"
            />
          </div>
          <p
            v-if="session.user.user_metadata.birthDate"
            v-text="formattedBirthDate"
          />
          <div v-else-if="editProfile" class="row gap">
            <BirthDate />
            <PrimeButton
              @click="updateBirthDate"
              :disabled="!birthDate"
              icon="pi pi-pencil"
            />
          </div>
          <div class="row gap" v-show="editProfile && hasPassword">
            <PrimePassword
              v-show="editPassword"
              v-model="newPassword"
              toggleMask
            />
            <PrimeButton
              v-show="editPassword"
              @click="updatePassword"
              icon="pi pi-check"
            />
            <PrimeButton
              @click="editPassword = !editPassword"
              :label="editPassword ? '' : 'Şifre Değiştir'"
              :icon="editPassword ? 'pi pi-times' : 'pi pi-key'"
              iconPos="right"
              outlined
              :severity="editPassword ? 'danger' : 'primary'"
              :rounded="editPassword"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!userId" class="w-full row-between p">
      <div class="row gap">
        <PrimeButton
          outlined
          @click="
            setPopupComponent({
              header: 'Podcast Oluştur',
              name: 'CreateOrUpdatePodcast',
            })
          "
          label="Podcast oluştur"
        />
        <PrimeButton
          outlined
          @click="
            setPopupComponent({
              header: 'Bölüm Ekle',
              name: 'CreateOrUpdateEpisode',
            })
          "
          label="Bölüm ekle"
        />
      </div>
      <PrimeButton
        @click="toggleEditProfile"
        :label="editProfile ? 'İptal et' : 'Profili güncelle'"
        :severity="editProfile ? 'danger' : 'primary'"
        outlined
      />
    </div>
    <UsersPodcasts />
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import messages from "~/assets/jsons/messages.json";
import UploadAudio from "~/components/audio/UploadAudio.vue";
import BirthDate from "~/components/auth/BirthDate.vue";
import Avatar from "~/components/user/Avatar.vue";
import UsersPodcasts from "~/components/podcast/user/UsersPodcasts.vue";

export default {
  data() {
    return {
      editProfile: false,
      newEmail: null,
      newPassword: null,
      updatingEmail: false,
      editPassword: false,
      hasPassword: false,
    };
  },
  components: {
    UploadAudio,
    BirthDate,
    Avatar,
    UsersPodcasts,
  },
  computed: {
    ...mapState(useAuthStore, ["session", "birthDate"]),
    formattedBirthDate() {
      const dateObject = new Date(this.session.user.user_metadata.birthDate);

      const day = dateObject.getDate().toString().padStart(2, "0");
      const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
      const year = dateObject.getFullYear();

      return `${month}/${day}/${year}`;
    },
    userId() {
      const route = useRoute();
      const { userId } = route.params;
      return userId;
    },
  },
  methods: {
    ...mapActions(useToggleStore, ["setPopupComponent"]),
    ...mapActions(usePodcastStore, ["getUsersPodcasts"]),
    ...mapActions(useAuthStore, ["updateBirthDate", "updateEmail"]),
    toggleEditProfile() {
      this.editProfile = !this.editProfile;
    },
    async handleUpdateEmail() {
      if (this.updatingEmail) {
        const { data, error } = await this.updateEmail(this.newEmail);

        if (data.user) {
          this.$toast.add({
            severity: "info",
            summary: "Email değiştirme onayı",
            detail: `${data.user.new_email} adresine onay maili başarıyle gönderildi.`,
          });
          this.toggleEditProfile();
        } else {
          this.$toast.add({
            severity: "warn",
            summary: "Email değiştirme başarısız",
            detail: messages[error],
          });
        }
      } else {
        this.updatingEmail = true;
      }
    },
    async updatePassword() {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase.auth.updateUser({
        password: this.newPassword,
      });
      console.log("data :>> ", data);
      console.log("error :>> ", error);
      if (data.user) {
        this.$toast.add({
          severity: "info",
          summary: "Şifre başarıyla değiştirildi",
          detail: `asdasd`,
        });
        this.toggleEditProfile();
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "Şifre değiştirme başarısız",
          detail: messages[error],
        });
      }
    },
  },
  created() {
    if (this.userId) {
      this.getUsersPodcasts();
    } else {
      const user = useSupabaseUser();
      this.getUsersPodcasts(user.value.id);
      this.hasPassword = user.value.app_metadata.provider === "email";
    }
  },
};
</script>

<style scoped>
.profileContainer {
  background-color: var(--surface-card);
}
</style>
