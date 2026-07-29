import { cn } from "@/utils/cn";

export default function Button({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn("rounded-lg px-3 py-2 border text-nowrap", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
