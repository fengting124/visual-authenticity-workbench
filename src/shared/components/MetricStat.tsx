type MetricStatProps = {
  number: string;
  label: string;
  color?: 'cyan' | 'purple' | 'gold';
};

const colorClass = {
  cyan: 'text-[#00c4ff]',
  purple: 'text-[#7c5bdb]',
  gold: 'text-[#d4a843]',
};

export function MetricStat({ number, label, color = 'cyan' }: MetricStatProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl">
      <p className={`text-5xl font-bold leading-none ${colorClass[color]}`}>{number}</p>
      <p className="mt-3 text-sm text-[#7a8aa0]">{label}</p>
    </div>
  );
}
