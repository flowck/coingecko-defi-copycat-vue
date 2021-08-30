import coins from "../tests/fixtures/coins.json";

const requestResponses: Record<string, unknown> = {
  "/coins/markets": coins,
};

export default {
  get(url: string, options: any) {
    return { data: requestResponses[url] };
  },
};
