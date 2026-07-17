import Card from "../card";
import { PERIODS } from "@/data/constants/details";
import { cn } from "@/utils/cn";

const VALUES = [
  { label: "OPEN", amount: 0.8516 },
  { label: "LAST", amount: 0.8516 },
  { label: "CHANGE", amount: "+0.853", color: "text-green-500" },
  { label: "% CHANGE", amount: "▲ +0.16%", color: "text-green-500" },
];

export default function History({
  currPeriod = "1D",
}: {
  currPeriod?: (typeof PERIODS)[number];
}) {
  return (
    <section className="flex justify-between flex-wrap gap-x-2.5 gap-y-5">
      <div className="tp-4 flex gap-2.5 flex-wrap">
        {VALUES.map((value) => (
          <Card className="w-[166.5px] md:w-35">
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
              currPeriod === value && "bg-neutral-500 text-neutral-50",
            )}
          >
            {value}
          </button>
        ))}
      </div>
    </section>
  );
}
