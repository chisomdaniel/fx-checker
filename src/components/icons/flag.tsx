import { cn } from "@/utils/cn";
import { useState } from "react";

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
  const [hasError, setHasError] = useState(false);

  const fallbackUrl =
    "https://purecatamphetamine.github.io/country-flag-icons/3x2/XO.svg";
  return (
    <img
      src={
        hasError
          ? fallbackUrl
          : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.slice(0, 2).toUpperCase()}.svg`
      }
      alt={`${alt} flag`}
      className={cn(
        "shrink-0 w-6 h-6 rounded-full overflow-hidden object-cover",
        className,
      )}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
