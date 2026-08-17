import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LogItem from "../log-item";
import db from "@/services/db";
import EmptyState from "../empty-state";
import { formatTime } from "@/utils/time";
import Spinner from "../spinner";

export default function Log({
  setLogCount,
}: {
  setLogCount: (count: number) => void;
}) {
  const {
    data: logs,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: () => Promise.resolve(db.getLogs()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => Promise.resolve(db.deleteAllLog()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });

  setLogCount(logs?.length || 0);

  return (
    <section className="p-4 md:p-5 flex flex-col gap-5 rounded-2xl bg-neutral-700 border border-neutral-700">
      <div className="flex flex-col gap-2.5 md:flex-row justify-between">
        <p className="tp-3-medium">CONVERSION LOG</p>
        <div className="flex justify-between gap-4 items-center">
          <p className="opacity-70 tp-5">
            {isSuccess ? logs.length : 0} LOGGED
          </p>
          <button
            className="border border-neutral-400 rounded-lg px-3 py-2 bg-neutral-600 tp-5 text-neutral-200 cursor-pointer hover:bg-neutral-500"
            onClick={() => mutation.mutate()}
          >
            CLEAR ALL
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <Spinner />
        ) : isSuccess && logs.length === 0 ? (
          <EmptyState
            title="No conversions logged yet"
            description="Every conversion is recorded here automatically when you tap LOG CONVERSION. Your log is private to this session and this browser."
          />
        ) : isSuccess ? (
          logs.map((log, key) => (
            <LogItem
              amountFrom={log.baseAmount}
              amountTo={log.quoteAmount}
              pair1={log.baseCurrency.toUpperCase()}
              pair2={log.quoteCurrency.toUpperCase()}
              time={formatTime(log.createdAt)}
              timestamp={log.createdAt}
              key={key.toString()}
            />
          ))
        ) : (
          <p>Error loading logs</p>
        )}
      </div>
    </section>
  );
}
