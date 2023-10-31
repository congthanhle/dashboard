<template>
  <div>Home Page</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
  middleware: "authentication",
})
const nuxtApp = useNuxtApp();
const loading = ref(false);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>

<style scoped></style>