export default function MarketItem({
  pair,
  change,
  percentageChange,
}: {
  pair: string;
  change: number;
  percentageChange: number;
}) {
  return (
    <>
      <div className="py-3 px-5 tp-6 md:tp-5 flex flex-none items-center justify-between gap-2.5 border-r border-neutral-500">
        <p className="text-neutral-200">{pair}</p>
        <p className="md:tp-5-medium">{parseFloat(change.toPrecision(5))}</p>
        {percentageChange > 0 ? (
          <p className="text-green-500">▲ {parseFloat(percentageChange.toPrecision(5))}%</p>
        ) : (
          <p className="text-red-500">▼ {parseFloat(percentageChange.toPrecision(5))}%</p>
        )}
      </div>
    </>
  );
}
