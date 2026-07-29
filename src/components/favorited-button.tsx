import Button from "./elements/button";
import { Star } from "lucide-react";
import { cn } from "@/utils/cn";

export default function FavoritedButton({
  favorited = false,
  disabled = false,
  setFavorited,
}: {
  favorited?: boolean;
  disabled?: boolean;
  setFavorited: (favorited: boolean) => void;
}) {
  function handleClick() {
    setFavorited(!favorited);
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
      FAVORITED
    </Button>
  );
}
