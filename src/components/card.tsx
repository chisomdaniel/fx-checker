import { cn } from "@/utils/cn";

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-5 py-3 rounded-2xl border border-neutral-600 bg-neutral-700",
        className,
      )}
    >
      {children}
    </div>
  );
}
