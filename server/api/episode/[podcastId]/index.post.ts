export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const { podcastId } = getRouterParams(event);
  const formData = await readFormData(event);
  const accessToken = getCookie(event, "sb-access-token");
  console.log("formData :>> ", formData);
  return await $fetch(`${apiUrl}/episode/${podcastId}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
