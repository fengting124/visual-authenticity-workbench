import { demoReverseChain } from '../../data/reverseChain';

type Props = { isActive: boolean; isComplete: boolean };

export function Stage01SemanticInversion({ isActive, isComplete }: Props) {
  const data = demoReverseChain.stage01_semanticInversion;
  const showContent = isActive || isComplete;

  return (
    <div className="space-y-3 text-xs">
      {!showContent && <p className="text-forensic-stone/40">等待启动 · 阶段尚未执行</p>}
      {showContent && (
        <>
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
            <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
              CLIP · 场景分类
            </p>
            <p className="text-forensic-text">
              {data.clipScene.label}
              <span className="ml-2 font-mono tabular-nums text-forensic-gold">
                {data.clipScene.confidence.toFixed(2)}
              </span>
            </p>
          </div>
          <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
              Grounding DINO · 物体清单 ({data.detectedEntities.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {data.detectedEntities.map((entity) => (
                <span
                  key={entity.id}
                  className="rounded-sm border border-forensic-gold/15 bg-graphite-850 px-2 py-0.5 font-mono text-[10px] text-forensic-stone"
                >
                  {entity.name}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
