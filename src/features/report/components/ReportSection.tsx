import type { ReportSectionData } from '../types';

type ReportSectionProps = {
  section: ReportSectionData;
};

export function ReportSection({ section }: ReportSectionProps) {
  const match = section.title.match(/^(\d+)\.\s/);
  const num = match?.[1];
  const titleText = match ? section.title.replace(/^\d+\.\s/, '') : section.title;

  return (
    <section className="mt-2 border-t border-forensic-gold/15 py-6">
      <div className="mb-4 flex items-center gap-3">
        {num && (
          <span className="flex items-baseline gap-0.5 font-mono">
            <span className="text-2xl font-bold tabular-nums text-forensic-gold">{num.padStart(2, '0')}</span>
            <span className="text-2xl font-bold text-forensic-gold/40">.</span>
          </span>
        )}
        <h3 className="text-base font-semibold text-forensic-text">{titleText}</h3>
      </div>
      <div className="grid gap-2">
        {section.rows.map((row) => (
          <div key={row.label} className="group grid grid-cols-[200px_1fr] gap-4 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-graphite-800/50">
            <p className="text-forensic-stone">{row.label}</p>
            <p className="leading-6 text-forensic-text">{row.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
