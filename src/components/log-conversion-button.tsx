import Button from "./elements/button";
import { cn } from "@/utils/cn";
import { Check } from "lucide-react";

export default function LogConversionButton({
  state,
  setState,
}: {
  state?: "pressed" | "disabled" | "default";
  setState: (state: "pressed" | "disabled" | "default") => void;
}) {
  function handleStateChange() {
    if (state != "disabled") {
      setState(state === "pressed" ? "default" : "pressed");
    }
  }

  return (
    <Button
      onClick={handleStateChange}
      className={cn(
        "w-33 border-lime-500 text-neutral-50 border outline-none cursor-pointer",
        state === "default" &&
          " focus:bg-neutral-700 focus:shadow-tab hover:bg-lime-800 ",
        state === "disabled" &&
          "border-neutral-300 text-neutral-200 cursor-not-allowed",
        state === "pressed" &&
          "flex items-center justify-center gap-2 bg-lime-500 border-lime-500 text-neutral-900",
      )}
    >
      {state === "pressed" ? (
        <>
          <Check size={16} /> <span>Logged</span>
        </>
      ) : (
        "LOG CONVERSION"
      )}
    </Button>
  );
}
