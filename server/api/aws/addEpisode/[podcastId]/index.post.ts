export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();
  const accessToken = getCookie(event, "sb-access-token");
  const podcastId = event.context.params?.podcastId;
  const formData = await readFormData(event);
  console.log("formData :>> ", formData);
  return await $fetch(`${apiUrl}/aws/addEpisode/${podcastId}`, {
    //   return await $fetch(`http://localhost:4000/api`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
