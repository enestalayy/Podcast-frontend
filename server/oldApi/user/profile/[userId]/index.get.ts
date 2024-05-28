export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const userId = event.context.params?.userId;
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/user/profile/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
