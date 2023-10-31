<template>
  <p class="font-bold">USERS</p>
  <div
    class="mt-5 overflow-x-auto rounded-md border bg-background scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
    <TableData :columns="columns" :data="users" type="user" @handleEditBtn="handleBtnEdit" />
  </div>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="!btnToggleEdit">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white dark:bg-black px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <h3 class="dark:text-white">EDIT USER</h3>
            <div class="border-black/12.5 rounded-t-2xl p-6 text-center pt-0 pb-6 lg:pt-2 lg:pb-4">
              <div class="flex justify-center">
                <label class="cursor-pointer">
                  <div class="relative  ">
                    <div class="w-28 h-28 overflow-hidden rounded-full border-2 border-white border-solid rounded-circle">
                      <img class="object-cover w-full h-full" :src="user?.avatar == '' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png' : user?.avatar" alt="profile image">
                    </div>
                    <div
                      class="h-6 w-6 flex items-center justify-center absolute right-0 bottom-0 mb-2 mr-2 text-white bg-green-500 rounded-full">
                      <Icon name="heroicons:camera" class="text-sỉze" />
                    </div>

                  </div>
                  <input type='file' class="hidden" v-on:change="previewFiles" />
                </label>
              </div>
            </div>
            <VeeForm :validation-schema="schema" class="mt-0" @submit="handleEditSubmit">
              <div class="flex flex-col items-center justify-center -mx-3 mt-4">
                <div class="w-full max-w-full px-3 shrink-0  md:flex-0">
                  <div class="mb-4">
                    <label for="username"
                      class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white">Username</label>
                    <TextInputEdit name="username" type="text" placeholder="" :value="user?.username" :disable="false" />
                  </div>
                </div>
                <div class="w-full max-w-full px-3 shrink-0  md:flex-0">
                  <div class="mb-4">
                    <label for="phoneNumber"
                      class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white">Phone
                      number</label>
                    <TextInputEdit name="phoneNumber" type="text" placeholder="" :value="user?.phoneNumber"
                      :disable="false" />
                  </div>
                </div>
                <div class="w-full max-w-full px-3 shrink-0 md:flex-0">
                  <div class="mb-4">
                    <label for="address"
                      class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white">Address</label>
                    <TextInputEdit name="address" type="text" placeholder="" :value="user?.address" :disable="false" />
                  </div>
                </div>
              </div>
              <div class="  py-3 sm:flex sm:flex-row-reverse ">
                <button type="submit" :disabled="loadingSaveBtn"
                  class="inline-flex w-full disabled:opacity-50 justify-center rounded-md bg-[#1bd760] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto">Change</button>
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

const {getUser, editUser} = useUsers();

const user = ref<any>()
const btnToggleEdit = ref(true);
const loadingSaveBtn = ref(false);
const avatar = ref();

const schema = yup.object({
  username: yup.string().required('Username is required')
});
const columns = [
  { title: "", field: "avatar", type: "image" },
  { title: "Username", field: "username", type: "text" },
  { title: "Email", field: "email", type: "text" },
  { title: "Role", field: "role", type: "text" }
];
const toastLoadingId = 'toast-loading';
const toastErrorId = 'toast-error';
const toastSuccessId = 'toast-success';
const { data: users } = await useFetch('/api/users');

const handleBtnEdit = async (id: any) => {
  const userData = await getUser(id);
  user.value = userData
  btnToggleEdit.value = false;
}
const previewFiles = (event: any) => {
  let reader = new FileReader();
  reader.onload = (e: any) => {
    user.value.avatar = e.target.result;
  }
  reader.readAsDataURL(event.target.files[0]);
  avatar.value = event.target.files[0];
}
const handleEditSubmit = async function (values: any) {
  const id = user.value.id;
  const avatarFile = avatar.value;
  loadingSaveBtn.value = true;
  toast.loading("Please wait...", {
    position: toast.POSITION.TOP_CENTER,
    closeButton: false,
    toastId: toastLoadingId
  });
  if (values) {
    const state = await editUser({ id, avatarFile, ...values });
    if (state) {
      toast.remove(toastLoadingId);
      toast.success("Update successful!", {
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
}

</script>

<style scoped></style>