import { cn } from "@/utils/cn";

export default function Button({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn("rounded-lg px-3 py-2 border text-nowrap", className)}
    >
      {children}
    </button>
  );
}
