// `trt.prepare.ts`
import { $fetch } from "ofetch";
import { defineNuxtPrepareHandler } from "nuxt-prepare/config";

export default defineNuxtPrepareHandler(async () => {
  let trtPodcasts: Array<Object> = [];

  try {
    trtPodcasts = await $fetch(
      "https://www.trtdinle.com/api/detail?path=/genre/podcast"
    );
  } catch (error) {
    console.error("Failed to fetch static podcasts:", error);
  }

  return {
    ok: true,
    state: {
      trtPodcasts,
    },
  };
});
