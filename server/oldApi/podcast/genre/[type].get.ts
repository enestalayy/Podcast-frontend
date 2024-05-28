export default defineEventHandler(async (event) => {
  const { type } = getRouterParams(event);
  const { trtPodcastUrl } = useRuntimeConfig();

  return await $fetch(`${trtPodcastUrl}/genre/${type}`, {
    method: "GET",
  });
});
