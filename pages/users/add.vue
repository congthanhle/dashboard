<template>
  <div>
    <button @click="test">Test</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin-layout"
})
import { queryByCollection, query } from "~/server/lib/firestore";
import  type { User } from "~/store/User/state";

const test = () => {
const users = queryByCollection("users");
}
</script>

<style scoped>

</style>