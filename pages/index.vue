<template>
  <StatusCard />
  <!-- New customer list -->
  <NewCustomers />
  <!-- Charts -->
  <SalesChart />
  <!-- Recent orders -->
  <RecentOrders />
</template>

<script setup lang="ts">

definePageMeta({
  layout: "admin-layout",
  middleware: "authentication",
})

</script>

<style scoped></style>