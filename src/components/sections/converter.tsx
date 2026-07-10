import InputSection from "../input-section";
import { ArrowUpDown, Star } from "lucide-react";
import Button from "../button";

export default function Converter() {
  return (
    <section>
      <h1 className="tp-2 mb-4">CHECK THE RATE</h1>
      <div className="overflow-hidden rounded-[20px] bg-neutral-700 shadow-[0_12px_40px_0_rgba(0, 0, 0, 0.4)]">
        <div
          aria-label="top section"
          className="p-5 flex flex-col md:flex-row items-stretch gap-6 md:items-center"
        >
          <InputSection title="SEND"></InputSection>
          <div className="rounded-lg self-center md:transform md:rotate-90 bg-neutral-600 border border-neutral-500 w-12 h-12 grid place-items-center">
            <ArrowUpDown />
          </div>
          <InputSection title="RECEIVE"></InputSection>
        </div>

        <div
          aria-label="button section"
          className="px-5 py-4 flex flex-col md:flex-row items-center gap-4 justify-between border-t border-neutral-500 border-dashed"
        >
          <p className="tp-6 md:tp-5">1 USD = 0.8530 EUR</p>

          <div aria-label="button group" className="tp-5-medium flex gap-3">
            <Button className="flex items-center gap-2 bg-lime-500 text-neutral-900 border-lime-500">
              <Star size={16} fill="0A0A0A" />
              FAVORITED
            </Button>
            <Button className="border-lime-500">LOG CONVERSION</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
