import { TABS } from "@/data/constants/details";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { tabs } from "@/types/details";

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
  setActiveTab,
}: {
  items: typeof TABS;
  counts: number[];
  activeTab: tabs;
  setActiveTab: (tab: tabs) => void;
}) {
  const [tabState, setTabState] = useState<"open" | "close">("close");

  function handleToggle() {
    if (tabState === "close") {
      setTabState("open");
    } else {
      setTabState("close");
    }
  }

  function handleSelect(e: React.MouseEvent<HTMLAnchorElement>, tab: tabs) {
    e.preventDefault();
    setActiveTab(tab);
    setTabState("close");
  }

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
              onClick={(e) => handleSelect(e, item)}
            >
              {item}
              {counts[index] > 0 && <Badge num={counts[index]} />}
            </a>
          </li>
        ))}
      </ul>

      {/* for mobile screen */}
      <div aria-label="dropdown" className="md:hidden relative inline-block">
        <button
          aria-label="dropbtn"
          className={cn(
            "w-full flex justify-between items-center h-10 px-3 rounded-lg bg-neutral-700 border border-neutral-400",
            "focus:outline-none focus:shadow-tab cursor-pointer",
          )}
          onClick={handleToggle}
        >
          <div className="flex gap-2 items-center">
            <span>{activeTab}</span>
            <Badge num={10} />
          </div>
          <ChevronDown />
        </button>
        <div
          aria-label="dropdown content"
          className={cn(
            "hidden absolute w-full overflow-y-auto z-1 p-2 rounded-[10px] bg-neutral-700",
            tabState === "open" ? "block" : "",
          )}
        >
          {items.map((item, idx) => (
            <a
              key={idx}
              onClick={(e) => handleSelect(e, item)}
              className="no-underline flex grow justify-between h-10 px-2 py-2.5 "
            >
              <span>{item}</span>
              {counts[idx] > 0 && <Badge num={counts[idx]} />}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
