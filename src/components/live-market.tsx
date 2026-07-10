import { Dot } from "lucide-react";
import MarketItem from "./market-item";

export default function LiveMarket() {
  return (
    <>
      <div className="flex items-center overflow-x-hidden bg-neutral-700">
        <div className="px-2 md:px-4 py-3 bg-lime-500 flex flex-none items-center justify-center gap-2 text-neutral-900 tp-6 md:tp-5-medium">
          <Dot size={6} strokeWidth={20} stroke="#0A0A0A" />
          <p>LIVE MARKETS</p>
        </div>
        <div className="ticker overflow-x-hidden">
          <div className="ticker-track flex items-center">
            <MarketItem pair="EUR/USD" price="157.91" change="+0.25" />
            <MarketItem pair="GBP/USD" price="1.2750" change="-0.01" />
            <MarketItem pair="USD/JPY" price="150.25" change="+0.50" />
            <MarketItem pair="AUD/USD" price="0.6520" change="+0.15" />
            <MarketItem pair="USD/CAD" price="1.3580" change="-0.02" />
            <MarketItem pair="AUD/USD" price="0.6520" change="+0.15" />
            <MarketItem pair="USD/CAD" price="1.3580" change="-0.02" />
          </div>
        </div>
      </div>
    </>
  );
}
