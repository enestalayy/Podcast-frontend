export default defineEventHandler(async () => {
  const { apiUrl1, jsonServerUrl } = useRuntimeConfig();
  return await $fetch(`${apiUrl1}/podcast/fetchTrtPodcast`, {
    method: "GET",
  });
  // return await $fetch(`${jsonServerUrl}/fetchTrtPodcast`, {
  //   method: "GET",
  // });
});
