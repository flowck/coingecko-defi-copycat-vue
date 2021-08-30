import axios from "axios";
import { Coin } from "./coin";
import { CoinResponse } from "./interfaces";
import { AppError } from "@/common/utils/appError";

export interface GetCoinsByMarketCapParams {
  page?: number;
  perPage?: number;
  category: string;
  vsCurrency: string;
}

export class CoinsService {
  async getCoinsByMarketCap({
    page,
    perPage,
    vsCurrency,
    category,
  }: GetCoinsByMarketCapParams): Promise<Coin[]> {
    try {
      const cached = this.getCached("cg.coins");

      if (cached) {
        console.log(JSON.stringify(JSON.parse(cached).splice(0, 2)));
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
      console.log(error);
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
