// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "@morev/vue-transitions/nuxt",
    "@vee-validate/nuxt",
    "@sidebase/nuxt-session",
  ],
  tailwindcss: { exposeConfig: true },
  headlessui: { prefix: "H" },
  app: {
    head: {
      title: "Analytics",
      link: [
        // Favicon
        { rel: "icon", type: "image/x-icon", href: "/icon.svg" },
        //Inter font
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
      ],
    },
  },
  $production: {
    routeRules: {
      "/": { prerender: true},
      "/login": { swr: 3600, ssr: false},
      "/register": { swr: 3600 },
      "/users/": { swr: 3600 },
      "/products/": { swr: 3600 },
    },
  },
  css: ["vue3-toastify/dist/index.css"],
});
