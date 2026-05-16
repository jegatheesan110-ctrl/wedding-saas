type StepFormProps = {
  title: string;
  description: string;
  step: number;
  totalSteps: number;
  children: React.ReactNode;
};

export function StepForm({ title, description, step, totalSteps, children }: StepFormProps) {
  return (
    <section className="rounded-[32px] border border-[#e8d7d7] bg-white p-6 shadow-xl shadow-rose-100/50 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-rose-100 pb-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand.rose">Step {step}</p>
          <h2 className="mt-2 font-tamil text-3xl text-slate-900">{title}</h2>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>
        <div className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-brand.rose">{step}/{totalSteps}</div>
      </div>
      {children}
    </section>
  );
}
