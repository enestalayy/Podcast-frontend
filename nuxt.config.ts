export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
    "nuxt-primevue",
    "@nuxtjs/supabase",
    "nuxt-swiper",
  ],

  experimental: {
    payloadExtraction: true,
  },

  runtimeConfig: {
    trtBaseUrl: process.env.TRT_BASE_URL,
    trtPodcastUrl: process.env.TRT_PODCAST_URL,
    apiUrl: process.env.API_URL,
    apiUrl1: process.env.API_URL1,
    jsonServerUrl: process.env.JSON_SERVER_URL,
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
        "Skeleton",
        "ProgressBar",
        "Slider",
        "Knob",
        "Stepper",
        "StepperPanel",
        "FileUpload",
        "Textarea",
        "MultiSelect",
        "Dropdown",
      ],
    },
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  imports: {
    dirs: ["stores"],
  },

  css: [
    "primevue/resources/themes/aura-dark-cyan/theme.css",
    "primeicons/primeicons.css",
    "primevue/resources/primevue.min.css",
    "~/assets/styles/main.css",
  ],
});
