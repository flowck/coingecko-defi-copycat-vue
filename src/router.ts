import Dashboard from "@/common/views/Dashboard.vue";
import DeFiCoins from "@/modules/defiCoins/defiCoinsRoutes";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/de-fi",
  },
  {
    path: "/de-fi",
    name: "Dashboard",
    component: Dashboard,
    children: [...DeFiCoins],
    redirect: "/de-fi/de-fi-coins",
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
