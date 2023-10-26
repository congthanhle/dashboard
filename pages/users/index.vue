<template>
  <div class="">
    <p class="font-bold">USERS</p>
    <div
      class="mt-5 overflow-x-auto rounded-md border bg-background scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b text-left text-xs">
            <th class="p-4 font-medium uppercase text-muted-foreground">Product</th>
            <th class="p-4 font-medium uppercase text-muted-foreground">Payment</th>
            <th class="p-4 font-medium uppercase text-muted-foreground">Status</th>
            <th class="p-4 font-medium uppercase text-muted-foreground"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 6" class="border-b text-left text-sm last:border-b-0 hover:bg-muted">
            <td class="p-4">Nike Shoes</td>
            <td class="p-4">Paid</td>
            <td class="p-4">Shipped</td>
            <td class="p-4">
              <div class="flex items-center gap-3">
                <button
                  class="bg-[#1bd760] text-white hover:bg-green-700 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button">
                  <Icon name="heroicons:pencil" class="h-4 w-4" />
                </button>
                <button
                  class="bg-[#1bd760] text-white hover:bg-green-700 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button">
                  <Icon name="heroicons:trash" class="h-4 w-4 " />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin-layout"
})
</script>

<style scoped></style>