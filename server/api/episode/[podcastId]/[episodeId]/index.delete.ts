export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const { podcastId, episodeId } = getRouterParams(event);
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/episode/${podcastId}/${episodeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
