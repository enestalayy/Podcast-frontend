// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
    "@nuxt/image",
    "nuxt-primevue",
    "@nuxtjs/supabase",
    "@nuxtjs/google-fonts",
  ],
  experimental: {
    payloadExtraction: true,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
  components: {
    global: true,
    dirs: ["~/components/common"],
  },
  primevue: {
    options: {
      ripple: true,
    },
    components: {
      prefix: "Prime",
      include: "*",
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  imports: {
    dirs: ["stores"],
  },
  googleFonts: {
    families: {
      Inter: [300, 400, 700],
    },
    display: "swap",
  },
  css: [
    "primevue/resources/themes/aura-dark-purple/theme.css",
    "primeicons/primeicons.css",
    "primevue/resources/primevue.min.css",
    "~/assets/styles/main.css",
  ],
});
