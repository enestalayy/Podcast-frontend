export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const podcastId = event.context.params?.podcastId;
  const formData = await readFormData(event);
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/podcast/file/${podcastId}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
