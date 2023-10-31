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
      <tr v-for="(item, index) in itemsData" :key="index"
        class="border-b text-left text-sm last:border-b-0 hover:bg-muted">
        <td class="p-4">{{ index + 1 }}</td>
        <td class="p-4" v-for="(column, idx) in columns" :key="idx">
          <div v-if="column.type != 'image'">
            {{ item[column.field] }}
          </div>
          <div class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border bg-background"
            v-else>
            <img :src="item[column.field]" alt="Logged in user" class="h-full w-full" />
          </div>
        </td>
        <td class="p-4">
          <div class="flex items-center gap-3">
            <button @click="handleEditBtn(item?.id)"
              class="bg-[#1bd760] text-white hover:bg-green-700 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button">
              <Icon name="heroicons:pencil" class="h-4 w-4" />
            </button>
            <button @click="handleDeleteBtn(item?.id)"
              class="bg-pink-500 text-white hover:bg-pink-700 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button">
              <Icon name="heroicons:trash" class="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"
  v-if="!btnToggleDelete">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Remove {{ type }}</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Are you sure you want to delete this {{ type }}? </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" @click="handleDeleteItem()"
              class="inline-flex w-full justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 sm:ml-3 sm:w-auto">Delete</button>
            <button type="button" @click="btnToggleDelete = true"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '~/store';

const emits = defineEmits(["handleEditBtn"])
const props = defineProps<{
  columns: any,
  data: any,
  type: string
}>()
const btnToggleDelete = ref(true);

const itemsData = ref(props.data);
const itemDelete = ref("")

const handleDeleteBtn = (id: any) => {
  btnToggleDelete.value = false
  itemDelete.value = id;
}

const handleDeleteItem = () => {
  btnToggleDelete.value = true;
  itemsData.value = itemsData.value.filter((item: any) => item.id !== itemDelete.value)
  store.dispatch("DELETE_USER", itemDelete.value)
}

const handleEditBtn = async (id: any) => {
  emits('handleEditBtn', id)
}
</script>

<style scoped></style>