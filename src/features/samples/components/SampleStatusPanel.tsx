import type { EvidenceSample } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, riskLabel, toneForRisk, toneForStatus } from '../../../shared/utils/format';

type SampleStatusPanelProps = {
  sample: EvidenceSample;
};

export function SampleStatusPanel({ sample }: SampleStatusPanelProps) {
  return (
    <div className="space-y-3 rounded-md border border-graphite-800 bg-graphite-850 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{sample.id}</p>
          <p className="mt-1 text-xs text-forensic-stone">{sample.title}</p>
        </div>
        <StatusBadge tone={toneForRisk(sample.riskLevel)}>{riskLabel(sample.riskLevel)}</StatusBadge>
      </div>
      <ScoreBar label="风险分数" value={sample.riskScore} tone={sample.riskScore > 65 ? 'warning' : 'olive'} />
      <div className="grid grid-cols-3 gap-2 text-xs">
        <StatusBadge tone={toneForStatus(sample.annotationStatus)}>
          标注 {statusLabel(sample.annotationStatus)}
        </StatusBadge>
        <StatusBadge tone={toneForStatus(sample.analysisStatus)}>
          分析 {statusLabel(sample.analysisStatus)}
        </StatusBadge>
        <StatusBadge tone={toneForStatus(sample.reportStatus)}>
          报告 {statusLabel(sample.reportStatus)}
        </StatusBadge>
      </div>
    </div>
  );
}
