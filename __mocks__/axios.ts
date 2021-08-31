import coins from "../tests/fixtures/coins.json";
import currencies from "../tests/fixtures/currencies.json";

const requestResponses: Record<string, unknown> = {
  "/coins/markets": coins,
  "/simple/supported_vs_currencies": currencies,
};

export default {
  get(url: string, options: any) {
    return { data: requestResponses[url] };
  },
};
