<template>
  <div class="container mt-4">
    <div class="card">
      <h5 class="card-header">{{ post.title }}</h5>
      <div class="card-body">
        <p class="card-text">
          {{ post.content }}
        </p>
        <p class="card-text">
          <img
            alt="post-img"
            width="100"
            :src="`http://localhost${post.file_url}`"
          />
        </p>
      </div>
    </div>
    <div class="float-right mt-3">
      <button
        class="btn btn-light mr-2"
        type="button"
        @click="this.$router.push(`/edit/${post.id}`)"
      >
        수정
      </button>
      <button class="btn btn-dark" @click="this.$router.push('/')">목록</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {},
    };
  },
  created() {
    axios
      .get(`http://localhost/api/board/${this.$route.params.id}`)
      .then((res) => {
        this.post = res.data.data;
      });
  },
  methods: {},
};
</script>

<style></style>
