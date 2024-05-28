export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const podcastId = event.context.params?.podcastId;
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/aws/${podcastId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
