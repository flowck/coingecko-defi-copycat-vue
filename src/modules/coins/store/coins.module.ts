import {
  SET_COINS,
  SET_VS_CURRENCY,
  SET_VS_CURRENCIES,
  SET_COIN_HISTORICAL_DATA,
  SET_COIN,
} from "./coins.constants";
import { Module } from "vuex";
import { Coin } from "./coin";
import {
  getSingleCoin,
  getCoinsByMarketCap,
  getCoinHistoricalData,
  getSupportedCurrencies,
} from "./coins.service";
import { RootState, SET_ERROR } from "@/store";
import { AppError } from "@/common/utils/appError";
import {
  CoinsModuleState,
  HistoricalData,
  CoinResponse,
} from "./coins.interfaces";

export const coinsModule: Module<CoinsModuleState, RootState> = {
  namespaced: true,
  state: {
    coins: [],
    coin: null,
    error: null,
    vsCurrency: "usd",
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
        const coins = await getCoinsByMarketCap(params);
        commit(SET_COINS, coins);
      } catch (error) {
        commit(SET_ERROR, error);
      }
    },
    async getCoinHistoricalData({ commit, state }, coinId: string) {
      try {
        const data = await getCoinHistoricalData(coinId, state.vsCurrency);
        commit(SET_COIN_HISTORICAL_DATA, data);
      } catch (error) {
        commit(SET_ERROR, error);
      }
    },
    async getVsCurrencies({ commit }) {
      try {
        const currencies = await getSupportedCurrencies();
        commit(SET_VS_CURRENCIES, currencies);
      } catch (error) {
        commit(SET_ERROR, error);
      }
    },
    async setVsCurrency({ commit }, currency: string) {
      commit(SET_VS_CURRENCY, currency);
    },
    async getSingleCoin({ commit }, id: string) {
      const data = await getSingleCoin(id).catch((error) =>
        commit(SET_ERROR, error)
      );

      commit(SET_COIN, data);
    },
    async onCurrencyChange({ dispatch }, currency: string) {
      dispatch("setVsCurrency", currency);
    },
  },
  getters: {
    vsCurrency: (state) => state.vsCurrency,
    historicalDataCategories(state) {
      return state.historicalData.map((item, index) => ({
        value: index,
        name: item.name,
      }));
    },
  },
  mutations: {
    [SET_ERROR]: (state, error: AppError) => (state.error = error),
    [SET_COINS]: (state, coins: Coin[]) => (state.coins = coins),
    [SET_COIN]: (state, coin: CoinResponse) => (state.coin = coin),
    [SET_VS_CURRENCY]: (state, currency: string) =>
      (state.vsCurrency = currency),
    [SET_VS_CURRENCIES]: (state, currencies: Array<string>) =>
      (state.vsCurrencies = currencies),
    [SET_COIN_HISTORICAL_DATA]: (state, data: HistoricalData[]) =>
      (state.historicalData = data),
  },
};
