import Button from "./elements/button";
import { cn } from "@/utils/cn";
import { Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import db from "@/services/db";
import type { LogType } from "@/services/db.schema";

export default function LogConversionButton({
  baseCurrency,
  quoteCurrency,
  baseAmount,
  quoteAmount,
  state,
  setState,
}: {
  baseCurrency: string;
  quoteCurrency: string;
  baseAmount: number | undefined;
  quoteAmount: number | undefined;
  state?: "pressed" | "disabled" | "default";
  setState: (state: "pressed" | "disabled" | "default") => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: LogType) => Promise.resolve(db.log(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });

  function handleStateChange() {
    if (state != "disabled" && state != "pressed") {
      setState("pressed");
      mutation.mutate({
        baseCurrency,
        quoteCurrency,
        baseAmount: baseAmount || 0,
        quoteAmount: quoteAmount || 0,
        createdAt: Date.now(),
      });
      setTimeout(() => {
        setState("default");
      }, 2000);
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
