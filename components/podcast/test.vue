<template>
  <div>
    <form @submit.prevent="uploadFile">
      <input ref="uploadInput" id="files" type="file" />
      <input type="text" v-model="title" />
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    async uploadFile() {
      const files = document.getElementById("files");

      const formData = new FormData();

      formData.append("title", this.title);

      for (let i = 0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
      }

      await useFetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    },
  },
};
</script>
