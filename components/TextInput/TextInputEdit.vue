<template>

  <Field :as="type=='textarea'?'textarea':''" :name="name" :type="type" :disabled="disable" class="
                  w-full
                  bg-[#EFF0EB]
                  text-gray-800
                  border-2
                  text-sm
                  border-[#EFF0EB]
                  rounded-xl
                  py-3.5
                  px-3
                  placeholder-gray-500
                  focus:outline-none" :validateOnBlur="false" :validateOnChange="true" :validateOnInput="false" :placeholder="placeholder"/>
  <ErrorMessage class="text-red-500 text-[12px] font-semibold mt-8" :name="name" />
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string,
  type: string,
  placeholder: string,
  value: any,
  disable: boolean,
}>()

const { value } =useField(props.name, value => !!value);
value.value = props.value  
</script>

<style scoped></style>