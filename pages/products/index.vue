<template>
  <div class="flex items-center justify-between">
    <p class="font-bold uppercase">products</p>
    <button @click="handleAddBtn"
      class="bg-transparent hover:bg-green-500 text-[#1bd760] font-semibold hover:text-white py-1 px-2 border border-[#1bd760] hover:border-transparent rounded">
      <Icon name="heroicons:plus-circle" class="h-5 w-5 font-bold " /> Add
    </button>
  </div>
  <div
    class="mt-5 overflow-x-auto rounded-md border bg-background scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
    <TableData :columns="columns" :data="products" type="product" @handleEditBtn="handleBtnEdit"
      @handleDeleteBtn="handleBtnDelete" />
  </div>
  <div class="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="!btnToggleEdit">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
          <div class="bg-white dark:bg-black px-4 pb-4 pt-6 sm:p-6 sm:pb-4">
            <h3 class="dark:text-[#1bd760] font-bold uppercase">{{ modalMode + " PRODUCT" }}</h3>
            <label class="cursor-pointer flex justify-end">
              <div
                class="w-2/5 h-48 overflow-hidden border-2 rounded-xl border border-black dark:border-white border-solid rounded-circle">
                <img class=" w-full h-full" :src="product?.imageUrl=='' ? 'https://addlogo.imageonline.co/image.jpg' : product?.imageUrl " alt="">
              </div>
              <input type='file' class="hidden" v-on:change="previewFiles" />
            </label>
            <VeeForm :validation-schema="schema" class="mt-0" @submit="handleEditSubmit">
              <div class="flex flex-col items-center justify-center -mx-3 mt-2">
                <div class="w-full max-w-full px-3 shrink-0  md:flex-0">
                  <div class="mb-4">
                    <label for="name"
                      class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white">Name</label>
                    <TextInput name="name" type="text" placeholder="" v-if="modalMode == 'add'" />
                    <TextInputEdit name="name" type="text" placeholder="" :value="product?.name" :disable="false"
                      v-if="modalMode == 'edit'" />
                  </div>
                </div>
                <div class="w-full max-w-full px-3 shrink-0  md:flex-0">
                  <div class="mb-4">
                    <label for="price"
                      class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white">Price</label>
                    <TextInput name="price" type="text" placeholder="" v-if="modalMode == 'add'" />
                    <TextInputEdit name="price" type="text" placeholder="" :value="product?.price" :disable="false"
                      v-if="modalMode == 'edit'" />
                  </div>
                </div>
                <div class="w-full max-w-full px-3 shrink-0 md:flex-0">
                  <div class="mb-4">
                    <label for="address"
                      class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white">Description</label>
                    <TextInput name="description" type="textarea" placeholder="" v-if="modalMode == 'add'" />
                    <TextInputEdit name="description" type="textarea" placeholder="" :value="product?.description"
                      :disable="false" v-if="modalMode == 'edit'" />
                  </div>
                </div>
              </div>
              <div class="  py-3 sm:flex sm:flex-row-reverse ">
                <button type="submit" :disabled="loadingSaveBtn"
                  class="inline-flex w-full disabled:opacity-50 justify-center rounded-md bg-[#1bd760] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto">Submit</button>
                <button type="button" @click="btnToggleEdit = true" :disabled="loadingSaveBtn"
                  class="mt-3 inline-flex w-full disabled:opacity-50 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 sm:mt-0 sm:w-auto">Cancel</button>
              </div>
            </VeeForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';

definePageMeta({
  layout: "admin-layout"
})

const { getProduct, addProduct, editProduct, deleteProduct } = useProducts();

const product = ref<any>({
  name: "",
  price: 0,
  description: "",
  imageUrl: ""
})

const modalMode = ref<string>("");
const btnToggleEdit = ref(true);
const loadingSaveBtn = ref(false);
const image = ref();

const schema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required').positive('Price must be greater than 0'),
});

const columns = [
  { title: "", field: "imageUrl", type: "image" },
  { title: "Name", field: "name", type: "text" },
  { title: "Price", field: "price", type: "text" },
];

const toastLoadingId = 'toast-loading';
const toastErrorId = 'toast-error';
const toastSuccessId = 'toast-success';
const { data: products } = await useFetch('/api/products');

const handleAddBtn = () => {
  product.value.imageUrl = ""
  modalMode.value = "add";
  btnToggleEdit.value = false;
}

const handleBtnEdit = async (id: string) => {
  const productData = await getProduct(id);
  modalMode.value = "edit"
  product.value = productData
  btnToggleEdit.value = false;
}

const previewFiles = (event: any) => {
  let reader = new FileReader();
  reader.onload = (e: any) => {
    product.value.imageUrl = e.target.result;
  }
  reader.readAsDataURL(event.target.files[0]);
  image.value = event.target.files[0];
}

const handleEditSubmit = async function (values: any) {
  const id = product.value.id;
  const imageFile = image.value;
  loadingSaveBtn.value = true;
  toast.loading("Please wait...", {
    position: toast.POSITION.TOP_CENTER,
    closeButton: false,
    toastId: toastLoadingId
  });
  if (values) {
    if (modalMode.value == "add") {
      
      const newProduct = {imageFile, ...values}
      const state = await addProduct(newProduct);
      if (state) {
        toast.remove(toastLoadingId);
        toast.success("Add successful!", {
          closeButton: false,
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
          toastId: toastSuccessId
        });
        setTimeout(() => { loadingSaveBtn.value = false; btnToggleEdit.value = true; }, 500);
      }
      else {
        toast.remove(toastLoadingId);
        toast.error("Update failed. Please try again later.", {
          closeButton: false,
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
          toastId: toastErrorId
        });
        loadingSaveBtn.value = false;
      }
    }
    else {
      const state = await editProduct({ id, imageFile, ...values });
      if (state) {
        toast.remove(toastLoadingId);
        toast.success("Update successful!", {
          closeButton: false,
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
          toastId: toastSuccessId
        });
        setTimeout(() => { loadingSaveBtn.value = false; btnToggleEdit.value = true;}, 500);
      }
      else {
        toast.remove(toastLoadingId);
        toast.error("Update failed. Please try again later.", {
          closeButton: false,
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
          toastId: toastErrorId
        });
        loadingSaveBtn.value = false;
      }
    }
  }
}
const handleBtnDelete = async (id: string) => {
    deleteProduct(id);
}
</script>

<style scoped></style>