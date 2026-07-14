export default function LoggedItem({ id }: { id: string }) {
  return (
    <div
      id={id}
      className="tp-4 flex gap-5 items-center p-3 md:px-4 rounded-[10px] bg-neutral-600 border-neutral-500 border focus:shadow-tab"
      tabIndex={0}
    >
      <div>
        <p>20M</p>
      </div>
    </div>
  );
}
