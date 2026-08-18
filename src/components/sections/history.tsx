import Card from "../card";
import { PERIODS } from "@/data/constants/details";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPeriodData } from "@/utils/api";

export default function History({
  base = "USD",
  quote = "EUR",
}: {
  base?: string;
  quote?: string;
}) {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("1M");
  const { data, error, isLoading } = useQuery({
    queryKey: ["periodData", base, quote, period],
    queryFn: () => getPeriodData(base, quote, period),
  });

  if (error) {
    return (
      <div className="flex items-center justify-center bg-neutral-700">
        <p className="text-red-500">Error fetching period data</p>
      </div>
    );
  }

  const values = [
    { label: "OPEN", amount: parseFloat(data?.opening?.toPrecision(4)) },
    { label: "LAST", amount: parseFloat(data?.closing?.toPrecision(4)) },
    {
      label: "CHANGE",
      amount: parseFloat(data?.change?.toPrecision(4) || "0"),
      color: "text-green-500",
    },
    {
      label: "% CHANGE",
      amount:
        "▲ " + parseFloat(data?.percentageChange.toPrecision(4) || "0") + "%",
      color: "text-green-500",
    },
  ];

  return (
    <section className="flex justify-between flex-wrap gap-x-2.5 gap-y-5">
      <div className="tp-4 flex gap-2.5 flex-wrap">
        {values.map((value) => (
          <Card className="w-[166.5px] md:w-35" isLoading={isLoading}>
            <p className="text-neutral-50/70">{value.label}</p>
            <p className={cn("tp-2", value.color && value.color)}>
              {value.amount}
            </p>
          </Card>
        ))}
      </div>

      <div className="flex shrink-0 bg-neutral-700 p-0.5 rounded-lg self-center">
        {PERIODS.map((value) => (
          <button
            className={cn(
              "tp-5 text-center text-neutral-200 px-4 py-3 rounded-lg focus:shadow-period",
              period === value && "bg-neutral-500 text-neutral-50",
            )}
            onClick={() => setPeriod(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </section>
  );
}
