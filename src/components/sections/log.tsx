import LogItem from "../log-item";

export default function Log() {
  return (
    <section className="p-4 md:p-5 flex flex-col gap-5 rounded-2xl bg-neutral-700 border border-neutral-700">
      <div className="flex flex-col gap-2.5 md:flex-row justify-between">
        <p className="tp-3-medium">CONVERSION LOG</p>
        <div className="flex justify-between gap-4 items-center">
          <p className="opacity-70 tp-5">8 LOGGED</p>
          <button className="border border-neutral-400 rounded-lg px-3 py-2 bg-neutral-600 tp-5 text-neutral-200">
            CLEAR ALL
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <LogItem
          amountFrom={1000.0}
          amountTo={853.02}
          pair1="USD"
          pair2="EUR"
          time="20M"
          key="0"
        />
        <LogItem
          amountFrom={1000.0}
          amountTo={853.02}
          pair1="USD"
          pair2="EUR"
          time="20M"
          key="0"
        />
        <LogItem
          amountFrom={1000.0}
          amountTo={853.02}
          pair1="USD"
          pair2="EUR"
          time="20M"
          key="0"
        />
        <LogItem
          amountFrom={1000.0}
          amountTo={853.02}
          pair1="USD"
          pair2="EUR"
          time="20M"
          key="0"
        />
      </div>
    </section>
  );
}
