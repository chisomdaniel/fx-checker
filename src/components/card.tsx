import { cn } from "@/utils/cn";
import Spinner from "./spinner";

export default function Card({
  className,
  children,
  isLoading,
}: {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-5 py-3 rounded-2xl border border-neutral-600 bg-neutral-700",
        className,
      )}
    >
      {isLoading ? <Spinner /> : children}
    </div>
  );
}
