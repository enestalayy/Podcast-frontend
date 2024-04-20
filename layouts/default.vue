<template>
  <div class="layout" :class="{ broadenLayout: !showRightAside }">
    <header class="header">
      <Navigation />
    </header>
    <aside class="asideLeft col-center">
      <Menu />
    </aside>
    <main class="main col-center">
      <slot />
      <PrimeButton
        v-show="!showRightAside"
        @click="showRightAside = !showRightAside"
        :icon="showRightAside ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"
        class="showPlaylistButton"
      />
    </main>
    <aside class="asideRight col-end">
      <div class="showRightAside">
        <PrimeButton
          v-show="showRightAside"
          @click="showRightAside = !showRightAside"
          :icon="showRightAside ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"
          class="showPlaylistButton"
        />
      </div>
      <Playlist v-show="showRightAside" />
    </aside>
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
      <div>
        <component class="popupComponent" :is="popupComponent.name" />
      </div>
    </PrimeDialog>
  </div>
</template>

<script>
import Login from "~/components/auth/Login.vue";
import Signup from "~/components/auth/Signup.vue";
import ForgetPassword from "~/components/auth/ForgetPassword.vue";
import { useToggleStore } from "@/stores/ToggleStore";
import { mapState } from "pinia";
import Navigation from "~/components/layout/Navigation.vue";
import Menu from "~/components/layout/Menu.vue";
import Playlist from "~/components/podcast/Playlist.vue";

export default {
  data() {
    return {
      toggleStore: useToggleStore(),
      showRightAside: true,
    };
  },
  components: {
    Login,
    Signup,
    ForgetPassword,
    Navigation,
    Menu,
    Playlist,
  },
  computed: {
    ...mapState(useToggleStore, ["popupComponent"]),
  },
};
</script>
<style scoped></style>
