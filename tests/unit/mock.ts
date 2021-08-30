import coins from "../fixtures/coins.json";

const requestResponses: Record<string, unknown> = {
  "/coins": coins,
};

(globalThis as any).axios = {
  get(url: string, options: any) {
    return requestResponses[url];
  },
};
