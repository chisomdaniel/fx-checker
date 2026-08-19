import { SavedPairSchema, LogSchema } from "./db.schema";
import type { SavedPairType, LogType } from "./db.schema";
import type { tabs } from "@/types/details.type";

class DBService {
  static saveLastTab(tab: tabs) {
    localStorage.setItem("lastTab", tab);
  }

  static getLastTab(): tabs | null {
    const tab = localStorage.getItem("lastTab");
    return tab as tabs | null;
  }

  static saveLastBaseCurrency(base: string) {
    localStorage.setItem("baseCurr", base);
  }

  static getLastBaseCurrency(): string | null {
    const base = localStorage.getItem("baseCurr");
    return base;
  }

  static saveLastQuoteCurrency(quote: string) {
    localStorage.setItem("quoteCurr", quote);
  }

  static getLastQuoteCurrency(): string | null {
    const quote = localStorage.getItem("quoteCurr");
    return quote;
  }

  static savePair(base: string, quote: string) {
    const pair: SavedPairType = { base, quote };
    const validation = SavedPairSchema.safeParse(pair);

    if (!validation.success) {
      throw new Error(`Invalid pair: ${validation.error.message}`);
    }

    // save the pair to localStorage
    const savedPairs = DBService.getSavedPairs();
    const exists = savedPairs.find(
      (pair) => pair.base === base && pair.quote === quote,
    );
    if (exists) {
      return; // Pair already exists, do not save again
    }
    savedPairs.push(pair);
    localStorage.setItem("savedPairs", JSON.stringify(savedPairs));
  }

  static isSaved(base: string, quote: string): boolean {
    const savedPairs = DBService.getSavedPairs();
    const exists = savedPairs.find(
      (pair) =>
        pair.base.toLowerCase() === base.toLowerCase() &&
        pair.quote.toLowerCase() === quote.toLowerCase(),
    );
    if (exists) {
      return true; // Pair already exists, do not save again
    }
    return false;
  }

  static getSavedPairs(): SavedPairType[] {
    const savedPairs = localStorage.getItem("savedPairs");
    if (!savedPairs) {
      return [];
    }
    return JSON.parse(savedPairs);
  }

  static removeSavedPair(base: string, quote: string) {
    const savedPairs = DBService.getSavedPairs();
    const updatedPairs = savedPairs.filter(
      (pair) => !(pair.base === base && pair.quote === quote),
    );
    localStorage.setItem("savedPairs", JSON.stringify(updatedPairs));
  }

  static log(data: LogType) {
    const validation = LogSchema.safeParse(data);

    if (!validation.success) {
      throw new Error(`Invalid log data: ${validation.error.message}`);
    }

    // save the log to localStorage
    const logs = DBService.getLogs();
    logs.push(data);
    localStorage.setItem("logs", JSON.stringify(logs));
  }

  static getLogs(): LogType[] {
    const logs = localStorage.getItem("logs");
    if (!logs) {
      return [];
    }
    return JSON.parse(logs);
  }

  static deleteLog(timestamp: number) {
    const logs = DBService.getLogs();
    const updated = logs.filter((item) => item.createdAt !== timestamp);
    localStorage.setItem("logs", JSON.stringify(updated));
  }

  static deleteAllLog() {
    localStorage.setItem("logs", JSON.stringify([]));
  }
}

export default DBService;
