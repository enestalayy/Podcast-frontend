export default defineEventHandler(async (event) => {
  const { path } = getRouterParams(event);
  console.log("path :>> ", path);
  const { trtPodcastUrl } = useRuntimeConfig();

  return await $fetch(`${trtPodcastUrl}/${path}`);
});
