import { SavedPairSchema } from "./db.schema";
import type { SavedPairType } from "./db.schema";

class DBService {
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
      (pair) => pair.base === base && pair.quote === quote,
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
}

export default DBService;
