export default defineEventHandler(async (event) => {
  const { apiUrl1 } = useRuntimeConfig();
  const { code, date } = await readBody(event);

  return await $fetch(`${apiUrl1}/podcast`, {
    method: "POST",
    body: {
      podcastName: "",
      podcastCategory: "",
      podcastDescription: "",
      file: "",
    },
  });
});
