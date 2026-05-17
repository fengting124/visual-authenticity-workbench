import { demoReverseChain } from '../../data/reverseChain';

type Props = { isActive: boolean; isComplete: boolean };

export function Stage03TamperingExecution({ isActive, isComplete }: Props) {
  const data = demoReverseChain.stage03_tamperingExecution;
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {data.outputs.map((output) => {
        const isPrimary = output.generator === data.primaryOutput;
        return (
          <div
            key={output.generator}
            className={`overflow-hidden rounded border ${
              isPrimary
                ? 'border-forensic-gold/40 bg-forensic-gold/[0.04]'
                : 'border-forensic-gold/[0.08] bg-graphite-900'
            }`}
          >
            <div className="relative aspect-square overflow-hidden bg-graphite-950">
              <img
                src={output.outputImageSrc}
                alt={output.generator}
                className="h-full w-full object-cover opacity-80"
              />
              {isPrimary && (
                <span className="absolute right-2 top-2 rounded-sm bg-forensic-gold px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-graphite-950">
                  PRIMARY
                </span>
              )}
            </div>
            <div className="space-y-1 p-2.5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-forensic-gold">
                {output.generator}
              </p>
              <p className="font-mono text-[9px] text-forensic-stone/60">
                {output.generatorVersion}
              </p>
              <div className="flex items-center justify-between border-t border-forensic-gold/10 pt-1.5">
                <span className="font-mono text-[9px] uppercase text-forensic-stone/60">质量</span>
                <span className="font-mono text-xs font-bold tabular-nums text-forensic-text">
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
  );
}
