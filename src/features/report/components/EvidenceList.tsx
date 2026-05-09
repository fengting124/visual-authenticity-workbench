type EvidenceListProps = {
  items: Array<{ label: string; value: string }>;
};

export function EvidenceList({ items }: EvidenceListProps) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[220px_1fr] gap-4 rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3 text-sm">
          <p className="text-forensic-stone">{item.label}</p>
          <p className="leading-6 text-forensic-text">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
