export default function MarketItem({
  pair,
  price,
  change,
}: {
  pair: string;
  price: string;
  change: string;
}) {
  return (
    <>
      <div className="py-3 px-5 tp-5 flex flex-none items-center justify-between gap-2.5 border-r border-neutral-500">
        <p className="text-neutral-200">{pair}</p>
        <p className="tp-5-medium">{price}</p>
        {change.startsWith("+") ? (
          <p className="text-green-500">▲ {change}%</p>
        ) : (
          <p className="text-red-500">▼ {change}%</p>
        )}
      </div>
    </>
  );
}
