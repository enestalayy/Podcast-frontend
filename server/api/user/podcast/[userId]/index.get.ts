export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const { userId } = getRouterParams(event);
  const accessToken = getCookie(event, "sb-access-token");

  return await $fetch(`${apiUrl}/user/podcast/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
