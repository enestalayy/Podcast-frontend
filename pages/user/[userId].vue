<script setup>
const route = useRoute();
const { userId } = route.params;
</script>
<template>
  <div>
    <UsersPageComponent />
  </div>
</template>

<script>
import { mapActions } from "pinia";
import UsersPageComponent from "~/components/user/UsersPageComponent.vue";

export default {
  name: userId,
  methods: {
    ...mapActions(useUserStore, ["getProfilePodcasts"]),
  },
  created() {
    this.getProfilePodcasts();
  },
};
</script>

<style lang="scss" scoped></style>
