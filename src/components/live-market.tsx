import { Dot } from "lucide-react";
import MarketItem from "./market-item";
import { tickerData } from "@/utils/api";
import { TOP_CURRENCIES } from "@/data/constants/currencies";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./spinner";
import { useState, useEffect } from "react";

export default function LiveMarket() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const {
    data: ticker,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tickerData"],
    queryFn: () => tickerData("USD", TOP_CURRENCIES),
    enabled: isReady,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center bg-neutral-700">
        <p className="text-red-500">Error fetching ticker data</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center overflow-x-hidden bg-neutral-700">
        <div className="px-2 md:px-4 py-3 bg-lime-500 flex flex-none items-center justify-center gap-2 text-neutral-900 tp-6 md:tp-5-medium">
          <Dot size={6} strokeWidth={20} stroke="#0A0A0A" />
          <p>LIVE MARKETS</p>
        </div>
        <div className="ticker overflow-x-hidden">
          <div className="ticker-track flex items-center">
            {isLoading && <Spinner />}
            {!isLoading &&
              ticker?.map((item) => (
                <MarketItem
                  key={`${item.baseCurrency}/${item.quoteCurrency}`}
                  pair={`${item.baseCurrency}/${item.quoteCurrency}`}
                  change={item.change}
                  percentageChange={item.percentageChange}
                />
              ))}
            {!isLoading &&
              ticker?.map((item) => (
                <MarketItem
                  key={`${item.baseCurrency}/${item.quoteCurrency}`}
                  pair={`${item.baseCurrency}/${item.quoteCurrency}`}
                  change={item.change}
                  percentageChange={item.percentageChange}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
