import axios, { type AxiosInstance } from "axios";
import type { Currency } from "@/types/currency.type";
import type { ApiError } from "@/types/error.type";

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
