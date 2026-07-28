import InputSection from "../input-section";
import { ArrowUpDown, Star } from "lucide-react";
import Button from "../elements/button";
import { useState } from "react";
import { getCurrencyRate } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { convertCurrency } from "@/utils/converter";

export default function Converter() {
  const [baseAmount, setBaseAmount] = useState<number>();
  const [quoteAmount, setQuoteAmount] = useState<number>();
  const [baseCurrency, setBaseCurrency] = useState<string>("usd");
  const [quoteCurrency, setQuoteCurrency] = useState<string>("eur");
  const [lastEdited, setLastEdited] = useState<"base" | "quote">("base");

  const { data: baseRate, isSuccess } = useQuery({
    queryKey: ["currency-rate", baseCurrency, quoteCurrency],
    queryFn: () => getCurrencyRate(baseCurrency, quoteCurrency),
  });

  const convertedBaseAmount =
    lastEdited === "quote" && quoteAmount != null && baseRate != null
      ? convertCurrency(quoteAmount, 1 / baseRate)
      : baseAmount;

  const convertedQuoteAmount =
    lastEdited === "base" && baseAmount != null && baseRate != null
      ? convertCurrency(baseAmount, baseRate)
      : quoteAmount;

  function handleBaseAmountChange(value: number | undefined) {
    setLastEdited("base");
    setBaseAmount(value);
  }

  function handleQuoteAmountChange(value: number | undefined) {
    setLastEdited("quote");
    setQuoteAmount(value);
  }

  function handleSwap() {
    const temp = baseCurrency;
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(temp);
  }

  return (
    <section>
      <h1 className="tp-2 mb-4">CHECK THE RATE</h1>
      <div className="rounded-[20px] bg-neutral-700 shadow-[0_12px_40px_0_rgba(0, 0, 0, 0.4)]">
        <div
          aria-label="top section"
          className="p-5 flex flex-col md:flex-row items-stretch gap-6 md:items-center"
        >
          <InputSection
            title="SEND"
            selectedCurrency={baseCurrency}
            amount={convertedBaseAmount}
            onChange={handleBaseAmountChange}
            setCurrency={setBaseCurrency}
            isLoading={!isSuccess}
          />
          <div
            tabIndex={0}
            onClick={handleSwap}
            className="cursor-pointer focus:shadow-tab focus:outline-none rounded-lg self-center md:transform md:rotate-90 bg-neutral-600 border border-neutral-500 w-12 h-12 grid place-items-center"
          >
            <ArrowUpDown />
          </div>
          <InputSection
            title="RECEIVE"
            selectedCurrency={quoteCurrency}
            amount={convertedQuoteAmount}
            onChange={handleQuoteAmountChange}
            setCurrency={setQuoteCurrency}
            // readOnly={true}
          />
        </div>

        <div
          aria-label="button section"
          className="px-5 py-4 flex flex-col md:flex-row items-center gap-4 justify-between border-t border-neutral-500 border-dashed"
        >
          <p className="tp-6 md:tp-5">
            1 {baseCurrency.toUpperCase()} = {baseRate?.toFixed(4)}{" "}
            {quoteCurrency.toUpperCase()}
          </p>

          <div aria-label="button group" className="tp-5-medium flex gap-3">
            <Button className="flex items-center gap-2 bg-lime-500 text-neutral-900 border-lime-500">
              <Star size={16} fill="0A0A0A" />
              FAVORITED
            </Button>
            <Button className="border-lime-500">LOG CONVERSION</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
