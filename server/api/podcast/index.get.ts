export default defineEventHandler(async () => {
  const { apiUrl1 } = useRuntimeConfig();
  return await $fetch(`${apiUrl1}/podcast`, {
    method: "GET",
  });
});
