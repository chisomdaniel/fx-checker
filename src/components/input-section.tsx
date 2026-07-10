export default function InputSection({ title }: { title: string }) {
  return (
    <div className="p-5 flex flex-col grow gap-5 rounded-2xl bg-neutral-600 border-neutral-500 border">
      <h3 className="tp-4 text-neutral-100">{title}</h3>
      <div className="flex justify-between">
        <p className="tp-1-tablet lg:tp-1">1,000</p>
        <select className="flex item-start gap-2 tp-4 text-center p-2.5 bg-neutral-500 border border-neutral-400 rounded-lg">
          <option value="usd" selected>
            USD
          </option>
          <option value="eur">EUR</option>
          <option value="gbp">GBP</option>
        </select>
      </div>
    </div>
  );
}
