<template>
  <div>
    <Header />
    <div class="container lg:grid lg:grid-cols-12 lg:gap-10">
      <Sidebar class="hidden lg:col-span-3 lg:block" />
      <main class="py-5 lg:col-span-9">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>