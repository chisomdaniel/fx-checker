import { ArrowRight } from "lucide-react";
import FavIcon from "./fav-icon";
import { cn } from "@/utils/cn";

export default function FavouritesItem({
  pair1,
  pair2,
  rate,
  change,
  key,
}: {
  pair1: string;
  pair2: string;
  rate: string;
  change: string;
  key: string;
}) {
  return (
    <div
      key={key}
      className="tp-4 flex gap-5 items-center p-3 md:px-4 rounded-[10px] bg-neutral-600 border-neutral-500 border focus:outline-none focus:shadow-tab"
      tabIndex={0}
    >
      <div className="flex gap-2 grow items-center">
        <p>{pair1}</p>
        <ArrowRight size={12} className="stroke-neutral-200" />
        <p>{pair2}</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="tp-3">{rate}</p>
        <p
          className={cn(
            "tp-6",
            change.startsWith("+") ? "text-green-500" : "text-red-500",
          )}
        >
          {change.startsWith("+") ? "▲" : "▼"} {change}
        </p>
      </div>
      <FavIcon stared={true} />
    </div>
  );
}
