import type { ReportSectionData } from '../types';

type ReportSectionProps = {
  section: ReportSectionData;
};

export function ReportSection({ section }: ReportSectionProps) {
  return (
    <section className="border-t border-forensic-gold/[0.08] py-5">
      <h3 className="mb-4 text-base font-semibold text-forensic-text">{section.title}</h3>
      <div className="grid gap-3">
        {section.rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[220px_1fr] gap-4 text-sm">
            <p className="text-forensic-stone">{row.label}</p>
            <p className="leading-6 text-forensic-text">{row.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
