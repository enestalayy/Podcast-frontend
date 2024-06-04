export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/podcast`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
