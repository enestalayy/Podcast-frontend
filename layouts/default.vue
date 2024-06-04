<template>
  <div class="layout">
    <header class="header">
      <Header />
    </header>

    <aside class="aside col-center">
      <Menu />
    </aside>

    <main class="main col-center">
      <slot />
    </main>

    <footer class="footer">
      <Footer />
    </footer>

    <PrimeDialog
      v-model:visible="toggleStore.visible"
      :header="popupComponent.header ? popupComponent.header : ' '"
      modal
      :pt="{
        mask: {
          style: 'backdrop-filter: blur(4.5px)',
        },
      }"
    >
      <component
        class="popupComponent"
        :is="popupComponent.name"
        :prop="popupComponent.prop"
      />
    </PrimeDialog>
    <PrimeToast />
  </div>
</template>

<script>
import Login from "~/components/auth/Login.vue";
import Signup from "~/components/auth/Signup.vue";
import ForgetPassword from "~/components/auth/ForgetPassword.vue";
import { useToggleStore } from "@/stores/ToggleStore";
import { mapState } from "pinia";
import Header from "~/components/layout/Header.vue";
import Menu from "~/components/layout/Menu.vue";
import Footer from "~/components/layout/Footer.vue";
import CreateOrUpdatePodcast from "~/components/podcast/CreateOrUpdatePodcast.vue";
import CreateOrUpdateEpisode from "~/components/episode/CreateOrUpdateEpisode.vue";
import ShareComponent from "~/components/common/ShareComponent.vue";
export default {
  data() {
    return {
      toggleStore: useToggleStore(),
    };
  },
  components: {
    Login,
    Signup,
    ForgetPassword,
    Header,
    Menu,
    Footer,
    CreateOrUpdatePodcast,
    CreateOrUpdateEpisode,
    ShareComponent,
  },
  computed: {
    ...mapState(useToggleStore, ["popupComponent"]),
    ...mapState(usePodcastStore, ["playingEpisode"]),
  },
};
</script>

<style scoped></style>
