import { ArrowRight } from "lucide-react";
import DeleteIcon from "./delete-icon";

export default function LogItem({
  key,
  time,
  pair1,
  pair2,
  amountFrom,
  amountTo,
}: {
  key: string;
  time: string;
  pair1: string;
  pair2: string;
  amountFrom: number;
  amountTo: number;
}) {
  return (
    <div
      key={key}
      className="flex gap-2.5 md:gap-4 items-center p-3 md:p-4 rounded-[10px] bg-neutral-600 border-neutral-500 border focus:outline-none focus:shadow-tab"
      tabIndex={0}
    >
      <div className="flex flex-col gap-1 grow md:flex-row md:gap-4">
        <p className="tp-4 text-neutral-200 md:w-16">{time}</p>
        <div className="flex gap-2 grow items-center tp-4">
          <p>{pair1}</p>
          <ArrowRight size={12} className="stroke-neutral-200" />
          <p>{pair2}</p>
        </div>
      </div>
      <div>
        <p className="tp-3 text-neutral-100">{amountFrom}</p>
        <p className="tp-3 text-lime-500">{amountTo}</p>
      </div>
      <DeleteIcon />
    </div>
  );
}
