import { version } from "../package.json";
import { createStore, Store } from "vuex";
import { coinsModule } from "@/modules/coins/store/coins.module";
import { exchangesModule } from "./modules/exchanges/store/exchanges.module";

export const SET_ERROR = "SET_ERROR";
const SET_IS_LOADING = "SET_IS_LOADING";

export interface RootState {
  isLoading: boolean;
  app: { name: string; version: string };
}

export const store: Store<RootState> = createStore({
  state: {
    isLoading: false,
    app: { name: "CoinGecko", version },
  },
  modules: {
    coinsModule,
    exchangesModule,
  },
  actions: {
    isLoading({ commit }, value: boolean) {
      commit(SET_IS_LOADING, value);
    },
  },
  mutations: {
    [SET_IS_LOADING]: (state, value) => (state.isLoading = value),
  },
});

export const isLoading = (value = false): void => {
  store.dispatch("isLoading", value);
};
