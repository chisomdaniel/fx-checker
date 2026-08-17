import { cn } from "@/utils/cn";
import { Trash } from "lucide-react";

export default function DeleteIcon({ onClick }: { onClick?: () => void }) {
  return (
    <Trash
      size={16}
      className={cn(
        "cursor-pointer hover:fill-neutral-50 w-8 h-8 p-2 rounded-lg border-neutral-500 border focus:outline-none focus:shadow-tab",
      )}
      tabIndex={0}
      onClick={onClick}
    />
  );
}
