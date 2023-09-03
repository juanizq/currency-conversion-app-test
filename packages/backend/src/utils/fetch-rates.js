import undici from "undici";
import { config } from "../config.js";

let cachedRates = null;

const fetchRatesFromApi = async () => {
  const endpoint = new URL(config.MONEYCONVERT_ENDPOINT);
  endpoint.searchParams.set("_", Date.now());

  const { statusCode, body } = await undici.request(endpoint, {
    method: "GET",
  });

  if (statusCode < 200 || statusCode > 299) {
    throw new Error(`Unexpected API response code: ${statusCode}`);
  }

  const data = await body.json();
  if (!data.rates || typeof data.rates !== "object") {
    throw new Error("Unexpected API response body");
  }

  return new Map([...Object.entries(data.rates)].sort());
};

export const fetchRates = async () => {
  if (cachedRates && Date.now() - cachedRates.timestamp < 3600000) {
    return cachedRates.rates;
  } else {
    const rates = await fetchRatesFromApi();
    cachedRates = {
      timestamp: Date.now(),
      rates: rates,
    };
    return rates;
  }
};