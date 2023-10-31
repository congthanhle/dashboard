<template>

</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate';
import * as yup from 'yup';
import type { User } from '~/store/User/state'

const props = defineProps<{
  user: User
}>()
const user = ref()
const btnToggleEdit = ref(true);
const schema = yup.object({
  username: yup.string().required('Username is required')
});  
</script>

<style scoped></style>