import DetailsTab from "../details-tab";
import { TABS } from "../../data/constants/details";
import type { tabs } from "@/types/details.type";
import { useState } from "react";
import History from "./history";
import Comparison from "./comparison";
import Favorites from "./favorites";
import Log from "./log";
import db from "@/services/db";

export default function Details({
  baseCurrency,
  quoteCurrency,
  setBaseCurrency,
  setQuoteCurrency,
  baseAmount,
}: {
  baseCurrency: string;
  quoteCurrency: string;
  baseAmount?: number;
  setBaseCurrency: (currency: string) => void;
  setQuoteCurrency: (currency: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<tabs>(
    db.getLastTab() || "HISTORY",
  );
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [logCount, setLogCount] = useState(0);
  const counts = [0, 0, favoriteCount, logCount];

  return (
    <section className="flex flex-col gap-5">
      <DetailsTab
        items={TABS}
        counts={counts}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "HISTORY" && <History base={baseCurrency} quote={quoteCurrency} />}
      {activeTab === "COMPARE" && (
        <Comparison baseCurrency={baseCurrency} baseAmount={baseAmount || 0} />
      )}
      {activeTab === "FAVORITES" && (
        <Favorites
          setBaseCurrency={setBaseCurrency}
          setQuoteCurrency={setQuoteCurrency}
          setFavoriteCount={setFavoriteCount}
        />
      )}
      {activeTab === "LOG" && <Log setLogCount={setLogCount} />}
    </section>
  );
}
