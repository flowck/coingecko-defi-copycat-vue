import { Coin } from "./coin";
import { AppError } from "@/common/utils/appError";

export interface Currency {
  name: string;
  label: string;
}

export interface CoinsModuleState {
  coins: Coin[];
  vsCurrency: string;
  error: AppError | null;
  vsCurrencies: Array<string>;
  historicalData: HistoricalData[];
}

export interface HistoricalData {
  name: string;
  data: number[][];
}

export interface CoinImage {
  thumb: string;
  small: string;
  large: string;
}

export interface GetCoinsByMarketCapParams {
  page?: number;
  perPage?: number;
  category: string;
  vsCurrency: string;
}

export interface CoinHistoricalDataResponse {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export interface CoinResponse {
  id: string;
  symbol: string;
  name: string;
  image: CoinImage;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
}
