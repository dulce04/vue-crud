<template>
  <div class="container mt-4">
    <input type="text" class="form-control mb-2" v-model="title" />
    <input type="text" class="form-control mb-2" v-model="content" />
    <input type="file" @change="changeFile" name="file" /><br />
    <button class="btn btn-dark mt-3" @click="addPost">등록</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      content: "",
      file_url: "",
    };
  },
  methods: {
    async changeFile(e) {
      this.file_url = e.target.files[0];
    },
    async addPost() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("file", this.file_url);
      try {
        axios.post("http://localhost/api/board", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
