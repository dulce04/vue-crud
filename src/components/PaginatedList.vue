<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item" v-for="(page, idx) in last_page" :key="idx">
          <a class="page-link" @click="movePage(page)"> {{ page }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["current_page", "last_page"],
  methods: {
    movePage(page) {
      this.$emit("movePage", page);
    },
  },
};
</script>
