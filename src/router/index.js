import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import AddView from "../views/AddView.vue";
import UpdateArticle from "../views/UpdateArticle.vue";
import EditView from "../views/EditView.vue";
import PostView from "../views/PostView.vue";
import { useAuthStore } from "../stores/auth.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/post/:slug",
      name: "Post",
      component: PostView,
    },
    {
      path: "/add",
      name: "AddView",
      component: AddView,
      meta: { requiresAuth: true },
    },
    {
      path: "/edit",
      name: "EditView",
      component: EditView,
      meta: { requiresAuth: true },
    },
    {
      path: "/posts/:slug",
      name: "UpdateArticle",
      component: UpdateArticle, 
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to) => {

  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return {
      path: "/login",
    }
  } 
})
const DEFAULT_TITLE = 'Blog';

router.afterEach((to) => {
  document.title = to.name || DEFAULT_TITLE;
});
export default router;
