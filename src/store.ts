import { version } from "../package.json";
import { createStore, Store } from "vuex";
import { coinsModule } from "@/modules/coins/store/coins.module";
import { exchangesModule } from "./modules/exchanges/store/exchanges.module";

export const SET_ERROR = "SET_ERROR";

export interface RootState {
  app: { name: string; version: string };
}

export const store: Store<RootState> = createStore({
  state: {
    app: { name: "CoinGecko", version },
  },
  modules: {
    coinsModule,
    exchangesModule,
  },
});
