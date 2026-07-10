import Card from "../card";
import { PERIODS } from "@/data/details";
import { cn } from "@/utils/cn";

export default function DetailsStats({
  currPeriod = "1D",
}: {
  currPeriod?: (typeof PERIODS)[number];
}) {
  return (
    <section className="flex justify-between flex-wrap gap-x-2.5 gap-y-5">
      <div className="tp-4 text-neutral-50/70 flex gap-4 flex-wrap">
        <Card className="w-35">
          <p>OPEN</p>
          <p className="tp-2 text-neutral-50">0.8516</p>
        </Card>
        <Card className="w-35">
          <p>LAST</p>
          <p className="tp-2 text-neutral-50">0.8530</p>
        </Card>
        <Card className="w-35">
          <p>CHANGE</p>
          <p className="tp-2 text-green-500">+0.0014</p>
        </Card>
        <Card className="w-35">
          <p>% CHANGE</p>
          <p className="tp-2 text-green-500">▲ +0.16%</p>
        </Card>
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
