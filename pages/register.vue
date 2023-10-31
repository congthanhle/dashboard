<template>
  <div class="h-screen w-full flex justify-center bg-black">
    <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
      <main class="w-full">
        <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
          <div class="mt-12">
            <h1 class="lg:text-5xl text-3xl text-[#1bd760] text-center font-extrabold ">
              Create your account
            </h1>
            <VeeForm :validation-schema="schema" class="mt-12" @submit="handleRegisterSubmit">
              <div class="mt-8">
                <TextInput name="username" type="text" placeholder="Username" />
              </div>
              <div class="mt-8">
                <TextInput name="email" type="email" placeholder="Email" />
              </div>
              <div class="mt-8">
                <TextInput name="password" type="password" placeholder="Password" />
              </div>
              <div class="mt-8">
                <TextInput name="confirmPassword" type="password" placeholder="Confirmed Password" />
              </div>
              <div class="mt-10">
                <button type="submit"
                  class="bg-[#1bd760] hover:bg-green-600 rounded-full w-full p-3 text-white font-bold py-2 px-4 rounded">
                  Create account
                </button>
              </div>
            </VeeForm>
            <div class="text-[14px] text-center text-white pt-12">
              Already have an account?
              <NuxtLink to="/login" class="text-[#1bd760] underline">
                Sign in
              </NuxtLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate';
import * as yup from 'yup';

const {registerUser} = useFirebaseAuth();
const router = useRouter();

const schema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().required('Email is required').email('This field must be a valid email'),
  password: yup.string().required('Password is required').min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().required('Passwords must match').oneOf([yup.ref('password')], 'Passwords must match')
});
const handleRegisterSubmit = async (values: any) => {
  if (values) {
    const state = await registerUser( values)
    state && router.push({ path: "/login" })
  }
}
</script>

<style scoped></style>
