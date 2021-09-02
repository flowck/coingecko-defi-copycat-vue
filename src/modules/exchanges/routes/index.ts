import { RouteRecordRaw } from "vue-router";
import ListExchanges from "@/modules/exchanges/views/list-exchanges.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "exchanges",
    name: "ListExchanges",
    component: ListExchanges,
    meta: {
      viewTitle: "Top Exchanges",
    },
  },
];

export default routes;
