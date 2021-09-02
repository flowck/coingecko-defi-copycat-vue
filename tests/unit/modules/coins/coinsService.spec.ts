import {
  getCoinsByMarketCap,
  getSupportedCurrencies,
} from "@/modules/coins/store/coins.service";

describe("coins.service.ts", () => {
  it("Expects getCoinsByMarketCap() to return a list", async () => {
    const coins = await getCoinsByMarketCap({
      vsCurrency: "usd",
      category: "decentralized-finance-defi",
    });
    expect(coins.length > 0).toBe(true);
  });

  it("Expects getCoinsByMarketCap() to return a list of valid coins", async () => {
    const coins = await getCoinsByMarketCap({
      vsCurrency: "usd",
      category: "decentralized-finance-defi",
    });

    coins.forEach((coin) => {
      expect(typeof coin.id).toBe("string");
      expect(typeof coin.name).toBe("string");
    });
  });

  it("Expects getSupportedCurrencies() to return a list of currencies", async () => {
    const currencies = await getSupportedCurrencies();

    currencies.forEach((currency) => {
      expect(typeof currency.name).toBe("string");
      expect(typeof currency.label).toBe("string");
    });
  });

  it("Expects getSupportedCurrencies() to cache results", async () => {
    await getSupportedCurrencies();

    expect(typeof window.localStorage.getItem("cg.vsCurrencies")).toBe(
      "string"
    );
  });
});
