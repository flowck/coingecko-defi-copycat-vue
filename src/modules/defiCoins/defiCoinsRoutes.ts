import { RouteRecordRaw } from "vue-router";
import ListDeFiCoins from "./views/ListDeFiCoins.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "de-fi-coins",
    name: "ListDeFiCoins",
    component: ListDeFiCoins,
    meta: {
      viewTitle: "Coins per Market",
    },
  },
];

export default routes;
