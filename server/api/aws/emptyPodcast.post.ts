export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const formData = await readFormData(event);
  const accessToken = getCookie(event, "sb-access-token");
  return await $fetch(`${apiUrl}/aws/emptyPodcast`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
