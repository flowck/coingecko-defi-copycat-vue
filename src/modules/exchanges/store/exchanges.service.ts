import axios from "axios";
import { Service } from "@/common/utils/service";
import { Exchange } from "./exchanges.interfaces";

export class ExchangesService extends Service {
  private readonly KEY_EXCHANGES = "cg.exchanges";

  async getExchanges(page = 1, perPage = 10): Promise<Exchange[]> {
    const cached = this.getCached(this.KEY_EXCHANGES);
    if (cached) {
      return JSON.parse(cached);
    }

    const options = { params: { page, per_page: perPage } };
    const { data } = await axios.get<Exchange[]>("/exchanges", options);
    this.setCache(this.KEY_EXCHANGES, data);
    return data;
  }
}
