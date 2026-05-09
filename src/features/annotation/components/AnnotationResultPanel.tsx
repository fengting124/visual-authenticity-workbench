import type { EvidenceSample, FakeRegion } from '../../samples/types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, toneForStatus } from '../../../shared/utils/format';

type AnnotationResultPanelProps = {
  sample: EvidenceSample;
  selectedRegion?: FakeRegion;
  running: boolean;
  reviewed: boolean;
  onRun: () => void;
  onReview: () => void;
  onSendToAnalysis: () => void;
};

export function AnnotationResultPanel({
  sample,
  selectedRegion,
  running,
  reviewed,
  onRun,
  onReview,
  onSendToAnalysis,
}: AnnotationResultPanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-forensic-gold">自动标注结果</p>
        <h3 className="mt-1 text-lg font-semibold">{sample.id}</h3>
      </div>

      <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-4">
        <p className="text-xs text-forensic-stone">生成提示词或推断提示词</p>
        <p className="mt-2 text-sm leading-6">{sample.prompt}</p>
      </div>

      {selectedRegion && (
        <div className="rounded-md border border-forensic-gold/35 bg-forensic-gold/10 p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold">
                {selectedRegion.id} · {selectedRegion.label}
              </p>
              <p className="mt-1 text-xs text-forensic-stone">{selectedRegion.type}</p>
            </div>
            <StatusBadge tone={reviewed ? 'success' : toneForStatus(selectedRegion.reviewStatus)}>
              {reviewed ? '已复核' : statusLabel(selectedRegion.reviewStatus)}
            </StatusBadge>
          </div>
          <p className="mb-3 text-sm leading-6 text-forensic-stone">{selectedRegion.clue}</p>
          <ScoreBar label="置信度分数" value={selectedRegion.confidence} tone="warning" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
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
          标记为已复核
        </button>
        <button
          type="button"
          onClick={onSendToAnalysis}
          className="rounded-md border border-forensic-gold/30 bg-forensic-gold/10 px-4 py-2 text-center text-sm font-medium text-forensic-gold"
        >
          发送到分析
        </button>
      </div>
    </div>
  );
}
