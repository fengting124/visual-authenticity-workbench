import type { VideoSegmentEvidence } from '../../samples/types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, toneForStatus } from '../../../shared/utils/format';

type SegmentPanelProps = {
  segment: VideoSegmentEvidence;
  running: boolean;
  reviewed: boolean;
  onRun: () => void;
  onReview: () => void;
};

export function SegmentPanel({ segment, running, reviewed, onRun, onReview }: SegmentPanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-forensic-gold">片段标注</p>
        <h3 className="mt-1 text-lg font-semibold">
          {segment.id} · {segment.label}
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded border border-forensic-gold/[0.08] bg-graphite-850 p-3">
          <p className="text-xs text-forensic-stone">开始时间</p>
          <p className="mt-1">{segment.start}</p>
        </div>
        <div className="rounded border border-forensic-gold/[0.08] bg-graphite-850 p-3">
          <p className="text-xs text-forensic-stone">结束时间</p>
          <p className="mt-1">{segment.end}</p>
        </div>
      </div>
      <p className="text-sm leading-6 text-forensic-stone">{segment.clue}</p>
      <ScoreBar label="片段风险分数" value={segment.riskScore} tone="warning" />
      <StatusBadge tone={reviewed ? 'success' : toneForStatus(segment.reviewStatus)}>
        {reviewed ? '已复核' : statusLabel(segment.reviewStatus)}
      </StatusBadge>
      <div className="grid gap-2">
        <button
          type="button"
          onClick={onRun}
          className="rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
        >
          {running ? '正在处理' : '运行自动标注'}
        </button>
        <button
          type="button"
          onClick={onReview}
          className="rounded-md border border-forensic-olive/40 bg-forensic-olive/10 px-4 py-2 text-sm font-medium text-forensic-olive"
        >
          标记片段已复核
        </button>
      </div>
    </div>
  );
}
