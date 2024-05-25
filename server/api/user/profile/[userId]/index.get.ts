export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const userId = event.context.params?.userId;
  const accessToken = getCookie(event, "sb-access-token");

  // return await $fetch(`${apiUrl}/user/profile/${userId}`, {
  return await $fetch(`${apiUrl}/user/profile/6647f09f42d5dc7a11e023e5`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
