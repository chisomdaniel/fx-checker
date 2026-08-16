import Button from "./elements/button";
import { Star } from "lucide-react";
import { cn } from "@/utils/cn";
import db from "@/services/db";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function FavoritedButton({
  baseCurrency = "usd",
  quoteCurrency = "eur",
  favorited = false,
  disabled = false,
}: {
  baseCurrency: string;
  quoteCurrency: string;
  favorited?: boolean;
  disabled?: boolean;
}) {
  function handlePair(base: string, quote: string) {
    if (db.isSaved(base, quote)) {
      db.removeSavedPair(base, quote);
    } else {
      db.savePair(base, quote);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => Promise.resolve(handlePair(baseCurrency, quoteCurrency)),
    onSuccess: () => {
      // Invalidate the query to refetch the saved pairs
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  function handleClick() {
    if (disabled) return;
    mutation.mutate();
  }

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 bg-neutral-600 border-neutral-500 text-neutral-50 focus:outline-none focus:shadow-tab",
        !favorited &&
          !disabled &&
          "hover:bg-neutral-500 hover:border-neutral-400",
        favorited &&
          !disabled &&
          "bg-lime-500 border-lime-500 text-neutral-900 hover:opacity-80",
        disabled && "border-neutral-300 text-neutral-200 cursor-not-allowed",
      )}
    >
      <Star
        size={16}
        className={cn(
          "stroke-neutral-50",
          favorited === true && "stroke-neutral-900 fill-neutral-900",
        )}
      />
      {mutation.isPending ? "SAVING..." : favorited ? "FAVORITED" : "FAVORITE"}
    </Button>
  );
}
