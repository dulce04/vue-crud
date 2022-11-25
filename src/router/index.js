import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import AddPost from "../components/AddPost.vue";
import PostDetail from "../components/PostDetail.vue";
import EditPost from "../components/EditPost.vue"; 

const routes = [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    name: "addpost",
    path: "/add",
    component: AddPost,
  },
  {
    name: "postDetail",
    path: "/post/:id",
    component: PostDetail,
  },
  {
    name: "editpost",
    path: "/edit/:id",
    component: EditPost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
