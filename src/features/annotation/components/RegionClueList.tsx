import type { FakeRegion } from '../../samples/types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, toneForStatus } from '../../../shared/utils/format';

type RegionClueListProps = {
  regions: FakeRegion[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function RegionClueList({ regions, selectedId, onSelect }: RegionClueListProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {regions.map((region) => (
        <button
          type="button"
          key={region.id}
          onClick={() => onSelect(region.id)}
          className={`rounded-md border p-4 text-left transition-colors ${
            selectedId === region.id
              ? 'border-forensic-warning bg-forensic-warning/10'
              : 'border-graphite-800 bg-graphite-850 hover:border-forensic-gold/35'
          }`}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">
                {region.id} · {region.label}
              </p>
              <p className="mt-1 text-xs text-forensic-stone">{region.type}</p>
            </div>
            <StatusBadge tone={toneForStatus(region.reviewStatus)}>{statusLabel(region.reviewStatus)}</StatusBadge>
          </div>
          <p className="mb-3 text-sm leading-6 text-forensic-stone">{region.clue}</p>
          <ScoreBar label="区域置信度" value={region.confidence} tone="warning" />
        </button>
      ))}
    </div>
  );
}
