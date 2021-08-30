import { CoinImage, CoinResponse } from "./interfaces";

export class Coin {
  id!: string;
  name!: string;
  price!: number;
  symbol!: string;
  image!: CoinImage;
  marketCapitalization!: number;
  fullyDilutedMarketCap!: number;
  marketCapitalizationRanking!: number;

  constructor(coinResponse: CoinResponse, public index: number) {
    this.id = coinResponse.id;
    this.name = coinResponse.name;
    this.image = coinResponse.image;
    this.symbol = coinResponse.symbol;
    this.price = coinResponse.current_price;
    this.marketCapitalization = coinResponse.market_cap;
    this.marketCapitalizationRanking = coinResponse.market_cap_rank;
    this.fullyDilutedMarketCap = coinResponse.fully_diluted_valuation;
  }
}
