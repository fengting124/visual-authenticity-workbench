import { FileText, Microscope, ScanSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EvidenceSample } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { riskLabel, statusLabel, toneForRisk, toneForStatus } from '../../../shared/utils/format';

type SampleCardProps = {
  sample: EvidenceSample;
  selected: boolean;
  onSelect: (sample: EvidenceSample) => void;
};

export function SampleCard({ sample, selected, onSelect }: SampleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(sample)}
      className={`w-full rounded-lg border p-4 text-left transition-colors ${
        selected
          ? 'border-forensic-gold/50 bg-forensic-gold/10'
          : 'border-graphite-800 bg-graphite-900 hover:border-forensic-gold/30'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-forensic-text">{sample.id}</p>
          <p className="mt-1 text-xs text-forensic-stone">{sample.title}</p>
        </div>
        <StatusBadge tone={toneForRisk(sample.riskLevel)}>{riskLabel(sample.riskLevel)}</StatusBadge>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <StatusBadge tone={toneForStatus(sample.annotationStatus)}>
          {statusLabel(sample.annotationStatus)}
        </StatusBadge>
        <StatusBadge tone={toneForStatus(sample.analysisStatus)}>
          {statusLabel(sample.analysisStatus)}
        </StatusBadge>
        <StatusBadge tone={toneForStatus(sample.reportStatus)}>
          {statusLabel(sample.reportStatus)}
        </StatusBadge>
      </div>
      <div className="mt-4">
        <ScoreBar label="风险分数" value={sample.riskScore} tone={sample.riskScore > 65 ? 'warning' : 'olive'} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Link to={sample.type === 'image' ? '/annotation/image' : '/annotation/video'} className="inline-flex items-center justify-center gap-1 rounded border border-graphite-800 px-2 py-2 text-xs text-forensic-stone">
          <ScanSearch className="h-3.5 w-3.5" />
          标注
        </Link>
        <Link to="/analysis/sample" className="inline-flex items-center justify-center gap-1 rounded border border-graphite-800 px-2 py-2 text-xs text-forensic-stone">
          <Microscope className="h-3.5 w-3.5" />
          分析
        </Link>
        <Link to="/report" className="inline-flex items-center justify-center gap-1 rounded border border-graphite-800 px-2 py-2 text-xs text-forensic-stone">
          <FileText className="h-3.5 w-3.5" />
          报告
        </Link>
      </div>
    </button>
  );
}
