import {
  Currency,
  CoinResponse,
  HistoricalData,
  GetCoinsByMarketCapParams,
  CoinHistoricalDataResponse,
} from "./coins.interfaces";
import axios from "axios";
import { Coin } from "./coin";
import { getCached, setCache } from "@/common/utils/service";

const KEY_COINS = "cg.coins";
const KEY_COIN = "cg.coins";
const KEY_VS_CURRENCIES = "cg.vsCurrencies";
const KEY_HISTORICAL_DATA = "cg.historicalData";

export async function getCoinHistoricalData(
  id: string,
  vsCurrency: string,
  days = 30
): Promise<HistoricalData[]> {
  const key = `${KEY_HISTORICAL_DATA}.${id}.${vsCurrency}`;
  const cached = getCached<HistoricalData[]>(key);

  if (cached) {
    return cached;
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

  setCache(key, historicalData);

  return historicalData;
}

export async function getCoinsByMarketCap({
  page,
  perPage,
  vsCurrency,
  category,
}: GetCoinsByMarketCapParams): Promise<Coin[]> {
  const cached = getCached<Coin[]>(KEY_COINS);

  if (cached) {
    return cached;
  }

  const { data } = await axios.get("/coins/markets", {
    params: {
      category,
      page: page || 1,
      per_page: perPage || 10,
      vs_currency: vsCurrency || "usd",
    },
  });
  const coins = mapCoinsResponse(data);
  setCache(KEY_COINS, coins);

  return coins;
}

export async function getSupportedCurrencies(): Promise<Currency[]> {
  const url = "/simple/supported_vs_currencies";
  const cached = getCached<Currency[]>(KEY_VS_CURRENCIES);

  if (cached) {
    return cached;
  }

  const { data } = await axios.get<string[]>(url);
  const currencies = data.map((currency) => ({
    name: currency,
    label: currency.toLocaleUpperCase(),
  }));

  setCache(KEY_VS_CURRENCIES, currencies);

  return currencies;
}

export async function getSingleCoin(id: string): Promise<CoinResponse> {
  const key = `${KEY_COIN}.${id}`;
  const cached = getCached<CoinResponse>(key);

  if (cached) {
    return cached;
  }

  const { data } = await axios.get<CoinResponse>(`/coins/${id}`);
  setCache(key, data);
  return data;
}

function mapCoinsResponse(coins: CoinResponse[]): Coin[] {
  return coins.map((coin, index) => new Coin(coin, index));
}
