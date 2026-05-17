import { demoReverseChain } from '../../data/reverseChain';
import { SamMaskOverlay } from '../SamMaskOverlay';

type Props = { isActive: boolean; isComplete: boolean };

export function Stage02TargetSelection({ isActive, isComplete }: Props) {
  const data = demoReverseChain.stage02_targetSelection;
  const semantics = demoReverseChain.stage01_semanticInversion;
  const source = demoReverseChain.sourceImage;
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  const targetEntity = semantics.detectedEntities.find(
    (entity) => entity.id === data.selectedTarget,
  );
  const masks = targetEntity
    ? [
        {
          id: targetEntity.id,
          bbox: targetEntity.bbox,
          label: `${targetEntity.name} · SAM`,
          highlighted: true,
        },
      ]
    : [];

  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      <div className="space-y-2">
        <SamMaskOverlay
          imageSrc={source.src}
          imageAlt="SAM 分割目标"
          masks={masks}
          showScanLine={isActive}
          className="aspect-square"
        />
        <div className="rounded border border-forensic-gold/[0.08] bg-graphite-900 p-2 text-[10px]">
          <p className="font-mono uppercase tracking-widest text-forensic-stone/60">SAM 分割目标</p>
          <p className="mt-0.5 font-mono text-forensic-risk">{targetEntity?.name}</p>
          <p className="mt-0.5 font-mono text-forensic-stone/60">
            bbox [{targetEntity?.bbox.join(', ')}]
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3 text-xs">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
            篡改计划
          </p>
          <p className="text-forensic-text">
            目标:
            <span className="ml-1 font-mono text-forensic-gold">{data.plan.originalName}</span>
            <span className="mx-2 text-forensic-stone/40">→</span>
            <span className="font-mono text-forensic-risk">{data.plan.replacementName}</span>
          </p>
          <p className="mt-2 text-[10px] leading-snug text-forensic-stone">
            {data.plan.valueReason}
          </p>
        </div>

        <div className="space-y-1.5 text-xs">
          <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-stone/60">
            篡改方案价值评估(自动)
          </p>
          {data.valueRanking.map((item) => (
            <div
              key={item.replacement}
              className={`flex items-center gap-2 rounded border px-3 py-1.5 ${
                item.level === 'high'
                  ? 'border-forensic-gold/40 bg-forensic-gold/5'
                  : 'border-forensic-stone/15 bg-graphite-900'
              }`}
            >
              <span
                className={`rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase ${
                  item.level === 'high'
                    ? 'bg-forensic-gold text-graphite-950'
                    : item.level === 'medium'
                      ? 'bg-forensic-warning/30 text-forensic-warning'
                      : 'bg-forensic-stone/20 text-forensic-stone'
                }`}
              >
                {item.level}
              </span>
              <span
                className={item.level === 'high' ? 'text-forensic-text' : 'text-forensic-stone'}
              >
                {item.replacement}
              </span>
              <span className="ml-auto text-[10px] text-forensic-stone/60">{item.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
