<script setup>
const route = useRoute();
const { userId } = route.params;
</script>
<template>
  <div>
    {{ userId }}
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
