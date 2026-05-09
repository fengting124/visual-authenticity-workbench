import type { EvidenceSample } from '../../samples/types';
import { KeyframeStrip } from '../../annotation/components/KeyframeStrip';
import { EmptyAssetPlaceholder } from '../../../shared/components/EmptyAssetPlaceholder';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { VideoPlayer } from '../../../shared/components/VideoPlayer';
import { riskLabel, toneForRisk } from '../../../shared/utils/format';

type SampleViewerProps = {
  sample: EvidenceSample;
  imageSrc?: string | null;
};

export function SampleViewer({ sample, imageSrc }: SampleViewerProps) {
  const keyframes = sample.segments.flatMap((segment) => segment.keyframes).slice(0, 6);
  const resolvedImageSrc = imageSrc ?? sample.assetSrc;

  return (
    <div className="space-y-4">
      {sample.type === 'video' ? (
        <VideoPlayer src={sample.videoSrc} />
      ) : resolvedImageSrc ? (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
          <img src={resolvedImageSrc} alt="检测样本" className="h-56 w-full object-contain" />
        </div>
      ) : (
        <EmptyAssetPlaceholder label={sample.id} detail="当前样本占位，使用自动标注输出的候选证据" />
      )}

      {sample.type === 'video' && (
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[#7a8aa0]">关键帧</p>
          <KeyframeStrip frames={keyframes} />
        </div>
      )}

      <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-[#7a8aa0]">样本来源</span>
          <span>{sample.source === 'generated' ? '生成' : sample.source === 'real' ? '真实' : '未知'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#7a8aa0]">类别</span>
          <span>{sample.category}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#7a8aa0]">生成器</span>
          <span>{sample.generator ?? '未知'}</span>
        </div>
        <StatusBadge tone={toneForRisk(sample.riskLevel)}>{riskLabel(sample.riskLevel)}</StatusBadge>
      </div>
    </div>
  );
}
