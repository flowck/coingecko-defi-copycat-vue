export interface Exchange {
  id: string;
  url: string;
  image: string;
  name: string;
  country: string;
  description: string;
  trust_score: number;
  trust_score_rank: number;
  year_established: number;
  trade_volume_24h_btc: number;
  has_trading_incentive: boolean;
  trade_volume_24h_btc_normalized: number;
}

export interface ExchangesRootState {
  exchanges: Exchange[];
}
