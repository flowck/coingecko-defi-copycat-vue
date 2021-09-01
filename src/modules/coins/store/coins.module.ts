import { Module } from "vuex";
import { Coin } from "./coin";
import { CoinsService } from "./coins.service";
import { RootState, SET_ERROR } from "@/store";
import { AppError } from "@/common/utils/appError";
import { CoinsModuleState, HistoricalData } from "./coins.interfaces";

const coinsService = new CoinsService();

const SET_COINS = "SET_COINS";
const SET_VS_CURRENCY = "SET_VS_CURRENCY";
const SET_VS_CURRENCIES = "SET_VS_CURRENCIES";
const SET_COIN_HISTORICAL_DATA = "SET_COIN_HISTORICAL_DATA";
export const COINS_MODULE = "coinsModule";

export const coinsModule: Module<CoinsModuleState, RootState> = {
  namespaced: true,
  state: {
    coins: [],
    error: null,
    vsCurrency: "USD",
    historicalData: [],
    vsCurrencies: new Array<string>(),
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
    async getVsCurrencies({ commit }) {
      try {
        const currencies = await coinsService.getSupportedCurrencies();
        commit(SET_VS_CURRENCIES, currencies);
      } catch (error) {
        commit(SET_ERROR, error);
      }
    },
    async setVsCurrency({ commit }, currency: string) {
      commit(SET_VS_CURRENCY, currency);
    },
  },
  getters: {
    vsCurrency: (state) => state.vsCurrency,
  },
  mutations: {
    [SET_ERROR]: (state, error: AppError) => (state.error = error),
    [SET_COINS]: (state, coins: Coin[]) => (state.coins = coins),
    [SET_VS_CURRENCY]: (state, currency: string) =>
      (state.vsCurrency = currency),
    [SET_VS_CURRENCIES]: (state, currencies: Array<string>) =>
      (state.vsCurrencies = currencies),
    [SET_COIN_HISTORICAL_DATA]: (state, data: HistoricalData[]) =>
      (state.historicalData = data),
  },
};
