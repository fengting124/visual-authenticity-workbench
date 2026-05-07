import { KeyframeStrip } from '../../annotation/components/KeyframeStrip';
import { EmptyAssetPlaceholder } from '../../../shared/components/EmptyAssetPlaceholder';
import { StatusBadge } from '../../../shared/components/StatusBadge';

export function SampleViewer() {
  return (
    <div className="space-y-4">
      <EmptyAssetPlaceholder
        label="IMG-DEMO-014"
        detail="Current image sample placeholder with local annotation context"
      />
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-forensic-stone">Keyframes</p>
        <KeyframeStrip count={4} />
      </div>
      <div className="space-y-2 rounded-md border border-graphite-800 bg-graphite-850 p-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-forensic-stone">Sample source</span>
          <span>Local benchmark subset</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-forensic-stone">Category</span>
          <span>Indoor scene</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-forensic-stone">Metadata</span>
          <span>Prompt-aligned sample</span>
        </div>
        <StatusBadge tone="warning">Analysis in review</StatusBadge>
      </div>
    </div>
  );
}
