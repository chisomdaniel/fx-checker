import { ArrowRight } from "lucide-react";
import FavIcon from "./fav-icon";
import { cn } from "@/utils/cn";
import { getPeriodData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

export default function FavouritesItem({
  pair1,
  pair2,
  idx,
  setBaseCurrency,
  setQuoteCurrency,
}: {
  pair1: string;
  pair2: string;
  idx: number;
  setBaseCurrency: (currency: string) => void;
  setQuoteCurrency: (currency: string) => void;
}) {
  function handleClick() {
    setBaseCurrency(pair1.toLowerCase());
    setQuoteCurrency(pair2.toLowerCase());
  }

  const { data: periodData, isLoading } = useQuery({
    queryKey: ["periodData", pair1, pair2],
    queryFn: () => getPeriodData(pair1, pair2, "1D"),
  });

  return (
    <div
      key={idx}
      className="tp-4 flex gap-5 items-center p-3 cursor-pointer md:px-4 rounded-[10px] bg-neutral-600 border-neutral-500 border hover:bg-neutral-500 focus:outline-none focus:shadow-tab"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="flex gap-2 grow items-center">
        <p>{pair1.toUpperCase()}</p>
        <ArrowRight size={12} className="stroke-neutral-200" />
        <p>{pair2.toUpperCase()}</p>
      </div>
      <div className="flex flex-col gap-1.5 items-end">
        {isLoading ? (
          <Spinner />
        ) : (
          <p className="tp-3">
            {parseFloat(periodData?.change?.toPrecision(5) || "0")}
          </p>
        )}
        <p
          className={cn(
            "tp-6",
            (periodData?.percentageChange || 0) >= 0
              ? "text-green-500"
              : "text-red-500",
          )}
        >
          {(periodData?.percentageChange || 0) >= 0 ? "▲" : "▼"}{" "}
          {(periodData?.percentageChange?.toFixed(2).toString() || "0") + "%"}
        </p>
      </div>
      <FavIcon baseCurrency={pair1} quoteCurrency={pair2} />
    </div>
  );
}
