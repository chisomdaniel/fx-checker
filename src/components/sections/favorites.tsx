import FavouritesItem from "../favorites-item";

export default function Favorites() {
  return (
    <section className="p-4 md:p-5 flex flex-col gap-5 rounded-2xl bg-neutral-700 border border-neutral-700">
      <div className="flex justify-between items-center">
        <h2>PINNED PAIRS</h2>
        <p className="tp-5 text-neutral-50 opacity-75">10 FAVORITES</p>
      </div>
      <div className="flex flex-col gap-3">
        <FavouritesItem
          change="+0.16%"
          pair1="USD"
          pair2="EUR"
          rate="0.8530"
          key={"eur"}
        />
        <FavouritesItem
          change="-0.22%"
          pair1="USD"
          pair2="GBP"
          rate="1.3575"
          key={"gbp"}
        />
        <FavouritesItem
          change="+0.04%"
          pair1="USD"
          pair2="JPY"
          rate="157.91"
          key="jpy"
        />
      </div>
    </section>
  );
}
