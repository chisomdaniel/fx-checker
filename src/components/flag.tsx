import { cn } from "@/utils/cn";

export default function Flags({
  countryCode,
  alt = "Country flag",
  className = "",
  size = "24",
}: {
  countryCode: string;
  alt: string;
  className?: string;
  size?: string;
}) {
  const imageUrl = new URL(
    `../assets/images/flags/${countryCode.toLowerCase()}.webp`,
    import.meta.url,
  ).href;

  return (
    <img
      src={imageUrl}
      alt={`${alt} flag`}
      className={cn("shrink-0 w-6 h-6 rounded-full overflow-hidden", className)}
      width={size}
      height={size}
      loading="lazy"
    />
  );
}
