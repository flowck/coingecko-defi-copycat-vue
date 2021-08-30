import { RouteRecordRaw } from "vue-router";
import ListDeFiCoins from "@/modules/coins/views/ListDeFiCoins.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "de-fi-coins",
    name: "ListDeFiCoins",
    component: ListDeFiCoins,
    meta: {
      viewTitle: "Top 100 DeFi Coins by Market Capitalization",
    },
  },
];

export default routes;
