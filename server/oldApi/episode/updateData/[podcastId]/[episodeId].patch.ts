export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const accessToken = getCookie(event, "sb-access-token");
  const { podcastId, episodeId } = getRouterParams(event);

  const formData = await readFormData(event);
  console.log("UPDATE EPİSODE İNFO ÇALIŞTI  :>> ", formData);
  return await $fetch(
    `${apiUrl}/episode/updateData/${podcastId}/${episodeId}`,
    {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
});
