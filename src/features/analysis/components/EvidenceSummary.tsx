import type { EvidenceItem } from '../types';

type EvidenceSummaryProps = {
  items: EvidenceItem[];
};

export function EvidenceSummary({ items }: EvidenceSummaryProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-md border border-graphite-800 bg-graphite-850 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-forensic-stone">{item.label}</p>
          <p className="mt-2 text-sm leading-6 text-forensic-text">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
