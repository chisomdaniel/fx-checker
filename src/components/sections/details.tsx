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
  setBaseCurrency,
  setQuoteCurrency,
}: {
  setBaseCurrency: (currency: string) => void;
  setQuoteCurrency: (currency: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<tabs>(
    db.getLastTab() || "HISTORY",
  );
  const counts = [4, 0, 0, 5];

  return (
    <section className="flex flex-col gap-5">
      <DetailsTab
        items={TABS}
        counts={counts}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "HISTORY" && <History currPeriod="1M" />}
      {activeTab === "COMPARE" && <Comparison />}
      {activeTab === "FAVORITES" && (
        <Favorites
          setBaseCurrency={setBaseCurrency}
          setQuoteCurrency={setQuoteCurrency}
        />
      )}
      {activeTab === "LOG" && <Log />}
    </section>
  );
}
