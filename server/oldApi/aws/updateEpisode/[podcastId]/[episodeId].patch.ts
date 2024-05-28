export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const accessToken = getCookie(event, "sb-access-token");
  const { podcastId, episodeId } = getRouterParams(event);

  const formData = await readFormData(event);
  console.log("UPDATE AUDİO ÇALIŞTI :>> ", formData);
  return await $fetch(`${apiUrl}/aws/updateEpisode/${podcastId}/${episodeId}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
