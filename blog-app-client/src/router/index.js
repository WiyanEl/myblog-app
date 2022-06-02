import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/admin/login",
      name: "login.admin",
      component: LoginView,
    },
    {
      path: "/admin/register",
      name: "register.admin",
      component: RegisterView,
    },
    {
      path: "/dashboard",
      name: "dashboard.admin",
      component: DashboardView,
    },
  ],
});

export default router;
