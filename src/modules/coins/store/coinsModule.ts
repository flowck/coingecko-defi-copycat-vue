import { Module } from "vuex";
import { Coin } from "./coin";
import { RootState } from "@/store";
import { CoinsService } from "./coinsService";
import { AppError } from "@/common/utils/appError";

interface CoinsModuleState {
  coins: Coin[];
  vsCurrency: string;
  error: AppError | null;
}

const coinsService = new CoinsService();

const SET_ERROR = "SET_ERROR";
const SET_COINS = "SET_COINS";
export const COINS_MODULE = "coinsModule";

export const coinsModule: Module<CoinsModuleState, RootState> = {
  namespaced: true,
  state: {
    coins: [],
    error: null,
    vsCurrency: "USD",
  },
  actions: {
    async getDeFiCoinsByMarketCap({ commit, state }) {
      try {
        const params = {
          vsCurrency: state.vsCurrency,
          category: "decentralized-finance-defi",
        };
        const coins = await coinsService.getCoinsByMarketCap(params);
        commit(SET_COINS, coins);
      } catch (error) {
        commit(SET_ERROR, error);
      }
    },
  },
  getters: {
    vsCurrency: (state) => state.vsCurrency,
  },
  mutations: {
    [SET_ERROR]: (state, error: AppError) => (state.error = error),
    [SET_COINS]: (state, coins: Coin[]) => (state.coins = coins),
  },
};
