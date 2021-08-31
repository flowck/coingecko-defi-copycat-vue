import { Module } from "vuex";
import { RootState, SET_ERROR } from "@/store";
import { ExchangesService } from "./exchanges.service";
import { Exchange, ExchangesRootState } from "./exchanges.interfaces";

const exchangesService = new ExchangesService();
export const EXCHANGES_MODULE = "exchangesModule";
const SET_EXCHANGES = "SET_EXCHANGES";

export const exchangesModule: Module<ExchangesRootState, RootState> = {
  namespaced: true,
  state: { exchanges: [] },
  actions: {
    async getExchanges({ commit }, { page, perPage }) {
      try {
        const exchanges = await exchangesService.getExchanges(page, perPage);
        commit(SET_EXCHANGES, exchanges);
      } catch (error) {
        commit(SET_ERROR, error);
      }
    },
  },
  mutations: {
    [SET_EXCHANGES]: (state, exchanges: Exchange[]) =>
      (state.exchanges = exchanges),
  },
};
