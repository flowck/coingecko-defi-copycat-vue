import {
  Currency,
  CoinResponse,
  HistoricalData,
  GetCoinsByMarketCapParams,
  CoinHistoricalDataResponse,
} from "./coins.interfaces";
import axios from "axios";
import { Coin } from "./coin";
import { Service } from "@/common/utils/service";

export class CoinsService extends Service {
  private readonly KEY_COINS = "cg.coins";
  private readonly KEY_VS_CURRENCIES = "cg.vsCurrencies";
  private readonly KEY_HISTORICAL_DATA = "cg.historicalData";

  async getCoinHistoricalData(
    id: string,
    vsCurrency: string,
    days = 30
  ): Promise<HistoricalData[]> {
    const key = `${this.KEY_HISTORICAL_DATA}.${id}.${vsCurrency}`;
    const cached = this.getCached(key);

    if (cached) {
      return JSON.parse(cached);
    }

    const { data } = await axios.get<CoinHistoricalDataResponse>(
      `/coins/${id}/market_chart`,
      { params: { vs_currency: vsCurrency, days } }
    );

    const historicalData = [
      { name: "Prices", data: data.prices },
      { name: "Market Cap.", data: data.market_caps },
      { name: "Total volumes", data: data.total_volumes },
    ];

    this.setCache(key, historicalData);

    return historicalData;
  }

  async getCoinsByMarketCap({
    page,
    perPage,
    vsCurrency,
    category,
  }: GetCoinsByMarketCapParams): Promise<Coin[]> {
    const cached = this.getCached(this.KEY_COINS);

    if (cached) {
      return JSON.parse(cached);
    }

    const { data } = await axios.get("/coins/markets", {
      params: {
        category,
        page: page || 1,
        per_page: perPage || 10,
        vs_currency: vsCurrency || "usd",
      },
    });
    const coins = this.mapCoinsResponse(data);
    this.setCache(this.KEY_COINS, coins);

    return coins;
  }

  async getSupportedCurrencies(): Promise<Currency[]> {
    const url = "/simple/supported_vs_currencies";
    const cached = this.getCached(this.KEY_VS_CURRENCIES);

    if (cached) {
      return JSON.parse(cached);
    }

    const { data } = await axios.get<string[]>(url);
    const currencies = data.map((currency) => ({
      name: currency,
      label: currency.toLocaleUpperCase(),
    }));

    this.setCache(this.KEY_VS_CURRENCIES, currencies);

    return currencies;
  }

  private mapCoinsResponse(coins: CoinResponse[]): Coin[] {
    return coins.map((coin, index) => new Coin(coin, index));
  }
}
