export default defineEventHandler(async (event) => {
  const podcastId = event.context.params?.podcastId;
  const { apiUrl } = useRuntimeConfig();
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/aws/deletePodcast/${podcastId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
