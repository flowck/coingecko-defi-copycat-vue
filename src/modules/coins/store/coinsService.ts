import {
  CoinResponse,
  HistoricalData,
  GetCoinsByMarketCapParams,
  CoinHistoricalDataResponse,
} from "./interfaces";
import axios from "axios";
import { Coin } from "./coin";
import { AppError } from "@/common/utils/appError";

export class CoinsService {
  async getCoinHistoricalData(
    id: string,
    vsCurrency: string,
    days = 30
  ): Promise<HistoricalData[]> {
    const key = `cg.historicalData.${id}.${vsCurrency}`;
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
    try {
      const cached = this.getCached("cg.coins");

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
      this.setCache("cg.coins", coins);

      return coins;
    } catch (error) {
      throw new AppError(error);
    }
  }

  private getCached(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  private setCache<T>(key: string, data: T): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  private mapCoinsResponse(coins: CoinResponse[]): Coin[] {
    return coins.map((coin, index) => new Coin(coin, index));
  }
}
