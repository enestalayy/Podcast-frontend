export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const { podcastId, episodeId } = getRouterParams(event);
  const mediaData = await readFormData(event);
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/episode/file/${podcastId}/${episodeId}`, {
    method: "PATCH",
    body: mediaData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
