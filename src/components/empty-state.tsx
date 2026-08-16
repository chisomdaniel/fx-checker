export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
      <h1 className="tp-2 text-neutral-100">{title}</h1>
      <p className="tp-4 text-neutral-200">{description}</p>
    </div>
  );
}
