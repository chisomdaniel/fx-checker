import { TABS } from "@/data/details";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

type tabs = (typeof TABS)[number];

function Badge({ num }: { num: number }) {
  return (
    <span className="w-5 h-5 tp-6 leading-none select-none bg-lime-800 text-lime-500 rounded-full flex justify-center items-center">
      <p className="translate-y-[0.7px] translate-x-0">{num}</p>
    </span>
  );
}

export default function DetailsTab({
  items,
  counts = [],
  activeTab = "HISTORY",
}: {
  items: typeof TABS;
  counts: number[];
  activeTab: tabs;
}) {
  return (
    <>
      {/* for desktop/tablet screen */}
      <ul className="hidden md:flex flex-row justify-start gap-2 border-b border-b-neutral-600">
        {items.map((item, index) => (
          <li key={index}>
            <a
              className={cn(
                "h-10 tp-3 px-4 flex gap-2 justify-center items-center rounded-sm relative focus:shadow-tab",
                activeTab === item &&
                  "after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-lime-500",
              )}
              href="#"
            >
              {item}
              {counts[index] > 0 && <Badge num={counts[index]} />}
            </a>
          </li>
        ))}
      </ul>
      {/* for mobile screen */}
      <div className="md:hidden relative w-85.75">
        <select
          className={cn(
            "w-full h-10 pl-3 pr-11 rounded-lg bg-neutral-700 border border-neutral-400",
            "appearance-none focus:outline-none focus:shadow-tab",
          )}
          defaultValue={activeTab}
        >
          {items.map((item, index) => (
            <option
              className="border-neutral-600"
              key={item}
              id={index.toString()}
              value={item}
            >
              {item}
              {counts[index] > 0 && <Badge num={counts[index]} />}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
        />
      </div>
    </>
  );
}
