<template>
  <p class="font-bold">ROLES ACCESS</p>
  <div
    class="mt-5 overflow-x-auto rounded-md border bg-background scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
    <TableData :columns="columns" :data="users" type="role"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin-layout"
})
const columns = [{ title: "Role", type: "rolename" }, { title: "Access", type: "access" }, { title: "Color", type: "color" },];
const { data: users } = await useFetch('/api/users');

</script>

<style scoped></style>