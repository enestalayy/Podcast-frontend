<template>
  <UsersPageComponent />
</template>

<script>
import UsersPageComponent from "~/components/user/UsersPageComponent.vue";

export default {
  name: "Profile",
  components: {
    UsersPageComponent,
  },
};
</script>

<style scoped>
.profileContainer {
  background-color: var(--surface-card);
}
</style>
