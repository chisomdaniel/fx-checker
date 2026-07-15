import SelectCurrency from "./select-currency";

export default function InputSection({ title }: { title: string }) {
  return (
    <div className="p-5 flex flex-col grow gap-5 rounded-2xl bg-neutral-600 border-neutral-500 border">
      <h3 className="tp-4 text-neutral-100">{title}</h3>
      <div className="flex justify-between">
        <p className="tp-1-tablet lg:tp-1">1,000</p>

        <SelectCurrency selected="usd" />
      </div>
    </div>
  );
}
