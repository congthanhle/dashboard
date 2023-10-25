import store from '~/store'
export default defineNuxtRouteMiddleware((to, from) => {
  const userId = store.getters.USER.id
  // if (!userId) {
  //   return navigateTo('/login')
  // }
});