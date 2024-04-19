<template>
  <div
    :class="showRightAside ? 'layout' : 'broadenLayout'"
    style="transition: all 0.5s"
  >
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
    <aside class="asideRight col-end" style="transition: all 0.5s">
      <div style="text-align: start; width: 100%">
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

<style scoped>
.layout {
  display: grid;
  min-height: 100vh;
  grid-template-areas:
    "header header header"
    "asideLeft main asideRight";
  grid-template-columns: 1fr 4fr 2fr;
  grid-template-rows: auto 1fr;
}
.broadenLayout {
  display: grid;
  min-height: 100vh;
  grid-template-areas:
    "header header header"
    "asideLeft main asideRight";
  grid-template-columns: 1fr 6fr 0fr;
  grid-template-rows: auto 1fr;

  .asideRight {
    padding: 0;
    width: 0%;
    height: 0%;
  }
}

.header {
  grid-area: header;
}
aside {
  height: 100vh;
}
.asideLeft {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 220px;
  max-width: 270px;
  padding: 15px;
  grid-area: asideLeft;
}

.main {
  grid-area: main;
  position: relative;
  max-width: 100vw;
  .showPlaylistButton {
    position: fixed;
    top: 15px;
    right: 5px;
    z-index: 1;
  }
}

.asideRight {
  position: fixed;
  top: 0;
  right: 0;
  padding: 15px;
  grid-area: asideRight;
  transition: all 0.5s;
}

@media (max-width: 1024px) {
  .layout {
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .asideLeft,
  .asideRight {
    display: none;
  }
  .showPlaylistButton {
    display: none;
  }
}
</style>
