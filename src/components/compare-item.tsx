import Flags from "./flag";
import FavIcon from "./fav-icon";

export default function CompareItem({
  countryCode,
  currency,
  rate,
  amount,
  favorite,
  id,
}: {
  countryCode: string;
  currency: string;
  rate: number;
  amount: number;
  favorite?: boolean;
  id: string;
}) {
  return (
    <div
      id={id}
      className="flex gap-2.5 md:gap-5 items-center p-3 md:px-4 rounded-[10px] bg-neutral-600 border-neutral-500 border focus:shadow-tab"
      tabIndex={0}
    >
      <Flags countryCode={countryCode.slice(0, 2)} alt={currency} />
      <div className="grow flex flex-col gap-1.5">
        <p className="tp-4">{countryCode}</p>
        <p className="tp-5 text-neutral-200">{currency}</p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <p className="tp-3">{(amount * rate).toLocaleString()}</p>
        <p className="tp-6 text-neutral-200">@ {rate.toLocaleString()}</p>
      </div>

      <FavIcon stared={favorite} />
    </div>
  );
}
