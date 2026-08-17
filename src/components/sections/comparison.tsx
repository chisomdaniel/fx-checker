import CompareItem from "../compare-item";
import { CURRENCIES } from "@/data/constants/compare-currencies";
import { useQuery } from "@tanstack/react-query";
import { getCurrencyRate } from "@/utils/api";
import Spinner from "../spinner";
import EmptyState from "../empty-state";

export default function Comparison({
  baseCurrency,
  baseAmount,
}: {
  baseCurrency: string;
  baseAmount: number;
}) {
  const {
    data: currencies,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "compare-rates",
      baseCurrency,
      ...CURRENCIES.map((currency) => currency.code),
    ],
    queryFn: async () => {
      const rates = await Promise.all(
        CURRENCIES.map(async (currency) => {
          const rate = await getCurrencyRate(baseCurrency, currency.code);
          return { currency, rate };
        }),
      );
      return rates;
    },
  });

  return (
    <section className="p-4 md:p-5 flex flex-col gap-5 rounded-2xl bg-neutral-700 border border-neutral-700">
      <div className="flex flex-col gap-2.5 md:flex-row justify-between">
        <h3 className="tp-4 text-neutral-200">
          MULTI-CURRENCY{" "}
          <span className="tp-3-medium text-neutral-50">
            {baseAmount.toLocaleString()} FROM {baseCurrency.toUpperCase()}
          </span>
        </h3>
        <p className="tp-5 text-neutral-50 opacity-70">
          {CURRENCIES.length} PAIRS
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {baseAmount === 0 ? (
          <EmptyState
            title="No comparison available"
            description="Enter an amount in SEND above to see what your money is worth in other currencies."
          />
        ) : isLoading ? (
          <div className="flex justify-center items-center py-5">
            <Spinner />
          </div>
        ) : isSuccess ? (
          currencies.map(({ currency, rate }) => (
            <CompareItem
              baseCurrency={baseCurrency}
              quoteCurrency={currency.code}
              amount={baseAmount}
              currency={currency.name}
              rate={rate}
              key={currency.code}
            />
          ))
        ) : (
          isError && (
            <p className="tp-5 text-neutral-50 opacity-70">
              Error fetching rates.
            </p>
          )
        )}
      </div>
    </section>
  );
}
