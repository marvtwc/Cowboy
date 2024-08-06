// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/test-utils/module",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    "@vueuse/nuxt",
    "radix-vue/nuxt",
  ],
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  runtimeConfig: {
    dbUri: process.env.NUXT_DB_URI,
    authSecret: process.env.AUTH_SECRET,
  },
  auth: {
    baseUrl: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  googleFonts: {
    families: {
      Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
});
