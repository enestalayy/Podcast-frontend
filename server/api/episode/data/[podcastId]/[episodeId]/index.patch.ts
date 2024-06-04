export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const { podcastId, episodeId } = getRouterParams(event);
  const episodeInfo = await readBody(event);
  const accessToken = getCookie(event, "sb-access-token");
  console.log("episodeInfo :>> ", episodeInfo);
  return await $fetch(`${apiUrl}/episode/data/${podcastId}/${episodeId}`, {
    method: "PATCH",
    body: episodeInfo,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
