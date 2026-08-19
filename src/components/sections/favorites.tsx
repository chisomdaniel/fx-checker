import FavouritesItem from "../icons/favorites-item";
import { useQuery } from "@tanstack/react-query";
import DB from "@/services/db";
import EmptyState from "../empty-state";
import Spinner from "../spinner";
import { useEffect } from "react";

export default function Favorites({
  setBaseCurrency,
  setQuoteCurrency,
  setFavoriteCount,
}: {
  setBaseCurrency: (currency: string) => void;
  setQuoteCurrency: (currency: string) => void;
  setFavoriteCount: (count: number) => void;
}) {
  const {
    data: favorites,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: DB.getSavedPairs,
  });

  useEffect(
    () => setFavoriteCount(favorites?.length || 0),
    [favorites?.length, setFavoriteCount],
  );

  return (
    <section className="p-4 md:p-5 flex flex-col gap-5 rounded-2xl bg-neutral-700 border border-neutral-700">
      <div className="flex justify-between items-center">
        <h2>PINNED PAIRS</h2>
        <p className="tp-5 text-neutral-50 opacity-75">
          {favorites?.length || 0} FAVORITES
        </p>
      </div>
      {isLoading ? (
        <Spinner />
      ) : isSuccess && favorites.length <= 0 ? (
        <EmptyState
          title="No pinned pairs yet"
          description="Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row."
        />
      ) : isSuccess ? (
        <div className="flex flex-col gap-3">
          {favorites.map((pair, idx) => (
            <FavouritesItem
              pair1={pair.base}
              pair2={pair.quote}
              idx={idx}
              setBaseCurrency={setBaseCurrency}
              setQuoteCurrency={setQuoteCurrency}
              key={String(idx)}
            />
          ))}
        </div>
      ) : (
        <p>Error loading favorites</p>
      )}
    </section>
  );
}
