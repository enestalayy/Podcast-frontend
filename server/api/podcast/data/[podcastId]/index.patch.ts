export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const podcastId = event.context.params?.podcastId;
  const formInfo = await readBody(event);
  const accessToken = getCookie(event, "sb-access-token");
  console.log("formInfo :>> ", formInfo);
  return await $fetch(`${apiUrl}/podcast/data/${podcastId}`, {
    method: "PATCH",
    body: formInfo,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
