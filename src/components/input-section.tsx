import SelectCurrency from "./elements/select-currency";

export default function InputSection({
  title,
  selectedCurrency,
  amount,
  onChange,
  setCurrency,
  isLoading = false,
}: {
  title: string;
  selectedCurrency: string;
  amount?: number;
  onChange: (value: number | undefined) => void;
  setCurrency: (currency: string) => void;
  isLoading?: boolean;
}) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      onChange(value);
    } else {
      onChange(undefined);
    }
  }

  return (
    <div className="p-5 flex flex-col grow gap-5 rounded-2xl bg-neutral-600 border-neutral-500 border">
      <h3 className="tp-4 text-neutral-100">
        {title} {isLoading && <span> Loading...</span>}
      </h3>
      <div className="flex w-full min-w-0 items-center justify-between gap-3">
        {/* <p className="tp-1-tablet lg:tp-1">1,000</p> */}

        <input
          name="amount"
          id="amount"
          className="no-spinner tp-1-tablet lg:tp-1 w-full min-w-0 flex-1 border-none outline-none bg-transparent"
          type="number"
          placeholder="0.00"
          value={amount ?? ""}
          onChange={handleChange}
          // readOnly={readOnly}
        />

        <SelectCurrency selected={selectedCurrency} setCurrency={setCurrency} />
      </div>
    </div>
  );
}
