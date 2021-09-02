import Dashboard from "@/common/views/Dashboard.vue";
import coinsRoutes from "@/modules/coins/routes";
import exchangesRoutes from "@/modules/exchanges/routes";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [...coinsRoutes, ...exchangesRoutes],
    redirect: "/dashboard/coins",
  },
  // 404
  {
    redirect: "/",
    path: "/:pathMatch(.*)*",
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
