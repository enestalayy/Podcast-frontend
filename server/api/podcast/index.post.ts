export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const formData = await readFormData(event);
  console.log("formData :>> ", formData);
  const accessToken = getCookie(event, "sb-access-token");
  return await $fetch(`${apiUrl}/podcast`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
