// `server.prepare.ts`
import { $fetch } from "ofetch";
import { defineNuxtPrepareHandler } from "nuxt-prepare/config";

export default defineNuxtPrepareHandler(async () => {
  let staticPodcasts: Array<Object> = [];

  const apiUrl = process.env.API_URL;

  try {
    staticPodcasts = await $fetch(`${apiUrl}/podcast/static`);
  } catch (error) {
    console.error("Failed to fetch static podcasts:", error);
  }

  return {
    ok: true,
    state: {
      staticPodcasts,
    },
  };
});
