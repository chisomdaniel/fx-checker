import DetailsTab from "../details-tab";
import { TABS } from "../../data/details";
import History from "./history";
import Comparison from "./comparison";
import Favorites from "./favorites";
import Log from "./log";

export default function Details() {
  const counts = [4, 0, 0, 5];
  return (
    <section className="flex flex-col gap-5">
      <DetailsTab items={TABS} counts={counts} activeTab="HISTORY" />
      <History currPeriod="1M" />
      <Comparison />
      <Favorites />
      <Log />
    </section>
  );
}
