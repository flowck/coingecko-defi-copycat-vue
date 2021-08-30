import { Module } from "vuex";
import { Coin } from "./coin";
import { RootState } from "@/store";
import { CoinsService } from "./coinsService";
import { CoinsModuleState, HistoricalData } from "./interfaces";
import { AppError } from "@/common/utils/appError";

const coinsService = new CoinsService();

const SET_ERROR = "SET_ERROR";
const SET_COINS = "SET_COINS";
const SET_COIN_HISTORICAL_DATA = "SET_COIN_HISTORICAL_DATA";
export const COINS_MODULE = "coinsModule";

export const coinsModule: Module<CoinsModuleState, RootState> = {
  namespaced: true,
  state: {
    coins: [],
    error: null,
    vsCurrency: "USD",
    historicalData: [],
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
    async getCoinHistoricalData({ commit, state }, coinId: string) {
      try {
        const data = await coinsService.getCoinHistoricalData(
          coinId,
          state.vsCurrency
        );
        commit(SET_COIN_HISTORICAL_DATA, data);
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
    [SET_COIN_HISTORICAL_DATA]: (state, data: HistoricalData[]) =>
      (state.historicalData = data),
  },
};
