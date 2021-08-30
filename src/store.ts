import { createStore, Store } from "vuex";
import { coinsModule } from "@/modules/coins/store/coinsModule";

export interface RootState {
  appName: string;
}

export const store: Store<RootState> = createStore({
  state: {
    appName: "CoinGecko",
  },
  mutations: {},
  actions: {},
  modules: {
    coinsModule,
  },
});
