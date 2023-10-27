<template>
  <div class="flex flex-wrap -mx-3 mt-">
    <div class="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
      <div
        class="relative flex flex-col min-w-0 break-words border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
        <div class="flex-auto px-6">
          <VeeForm :validation-schema="schema" class="mt-0" @submit="handleEditSubmit">
            <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid  pb-0">
              <div class="flex items-center">
                <p class="mb-0 dark:text-white/80">Edit User</p>
                <button type="submit" :disabled="loadingSaveBtn"
                  class="disabled:opacity-50 inline-block text-black px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center align-middle transition-all ease-in bg-[#1bd760] border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Save</button>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mt-4">
              <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div class="mb-4">
                  <label for="username"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Username</label>
                  <TextInputEdit name="username" type="text" placeholder="" :value="user?.username" :disable="false" />
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div class="mb-4">
                  <label for="username"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Phone
                    number</label>
                  <TextInputEdit name="phoneNumber" type="text" placeholder="" :value="user?.phoneNumber"
                    :disable="false" />
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:flex-0">
                <div class="mb-4">
                  <label for="username"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Email</label>
                  <TextInputEdit name="email" type="text" placeholder="" :value="user?.email" :disable="true" />
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:flex-0">
                <div class="mb-4">
                  <label for="username"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Address</label>
                  <TextInputEdit name="address" type="text" placeholder="" :value="user?.address" :disable="false" />
                </div>
              </div>
            </div>
          </VeeForm>
        </div>
      </div>
    </div>
    <div class="w-full max-w-full px-3 mt-6 shrink-0 md:w-4/12 md:flex-0 md:mt-0">
      <div
        class="relative flex flex-col min-w-0 break-words border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
        <img class="w-full rounded-t-2xl"
          src="https://demos.creative-tim.com/argon-dashboard-tailwind/assets/img/bg-profile.jpg"
          alt="profile cover image">
        <div class="flex flex-wrap justify-center -mx-3">
          <div class="w-4/12 max-w-full px-3 flex-0 ">
            <div class="mb-6 -mt-6 lg:mb-0 lg:-mt-16 ">
              <a href="javascript:;">
                <img class="h-auto max-w-full rounded-full border-2 border-white border-solid rounded-circle"
                  :src="user?.avatar" alt="profile image">
              </a>
            </div>
          </div>
        </div>
        <div class="border-black/12.5 rounded-t-2xl p-6 text-center pt-0 pb-6 lg:pt-2 lg:pb-4">
          <div class="flex justify-center">
            <label class="cursor-pointer">
              <span
                class="text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-black active:bg-pink-600 text-xs px-2 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Upload</span>
              <input type='file' class="hidden" v-on:change="previewFiles"/>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/store/User/state'
import store from '~/store'
import { Form as VeeForm } from 'vee-validate';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import { debounce } from 'lodash';

definePageMeta({
  layout: "admin-layout"
})

const loadingSaveBtn = ref(false);
const avatarFile = ref();
const previewFiles = (event: any) =>  {
  avatarFile.value = event.target.files;
}

const { id } = useRoute().params;
const { data } = await useFetch(`/api/users/${id}`);
const user = data as unknown as User;

const schema = yup.object({
  username: yup.string().required('Username is required')
});

const toastSuccessId = 'toast-success';
const toastErrorId = 'toast-error';

const handleEditSubmit = debounce(async function (values: any) {
  loadingSaveBtn.value = true;
  if (values) {
    const state = await store.dispatch("EDIT_USER", { id, ...values });
    if (state) {
      toast.success("Update successful!", {
        closeButton: false,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 400,
        toastId: toastSuccessId,
      });
      setTimeout(() => loadingSaveBtn.value = false, 1200);
    }
    else {
      toast.remove(toastSuccessId);
      toast.error("Update failed. Please try again later.", {
        closeButton: false,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
        toastId: toastErrorId
      });
      loadingSaveBtn.value = false;
    }
  }

}, 300)
</script>

<style scoped></style>