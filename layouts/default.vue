<template>
  <div class="layout">
    <header class="header" style="background-color: aqua">
      <Navigation />
    </header>
    <aside class="asideLeft col-center" style="background-color: blue">
      <Menu />
    </aside>
    <main class="main col-center" style="background-color: blueviolet">
      <slot />
    </main>
    <aside class="asideRight col-end" style="background-color: blue">
      <div>Aside</div>
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
    Navigation,
    Menu,
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
    "header header  header"
    "asideLeft main  asideRight";
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr;
}

.header {
  grid-area: header;
}

.asideLeft {
  padding: 15px;
  grid-area: asideLeft;
}

.main {
  grid-area: main;
}

.asideRight {
  padding: 15px;
  grid-area: asideRight;
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
}
</style>
