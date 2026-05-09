type MetricStatProps = {
  value: string;
  label: string;
  color?: 'cyan' | 'purple' | 'gold';
};

const colorClass: Record<NonNullable<MetricStatProps['color']>, string> = {
  cyan: 'text-forensic-gold',
  purple: 'text-forensic-olive',
  gold: 'text-forensic-warning',
};

export function MetricStat({ value, label, color = 'cyan' }: MetricStatProps) {
  return (
    <div className="rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-6 text-center backdrop-blur-xl">
      <p className={`text-5xl font-bold tabular-nums ${colorClass[color]}`}>{value}</p>
      <p className="mt-3 text-sm text-forensic-stone">{label}</p>
    </div>
  );
}
