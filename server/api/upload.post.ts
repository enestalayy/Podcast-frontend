export default defineEventHandler(async (event) => {
  // const formData = await readFormData(event);
  // console.log("formData :>> ", formData);

  // return await $fetch(`http://localhost:4000/api`, {
  //   method: "POST",
  //   body: formData,
  // });
  console.log("çalllışşştıtııı :>> ", "çalllışşştıtııı");
  return await $fetch(
    "https://podcast-backend-zeta.vercel.app/aws/addEpisode/664883d0592430d423f6eb16",
    {
      method: "POST",
      body: {
        asd: "awludhkuawhdkuahwd",
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6InB1VENNM3ExcmFQNTFjZzQiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE2ODAyMjkyLCJpYXQiOjE3MTYxOTc0OTIsImlzcyI6Imh0dHBzOi8veW1zc2Rzd25lZHVjdHV4d3ZybHIuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjVkZWQxY2ZiLTBiYzQtNGU0Ni04MzdjLTVkNjJlZmQzY2U4ZSIsImVtYWlsIjoiZW5lc3RhbGF5eUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xrSjVUOU8zcGdNanl5SlhmczR3eEZhblZGUXJUVWE4S3FoNHAwV1ZnaGZjd0dqQT1zOTYtYyIsImVtYWlsIjoiZW5lc3RhbGF5eUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZnVsbF9uYW1lIjoiRW5lcyBUYWxheSIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsIm5hbWUiOiJFbmVzIFRhbGF5IiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTGtKNVQ5TzNwZ01qeXlKWGZzNHd4RmFuVkZRclRVYThLcWg0cDBXVmdoZmN3R2pBPXM5Ni1jIiwicHJvdmlkZXJfaWQiOiIxMDU4NzQ3MTU1NjY3MjMzMDA2MzUiLCJzdWIiOiIxMDU4NzQ3MTU1NjY3MjMzMDA2MzUifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTcxNjE5NzQ5Mn1dLCJzZXNzaW9uX2lkIjoiYjc0NDI1ZDctMDgyNi00NzBhLWJmNmMtMTYyZmU0NWIwMWUxIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.eD45AZNeJETpCKZMHOBKkoe4UJSxPdRXqvlm7zT9B_0`,
      },
    }
  );
});
