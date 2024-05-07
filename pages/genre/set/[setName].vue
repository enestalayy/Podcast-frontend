<script setup>
const route = useRoute();
const genre = route.params;
</script>
<template>
  <div>
    <h1>{{ genre }}]</h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
