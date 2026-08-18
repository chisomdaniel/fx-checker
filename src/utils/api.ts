import axios, { type AxiosInstance } from "axios";
import type { Currency } from "@/types/currency.type";
import type { ApiError } from "@/types/error.type";
import { calRatePercentageChange } from "@/utils/change";
import { type Ticker } from "@/types/rates.type";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.frankfurter.dev/v2",
});

export async function getCurrencies(): Promise<Currency[]> {
  try {
    const response = await api.get<Currency[]>(`/currencies`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.log(
        `API Error occured.\n\n\tStatus: ${error.response?.status}\nMessage: ${error.response?.data.message}`,
      );
    }
    throw error;
  }
}

export async function getCurrencyRate(
  base: string,
  quote: string,
): Promise<number> {
  try {
    const response = await api.get(`/rate/${base}/${quote}`);
    return response.data.rate;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.log(
        `API Error occured.\n\n\tStatus: ${error.response?.status}\nMessage: ${error.response?.data.message}`,
      );
    }
    throw error;
  }
}

export async function tickerData(
  base: string,
  quotes: string[],
): Promise<Ticker[]> {
  try {
    const response = await api.get(
      `/rates?from=2026-01-01&to=2026-01-02&base=${base}&quotes=${quotes.join(",")}`,
    );
    // will return a list of quotes.length * 2 (days) rates for the specified date range and quotes

    const quotesCount = quotes.length;
    const start = response.data.slice(0, quotesCount);
    const end = response.data.slice(quotesCount, quotesCount * 2);
    const tickerData = start.map(
      (startRate: { base: string; rate: number }, index: number) => {
        const endRate = end[index];
        return {
          baseCurrency: startRate.base,
          quoteCurrency: endRate.quote,
          percentageChange: calRatePercentageChange(
            startRate.rate,
            endRate.rate,
          ),
          change: endRate.rate - startRate.rate,
        };
      },
    );
    return tickerData;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.log(
        `API Error occured.\n\n\tStatus: ${error.response?.status}\nMessage: ${error.response?.data.message}`,
      );
    }
    throw error;
  }
}
