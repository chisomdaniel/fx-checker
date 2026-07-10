import DetailsTab from "../details-tab";
import { TABS } from "../../data/details";
import DetailsStats from "./details-stats";

export default function Details() {
  const counts = [4, 0, 0, 5];
  return (
    <section className="flex flex-col gap-5">
      <DetailsTab items={TABS} counts={counts} activeTab="HISTORY" />
      <DetailsStats currPeriod="1M" />
    </section>
  );
}
