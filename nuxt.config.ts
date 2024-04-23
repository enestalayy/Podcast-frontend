export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
    "@nuxt/image",
    "nuxt-primevue",
    "@nuxtjs/supabase",
    "@nuxtjs/google-fonts",
    "nuxt-swiper",
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
      include: [
        "AutoComplete",
        "Button",
        "Calendar",
        "Card",
        "Dialog",
        "Divider",
        "FloatLabel",
        "InlineMessage",
        "InputGroup",
        "InputText",
        "Message",
        "Password",
        "Sidebar",
        "SpeedDial",
      ],
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  imports: {
    dirs: ["stores"],
  },

  image: {
    quality: 80,
    format: ["webp", "jpeg"],
    screens: {
      xs: 320,
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
      "2xl": 1440,
    },
    domains: ["cdn-i.pr.trt.com.tr"],

    provider: "ipx",
    ipx: {},
  },

  googleFonts: {
    display: "swap",
  },
  css: [
    "primevue/resources/themes/aura-dark-purple/theme.css",
    "primeicons/primeicons.css",
    "primevue/resources/primevue.min.css",
    "~/assets/styles/main.css",
  ],
});
