export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.5em] text-brand.gold">{eyebrow}</p>
      <h2 className="mt-4 font-tamil text-4xl text-white sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base text-white/70 sm:text-lg">{description}</p> : null}
    </div>
  );
}
