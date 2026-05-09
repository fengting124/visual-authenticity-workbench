import type { EvidenceSample } from '../../samples/types';
import { StatusBadge } from '../../../shared/components/StatusBadge';

type CandidateEvidencePanelProps = {
  sample: EvidenceSample;
  selectedId: string;
  onSelect: (id: string) => void;
};

export function CandidateEvidencePanel({ sample, selectedId, onSelect }: CandidateEvidencePanelProps) {
  const candidates = sample.type === 'image' ? sample.regions : sample.segments;

  return (
    <div className="space-y-3">
      {candidates.map((candidate) => (
        <button
          type="button"
          key={candidate.id}
          onClick={() => onSelect(candidate.id)}
          className={`w-full rounded-md border p-3 text-left ${
            selectedId === candidate.id
              ? 'border-forensic-warning bg-forensic-warning/10'
              : 'border-graphite-800 bg-graphite-850'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{candidate.id} · {candidate.label}</p>
              <p className="mt-1 text-xs leading-5 text-forensic-stone">{candidate.clue}</p>
            </div>
            <StatusBadge tone="warning">{'riskScore' in candidate ? candidate.riskScore : candidate.confidence}</StatusBadge>
          </div>
        </button>
      ))}
    </div>
  );
}
