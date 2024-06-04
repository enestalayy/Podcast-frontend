export default defineEventHandler(async (event) => {
  const { podcastName } = getRouterParams(event);
  const { trtBaseUrl, trtPodcastUrl } = useRuntimeConfig();
  console.log("trtPodcastUrl :>> ", trtPodcastUrl);
  console.log("trtBaseUrl :>> ", trtBaseUrl);
  console.log("atılan istek url :>> ", `${trtBaseUrl}/show/${podcastName}`);
  console.log(
    "olması gereken url :>> ",
    `https://www.trtdinle.com/api/detail?path=/show/5-dakika`
  );
  return await $fetch(`${trtBaseUrl}/show/${podcastName}`);
});
