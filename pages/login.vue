<template>
  <div v-if="loading" class="fixed left-0 top-0 h-0.5 w-full z-50 bg-green-500"></div>
  <div class="h-screen w-full flex justify-center bg-black">
    <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
      <main class="w-full">
        <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
          <div class="mt-16">
            <h1 class="lg:text-5xl text-3xl text-center font-extrabold text-[#1bd760]">
              Log in
            </h1>
            <VeeForm :validation-schema="schema" @submit="handleLogInSubmit" class="mt-10">
              <div class="mt-10">
                <TextInput name="email" type="email" placeholder="Email"  />
              </div>
              <div class="mt-10">
                <TextInput name="password" type="password" placeholder="Password" />
              </div>
              <div class="mt-12">
                <button type="submit" :disabled="loadingSubmitBtn"
                  class="bg-[#1bd760] disabled:opacity-50 hover:bg-green-800 rounded-full w-full p-3 text-white font-bold py-2 px-4 rounded">
                  Sign in
                </button>
              </div>
            </VeeForm>
            <div class="text-[14px] text-center pt-12 text-white">
              Don't have an account?
              <NuxtLink to="/register" class="text-[#1bd760] underline text-green-500">
                Sign up
              </NuxtLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { Form as VeeForm } from 'vee-validate';
import { toast } from 'vue3-toastify';
const nuxtApp = useNuxtApp();
const router = useRouter();
const loading = ref(false);
const loadingSubmitBtn = ref(false);
const {logInUser} = useFirebaseAuth();
const schema = yup.object({
  email: yup.string().required('Email is required').email("This field must be a valid email"),
  password: yup.string().required('Password is required').min(3, "Password must be at least 3 characters"),
});
const toastLoadingId = 'toast-loading';
const toastErrorId = 'toast-error';
const handleLogInSubmit = async function (values: any) {
  toast.loading("Please wait...", {
    position: toast.POSITION.TOP_CENTER,
    closeButton: false,
    toastId: toastLoadingId
  });
  loadingSubmitBtn.value = true;
  if (values) {
    const {email, password} = values;
    const state = await logInUser(email, password);
    if (state) {
      router.push({ path: "/" })
    }
    else {
      toast.remove(toastLoadingId);
      toast.error("Invalid email or password", {
        closeButton: false,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
        toastId: toastErrorId
      });
      setTimeout(() => { loadingSubmitBtn.value = false }, 1000)
    }
  }
}
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>

<style scoped></style>