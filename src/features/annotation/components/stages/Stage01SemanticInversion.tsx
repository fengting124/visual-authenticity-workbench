import { demoReverseChain } from '../../data/reverseChain';
import { SamMaskOverlay } from '../SamMaskOverlay';

type Props = { isActive: boolean; isComplete: boolean };

export function Stage01SemanticInversion({ isActive, isComplete }: Props) {
  const data = demoReverseChain.stage01_semanticInversion;
  const source = demoReverseChain.sourceImage;
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      <div className="space-y-2">
        <SamMaskOverlay
          imageSrc={source.src}
          imageAlt="原图"
          masks={data.detectedEntities.map((entity) => ({
            id: entity.id,
            bbox: entity.bbox,
            label: entity.name,
            highlighted: false,
          }))}
          showScanLine={isActive}
          className="aspect-square"
        />
        <div className="rounded border border-forensic-gold/[0.08] bg-graphite-900 p-2 text-[10px]">
          <p className="font-mono uppercase tracking-widest text-forensic-stone/60">输入素材</p>
          <p className="mt-0.5 font-mono text-forensic-text">{source.name}</p>
          <p className="mt-0.5 font-mono text-forensic-stone/60">{source.resolution}</p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
            BLIP-2 · 反推描述
          </p>
          <p className="text-forensic-text">{data.blipDescriptionZh}</p>
          <p className="mt-1 font-mono text-[10px] text-forensic-stone/60">
            {data.blipDescription}
          </p>
        </div>
        <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
            CLIP · 场景分类
          </p>
          <div className="space-y-1.5">
            {data.clipScene.candidates.map((candidate) => (
              <div key={candidate.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className={
                      candidate.selected
                        ? 'font-semibold text-forensic-gold'
                        : 'text-forensic-stone'
                    }
                  >
                    {candidate.name}
                  </span>
                  <span
                    className={`font-mono tabular-nums ${candidate.selected ? 'text-forensic-gold' : 'text-forensic-stone/60'}`}
                  >
                    {candidate.score.toFixed(2)}
                  </span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-graphite-800">
                  <div
                    className={`h-full rounded-full ${candidate.selected ? 'bg-forensic-gold' : 'bg-forensic-stone/30'}`}
                    style={{ width: `${candidate.score * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
            Grounding DINO · 物体清单 ({data.detectedEntities.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {data.detectedEntities.map((entity) => (
              <span
                key={entity.id}
                className={`rounded-sm border px-2 py-0.5 font-mono text-[10px] ${
                  entity.isCandidate
                    ? 'border-forensic-risk/40 bg-forensic-risk/10 text-forensic-risk'
                    : 'border-forensic-gold/15 bg-graphite-850 text-forensic-stone'
                }`}
              >
                {entity.name}
                {entity.isCandidate && <span className="ml-1 text-[9px]">候选</span>}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-forensic-stone/60">
            候选标记表示语义距离边缘且篡改价值高。
          </p>
        </div>
      </div>
    </div>
  );
}
