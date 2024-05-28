export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const { podcastId, episodeId } = getRouterParams(event);
  const { newPodcastId } = await readBody(event);
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/episode/${podcastId}/${episodeId}/location`, {
    method: "PATCH",
    body: {
      podcastId: newPodcastId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
