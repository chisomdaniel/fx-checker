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
  const fallbackUrl =
    "https://purecatamphetamine.github.io/country-flag-icons/3x2/XO.svg";
  const addDefaultImg = (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
    ev.currentTarget.src = fallbackUrl;
    // ev.currentTarget?.classList.add("grayscale");
    ev.currentTarget.onerror = null; // prevents looping
  };
  return (
    <img
      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.slice(0, 2).toUpperCase()}.svg`}
      alt={`${alt} flag`}
      className={cn(
        "shrink-0 w-6 h-6 rounded-full overflow-hidden object-cover",
        className,
      )}
      width={size}
      height={size}
      loading="lazy"
      onError={addDefaultImg}
    />
  );
}
