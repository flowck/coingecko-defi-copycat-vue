import { CoinsService } from "@/modules/coins/store/coinsService";

describe("CoinsService.ts", () => {
  let coinsService: CoinsService;

  beforeAll(() => {
    coinsService = new CoinsService();
  });

  it("Expects getCoinsByMarketCap() to return a list", async () => {
    const coins = await coinsService.getCoinsByMarketCap({
      vsCurrency: "usd",
      category: "decentralized-finance-defi",
    });
    expect(coins.length > 0).toBe(true);
  });

  it("Expects getCoinsByMarketCap() to return a list of valid coins", async () => {
    const coins = await coinsService.getCoinsByMarketCap({
      vsCurrency: "usd",
      category: "decentralized-finance-defi",
    });

    coins.forEach((coin) => {
      expect(typeof coin.id).toBe("string");
      expect(typeof coin.name).toBe("string");
    });
  });
});
