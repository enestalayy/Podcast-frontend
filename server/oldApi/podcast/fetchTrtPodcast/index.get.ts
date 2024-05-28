export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/podcast/fetchTrtPodcast`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // return await $fetch(`${jsonServerUrl}/fetchTrtPodcast`, {
  //   method: "GET",
  // });
});
