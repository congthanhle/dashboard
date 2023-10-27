<template>
  <table class="w-full border-collapse">
    <thead>
      <tr class="border-b text-left text-xs">
        <th class="p-4 font-medium uppercase text-muted-foreground"></th>
        <th class="p-4 font-medium uppercase text-muted-foreground" v-for="(column, index) in columns" :key="index">{{
          column.title }}</th>
        <th class="p-4 font-medium uppercase text-muted-foreground"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index" class="border-b text-left text-sm last:border-b-0 hover:bg-muted">
        <td class="p-4">{{ index + 1 }}</td>
        <td class="p-4" v-for="(column, idx) in columns" :key="idx">
          <div v-if="column.type != 'image'">
            {{ item[column.field] }}
          </div>
          <div class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border bg-background" v-else>
            <img :src="item[column.field]" alt="Logged in user" class="h-full w-full" />
          </div>
        </td>
        <td class="p-4">
          <div class="flex items-center gap-3">
            <NuxtLink
              class="bg-[#1bd760] text-white hover:bg-green-700 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button" :to="`/users/${item?.id}`">
              <Icon name="heroicons:pencil" class="h-4 w-4" />
            </NuxtLink>
            <NuxtLink
              class="bg-pink-500 text-white hover:bg-pink-700 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              <Icon name="heroicons:trash" class="h-4 w-4" />
            </NuxtLink>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

const props = defineProps<{
  columns: any,
  data: any
}>()
</script>

<style scoped></style>