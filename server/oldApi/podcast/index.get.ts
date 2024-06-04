export default defineEventHandler(async () => {
  const { apiUrl } = useRuntimeConfig();
  return await $fetch(`${apiUrl}/podcast`);
});
