import { useState } from "react";
import Converter from "./converter";
import Details from "./details";

export default function Main() {
  const [baseCurrency, setBaseCurrency] = useState<string>("usd");
  const [quoteCurrency, setQuoteCurrency] = useState<string>("eur");
  const [baseAmount, setBaseAmount] = useState<number>();
  const [quoteAmount, setQuoteAmount] = useState<number>();

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
          baseCurrency={baseCurrency}
          baseAmount={baseAmount}
          setBaseCurrency={setBaseCurrency}
          setQuoteCurrency={setQuoteCurrency}
        />
      </section>
    </main>
  );
}
