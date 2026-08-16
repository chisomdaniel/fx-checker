import CompareItem from "../compare-item";

export default function Comparison() {
  return (
    <section className="p-4 md:p-5 flex flex-col gap-5 rounded-2xl bg-neutral-700 border border-neutral-700">
      <div className="flex flex-col gap-2.5 md:flex-row justify-between">
        <h3 className="tp-4 text-neutral-200">
          MULTI-CURRENCY{" "}
          <span className="tp-3-medium text-neutral-50">1,000 FROM USD</span>
        </h3>
        <p className="tp-5 text-neutral-50 opacity-70">8 PAIRS</p>
      </div>
      <div className="flex flex-col gap-3">
        <CompareItem
          countryCode="NGN"
          amount={1000}
          currency="Nigerian Naira"
          rate={1350}
          key="ngn"
        />
        <CompareItem
          countryCode="USD"
          amount={1000}
          currency="US Dollar"
          rate={765}
          key="usd"
        />
        <CompareItem
          countryCode="GBP"
          amount={1000}
          currency="British Pound"
          rate={556}
          key="gbp"
        />
      </div>
    </section>
  );
}
