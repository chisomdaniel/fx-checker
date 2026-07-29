import * as z from "zod";

export const SavedPair = z.object({
  base: z
    .string()
    .min(1, "Base currency is required")
    .length(3, "Currency code must be 3 characters"),
  quote: z
    .string()
    .min(1, "Quote currency is required")
    .length(3, "Currency code must be 3 characters"),
});

export const Log = z.object({
  baseCurrency: z
    .string()
    .min(1, "Base currency is required")
    .length(3, "Currency code must be 3 characters"),
  quoteCurrency: z
    .string()
    .min(1, "Quote currency is required")
    .length(3, "Currency code must be 3 characters"),
  baseAmount: z
    .number()
    .min(0, "Base amount must be greater than or equal to 0"),
  quoteAmount: z
    .number()
    .min(0, "Quote amount must be greater than or equal to 0"),
  createdAt: z.date().default(() => new Date()),
});

export type SavedPairType = z.infer<typeof SavedPair>;
export type LogType = z.infer<typeof Log>;
