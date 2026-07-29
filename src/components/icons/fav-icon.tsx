import { cn } from "@/utils/cn";
import { Star } from "lucide-react";

export default function FavIcon({
  stared = false,
  setStared,
}: {
  stared?: boolean;
  setStared: (val: boolean) => void;
}) {
  return (
    <div
      tabIndex={0}
      onClick={() => setStared(!stared)}
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
