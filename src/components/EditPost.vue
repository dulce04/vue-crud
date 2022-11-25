<template>
  <div class="container mt-4">
    <div class="form-group">
      <label for="title">제목</label>
      <input type="text" class="form-control mb-2" v-model="post.title" />
    </div>
    <div class="form-group">
      <label for="content">내용</label>
      <input type="text" class="form-control mb-2" v-model="post.content" />
    </div>
    <input type="file" @change="changeFile" name="file" /><br />
    <br />
    <button class="btn btn-dark" @click="editPost">수정</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {},
      title: "",
      content: "",
      file_url: "",
    };
  },
  methods: {
    async getEditRead() {
      axios
        .get(`http://localhost/api/board/${this.$route.params.id}`)
        .then((res) => {
          this.post = res.data.data;
          console.log(this.post);
        });
    },
    async changeFile(e) {
      this.file_url = e.target.files[0];
    },
    async editPost() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("file", this.file_url);
      formData.append("_method", "PUT");
      try {
        axios.post(
          `http://localhost/api/board/${this.$route.params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("수정완료했습니다.");
        //this.$router.push(`/post/${this.$route.params.id}`);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getEditRead();
  },
};
</script>

<style></style>
