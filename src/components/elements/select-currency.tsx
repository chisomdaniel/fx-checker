import Flags from "../icons/flag";
import { Triangle } from "lucide-react";
import { Search } from "lucide-react";
import { Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "@/utils/api";
import { POPULAR_CURRENCIES } from "@/data/constants/currencies";
import Spinner from "../spinner";

export default function SelectCurrency({
  selected,
  setCurrency,
}: {
  selected: string;
  setCurrency: (currency: string) => void;
}) {
  const [toggle, setToggle] = useState<"open" | "close">("close");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
    select: (data) =>
      data.map((each) => ({ name: each.name, code: each.iso_code })),
  });

  function handleHandleToggle() {
    if (toggle === "close") {
      setToggle("open");
    } else {
      setToggle("close");
    }
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setToggle("close");
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!isSuccess) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Error loading currency</p>;
  }

  const popularCurrencies = new Set(POPULAR_CURRENCIES);
  const popular = data.filter(
    (each) =>
      popularCurrencies.has(each.code.toLowerCase()) &&
      (each.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        each.name.toLowerCase().includes(searchTerm.toLowerCase())),
  );
  const other = data.filter(
    (each) =>
      (each.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        each.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !popularCurrencies.has(each.code.toLowerCase()),
  );

  return (
    <div ref={wrapperRef} className="inline-block relative ">
      <button
        tabIndex={0}
        className="cursor-pointer flex items-center p-2.5 gap-2 rounded-lg border border-neutral-400 bg-neutral-500 focus:shadow-tab focus:outline-none"
        onClick={handleHandleToggle}
      >
        <Flags countryCode={selected} alt={`${selected} currency`} />
        <span>{selected.toUpperCase()}</span>
        <Triangle
          size={10}
          strokeWidth={0}
          className=" fill-white transform rotate-180"
        />
      </button>

      <div
        className={cn(
          "hidden absolute top-13.75 right-0 z-1 w-94 p-2 rounded-lg bg-neutral-600 border border-neutral-400 shadow-dropdown",
          toggle === "open" ? "block" : "",
        )}
      >
        <div
          aria-label="search bar"
          className="flex items-center gap-2.5 p-3 rounded-md border border-neutral-200"
        >
          <Search size={16} />
          <input
            className="tp-5 text-neutral-200 border-none outline-none"
            type="text"
            placeholder="Search currencies ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="max-h-98.5 flex flex-col gap-1 overflow-clip overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-600">
          {popular.length > 0 && (
            <>
              <h3 className="flex justify-between p-2 tp-5 text-neutral-200 border-b-neutral-500 border-b">
                <span>POPULAR</span>
                <span>{popular.length}</span>
              </h3>
              <ul>
                {popular.map((each, idx) => (
                  <li
                    key={idx}
                    className="px-2 py-3 cursor-pointer hover:bg-neutral-500 flex justify-between items-center rounded-sm border border-neutral-600 bg-neutral-600"
                    onClick={() => setCurrency(each.code)}
                    tabIndex={0}
                  >
                    <div className="flex gap-3 items-center">
                      <Flags
                        countryCode={each.code}
                        alt={each.code + " flag"}
                      />
                      <p className="tp-4">{each.code}</p>
                      <p className="tp-5 text-neutral-200">{each.name}</p>
                    </div>

                    {selected.toLowerCase() === each.code.toLowerCase() && (
                      <Check size={16} />
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
          <h3 className="flex justify-between p-2 tp-5 text-neutral-200 border-b-neutral-500 border-b">
            <span>OTHER CURRENCIES</span>
            <span>{other.length}</span>
          </h3>
          <ul>
            {other.map((each, idx) => (
              <li
                key={idx}
                className="px-2 py-3 cursor-pointer hover:bg-neutral-500 flex justify-between items-center rounded-sm border border-neutral-600 bg-neutral-600"
                onClick={() => setCurrency(each.code)}
                tabIndex={0}
              >
                <div className="flex gap-3 items-center">
                  <Flags countryCode={each.code} alt={each.code + " flag"} />
                  <p className="tp-4">{each.code}</p>
                  <p className="tp-5 text-neutral-200">{each.name}</p>
                </div>

                {selected.toLowerCase() === each.code.toLowerCase() && (
                  <Check size={16} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
