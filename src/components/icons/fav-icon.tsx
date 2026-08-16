import db from "@/services/db";
import { cn } from "@/utils/cn";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function FavIcon({
  baseCurrency,
  quoteCurrency,
}: {
  baseCurrency: string;
  quoteCurrency: string;
}) {
  const { data: stared } = useQuery({
    queryKey: ["favorites", baseCurrency, quoteCurrency],
    queryFn: () => Promise.resolve(db.isSaved(baseCurrency, quoteCurrency)),
  });

  function handleStar(base: string, quote: string) {
    if (db.isSaved(base, quote)) {
      db.removeSavedPair(base, quote);
    } else {
      db.savePair(base, quote);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => Promise.resolve(handleStar(baseCurrency, quoteCurrency)),
    onSuccess: () => {
      // Invalidate the query to refetch the saved pairs
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation(); // Prevent the click event from propagating to the parent div
    mutation.mutate();
  }

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      aria-label="icon"
      className={cn(
        "flex justify-center items-center shrink-0 w-8 h-8 p-2 rounded-lg bg-neutral-600 border-neutral-500 border",
        "hover:bg-neutral-500 hover:border-neutral-400 focus:outline-none focus:shadow-tab focus:border-neutral-500 hover:cursor-pointer",
        stared ? "border-lime-500" : "",
      )}
    >
      <Star
        size={16}
        className={cn(
          "stroke-neutral-50",
          stared ? "fill-lime-500 stroke-lime-500" : "",
        )}
      />
    </div>
  );
}
