import { currencySymbols } from "../utils/currency-symbols.js";

export class CurrenciesService {
  constructor(app) {
    this.app = app;
  }

  async get({ reply }) {
    try {
      const currencies = {
        ...Object.keys(currencySymbols).reduce((acc, code) => {
          acc[code] = {
            "code": code,
            "symbol": currencySymbols[code]
          };
          return acc;
        }, {})
      };

      reply.send({ currencies });
    } catch (error) {
      this.app.log.error(error);
      reply.internalServerError();
    }
  }
}
