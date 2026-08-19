import { useState } from "react";
import Converter from "./converter";
import Details from "./details";
import db from "@/services/db";
import { useEffect } from "react";

export default function Main() {
  const [baseCurrency, setBaseCurrency] = useState<string>(
    db.getLastBaseCurrency() || "usd",
  );
  const [quoteCurrency, setQuoteCurrency] = useState<string>(
    db.getLastQuoteCurrency() || "eur",
  );
  const [baseAmount, setBaseAmount] = useState<number>();
  const [quoteAmount, setQuoteAmount] = useState<number>();

  useEffect(() => {
    db.saveLastBaseCurrency(baseCurrency);
  }, [baseCurrency]);

  useEffect(() => {
    db.saveLastQuoteCurrency(quoteCurrency);
  }, [quoteCurrency]);

  return (
    <main className="flex flex-col items-center">
      <section className="flex flex-col gap-8 px-4 py-8 md:py-12 md:px-6 lg:px-8 max-w-275 w-full">
        <Converter
          baseCurrency={baseCurrency}
          quoteCurrency={quoteCurrency}
          setBaseCurrency={setBaseCurrency}
          setQuoteCurrency={setQuoteCurrency}
          baseAmount={baseAmount}
          quoteAmount={quoteAmount}
          setBaseAmount={setBaseAmount}
          setQuoteAmount={setQuoteAmount}
        />
        <Details
          quoteCurrency={quoteCurrency}
          baseCurrency={baseCurrency}
          baseAmount={baseAmount}
          setBaseCurrency={setBaseCurrency}
          setQuoteCurrency={setQuoteCurrency}
        />
      </section>
    </main>
  );
}
