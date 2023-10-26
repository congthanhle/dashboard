<template>
  <StatusCard />
  <NewCustomers />
  <SalesChart />
  <RecentOrders />
  <!-- <div>Home Page</div> -->
</template>

<script setup lang="ts">

definePageMeta({
  layout: "admin-layout",
  middleware: "authentication",
})

</script>

<style scoped></style>