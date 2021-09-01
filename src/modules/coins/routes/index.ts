import { RouteRecordRaw } from "vue-router";
import CoinsListAll from "@/modules/coins/views/coins-list-all.vue";
import CoinsSingleDetails from "@/modules/coins/views/coins-single-details.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "coins",
    name: "CoinsListAll",
    component: CoinsListAll,
    meta: {
      viewTitle: "Top 100 DeFi Coins by Market Capitalization",
    },
  },
  {
    path: "coins/:coinId",
    name: "CoinsSingleDetails",
    component: CoinsSingleDetails,
    meta: {
      viewTitle: "",
    },
  },
];

export default routes;
