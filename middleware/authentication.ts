import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/server/lib/firebase";
export default defineNuxtRouteMiddleware((to, from) => {
  // onAuthStateChanged(auth, (user: any) => {
  //   return user
  // });
  // if(state){
  //   return navigateTo("/login");
  // }
});
