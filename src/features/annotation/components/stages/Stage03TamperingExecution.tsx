import { demoReverseChain } from '../../data/reverseChain';

type Props = { isActive: boolean; isComplete: boolean };

export function Stage03TamperingExecution({ isActive, isComplete }: Props) {
  const data = demoReverseChain.stage03_tamperingExecution;
  const source = demoReverseChain.sourceImage;
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  const filterMap: Record<string, string> = {
    'Stable Diffusion 3.5': 'contrast(1.05) saturate(0.95)',
    'HunyuanImage 3.0': 'contrast(1.02) saturate(1.05) hue-rotate(2deg)',
    'Nano Banana Pro': 'contrast(1.0) saturate(1.0)',
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-2 md:grid-cols-[160px_1fr]">
        <div className="rounded border border-forensic-olive/30 bg-forensic-olive/[0.04] p-2">
          <p className="font-mono text-[9px] uppercase tracking-widest text-forensic-olive">原图</p>
          <div className="mt-1.5 overflow-hidden rounded">
            <img src={source.src} alt="原图" className="h-20 w-full object-cover" />
          </div>
          <p className="mt-1 font-mono text-[9px] text-forensic-stone/60">{source.name}</p>
        </div>
        <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3 text-xs">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
            并行篡改 · 多生成器对照
          </p>
          <p className="text-forensic-stone">
            同一份篡改计划(完好鞋面 → 破损鞋面)分别送入 3 个不同生成器,产出 3
            个带"生成器来源"标签的伪造样本。 这些样本将分别用于训练对应的 LoRA 专用专家。
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {data.outputs.map((output) => {
          const isPrimary = output.generator === data.primaryOutput;
          return (
            <div
              key={output.generator}
              className={`overflow-hidden rounded border ${
                isPrimary
                  ? 'border-forensic-gold/50 bg-forensic-gold/[0.04]'
                  : 'border-forensic-gold/[0.08] bg-graphite-900'
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-graphite-950">
                <img
                  src={output.outputImageSrc}
                  alt={output.generator}
                  className="h-full w-full object-cover"
                  style={{ filter: filterMap[output.generator] ?? 'none' }}
                />
                <div
                  className="absolute rounded-sm border"
                  style={{
                    left: '58%',
                    top: '38%',
                    width: '28%',
                    height: '22%',
                    borderColor: isPrimary ? 'rgba(184,138,68,0.7)' : 'rgba(201,90,74,0.5)',
                    background: isPrimary ? 'rgba(184,138,68,0.06)' : 'rgba(201,90,74,0.05)',
                  }}
                />
                {isPrimary && (
                  <span className="absolute right-2 top-2 rounded-sm bg-forensic-gold px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-graphite-950">
                    PRIMARY
                  </span>
                )}
                <span
                  className="absolute bottom-2 left-2 rounded-sm bg-graphite-950/90 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-forensic-risk"
                  style={{ border: '1px solid rgba(201,90,74,0.4)' }}
                >
                  破损区域 · INPAINTED
                </span>
              </div>
              <div className="space-y-1 p-2.5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-forensic-gold">
                  {output.generator}
                </p>
                <p className="font-mono text-[9px] text-forensic-stone/60">
                  {output.generatorVersion}
                </p>
                <div className="grid grid-cols-2 gap-1 border-t border-forensic-gold/10 pt-1.5 font-mono text-[9px]">
                  <span className="text-forensic-stone/60">steps</span>
                  <span className="text-right tabular-nums text-forensic-text">{output.steps}</span>
                  <span className="text-forensic-stone/60">cfg</span>
                  <span className="text-right tabular-nums text-forensic-text">
                    {output.cfgScale}
                  </span>
                  <span className="text-forensic-stone/60">质量</span>
                  <span className="text-right tabular-nums font-bold text-forensic-text">
                    {(output.qualityScore * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-[10px] leading-snug text-forensic-stone">
                  {output.fingerprintSummary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
