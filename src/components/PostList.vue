<template>
  <div class="container">
    <input
      type="text"
      class="form-control"
      v-model="search"
      placeholder="검색어를 입력해주세요."
    />
    <div class="pt-5">
      <div class="float-right pb-2 mb-2">
        <button
          class="btn btn-primary"
          type="button"
          @click="this.$router.push('/add')"
        >
          글쓰기
        </button>
      </div>
      <table class="table table-hover">
        <thead class="bg-dark text-light">
          <tr>
            <th>제목</th>
            <th>날짜</th>
            <th></th>
          </tr>
        </thead>
        <tr
          v-for="post in filterdPost"
          :key="post.id"
          :posts="posts"
          @click="this.$router.push(`/post/${post.id}`)"
        >
          <td>{{ post.title }}</td>
          <td>{{ post.created_at.slice(0, 10) }}</td>

          <td class="col-md-1">
            <button
              class="btn btn-danger"
              type="button"
              :posts="posts"
              @click="deletePost(post.id)"
            >
              삭제
            </button>
          </td>
        </tr>
      </table>
      <paginated-list
        :last_page="last_page"
        :current_page="current_page"
        @movePage="movePage"
      ></paginated-list>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PaginatedList from "./PaginatedList";
export default {
  components: {
    PaginatedList,
  },
  data() {
    return {
      posts: [],
      per_page: "",
      search: "",
      last_page: "",
      current_page: "",
    };
  },
  methods: {
    async getPosts(current_page) {
      try {
        const getposts = await axios.get(
          `http://localhost/api/board?page=${current_page}`
        );
        this.posts = getposts.data.data.data;
        this.last_page = getposts.data.data.last_page;
        this.current_page = getposts.data.data.current_page;
      } catch (e) {
        console.log(e);
      }
    },
    async deletePost(id) {
      try {
        let x = window.confirm("정말 삭제 하시겠습니까?");
        if (x) {
          await axios.delete("http://localhost/api/board/" + id);
        }
        this.posts.splice(this.id, 1);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
    movePage(page) {
      this.getPosts(page);
    },
  },
  computed: {
    filterdPost() {
      return this.posts.filter((post) => {
        return post.title.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>
