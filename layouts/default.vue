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
      <div class="queue">
        <QueueSidebar />
      </div>
    </main>
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
import Header from "~/components/layout/Header.vue";
import Menu from "~/components/layout/Menu.vue";
import QueueSidebar from "~/components/layout/QueueSidebar.vue";

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
    QueueSidebar,
  },
  computed: {
    ...mapState(useToggleStore, ["popupComponent"]),
  },
};
</script>

<style scoped>
.queue {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: inherit;
}
</style>
