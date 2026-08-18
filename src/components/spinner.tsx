import { cn } from "@/utils/cn";

export default function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "border-4 border-bg-neutral-800 border-t-lime-500 rounded-[50%] w-4 h-4 animate-[spin_0.5s_linear_infinite]",
        className,
      )}
    ></span>
  );
}
