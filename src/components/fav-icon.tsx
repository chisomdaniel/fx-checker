import { cn } from "@/utils/cn";
import { Star } from "lucide-react";

export default function FavIcon({ stared = false }: { stared?: boolean }) {
  return (
    <div
      aria-label="icon"
      className={cn(
        "flex justify-center items-center shrink-0 w-8 h-8 p-2 rounded-lg border-neutral-500 border",
        stared ? "border-lime-500" : "",
      )}
    >
      <Star
        size={16}
        className={cn(stared ? "fill-lime-500 stroke-lime-500" : "")}
      />
    </div>
  );
}
