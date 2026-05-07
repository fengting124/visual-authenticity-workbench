import type { Metric } from '../../../shared/types/common';
import { SectionCard } from '../../../shared/components/SectionCard';
import { StatusBadge } from '../../../shared/components/StatusBadge';

type MetricCardProps = {
  metric: Metric;
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <SectionCard className="p-4">
      <div className="flex items-start justify-between">
        <p className="text-sm text-forensic-stone">{metric.label}</p>
        <StatusBadge tone={metric.tone}>{metric.tone}</StatusBadge>
      </div>
      <p className="mt-4 text-3xl font-semibold text-forensic-text">{metric.value}</p>
      <p className="mt-2 text-xs text-forensic-stone">{metric.detail}</p>
    </SectionCard>
  );
}
