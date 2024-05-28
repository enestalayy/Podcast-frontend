export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/user/podcast`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
