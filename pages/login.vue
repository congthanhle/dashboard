<template>
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
                <TextInput name="email" type="email" placeholder="Email" />
              </div>
              <div class="mt-10">
                <TextInput name="password" type="password" placeholder="Password" />
              </div>
              <div class="mt-12">
                <button type="submit"
                  class="bg-[#1bd760] hover:bg-green-800 rounded-full w-full p-3 text-white font-bold py-2 px-4 rounded">
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
const router = useRouter();
import store from '~/store'

const schema = yup.object({
  email: yup.string().required('Email is required').email("This field must be a valid email"),
  password: yup.string().required('Password is required').min(3, "Password must be at least 3 characters"),
});


const handleLogInSubmit = async (values: any) => {
  if (values) {
    const state = await store.dispatch("LOGIN", values)
    state && router.push({ path: "/" })
  }
}

</script>

<style scoped></style>