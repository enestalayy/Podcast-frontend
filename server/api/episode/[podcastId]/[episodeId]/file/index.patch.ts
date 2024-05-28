export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const { podcastId, episodeId } = getRouterParams(event);
  const formData = await readFormData(event);
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/episode/${podcastId}/${episodeId}/file`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
