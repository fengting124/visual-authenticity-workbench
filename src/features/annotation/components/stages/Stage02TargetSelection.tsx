import { demoReverseChain } from '../../data/reverseChain';

type Props = { isActive: boolean; isComplete: boolean };

export function Stage02TargetSelection({ isActive, isComplete }: Props) {
  const data = demoReverseChain.stage02_targetSelection;
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  return (
    <div className="space-y-3 text-xs">
      <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
          SAM · 篡改计划
        </p>
        <p className="text-forensic-text">
          目标:<span className="ml-1 font-mono text-forensic-gold">{data.plan.originalName}</span>
          <span className="mx-2 text-forensic-stone/40">→</span>
          <span className="font-mono text-forensic-risk">{data.plan.replacementName}</span>
        </p>
      </div>
      <div className="space-y-1.5">
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
              className={`rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase ${
                item.level === 'high'
                  ? 'bg-forensic-gold text-graphite-950'
                  : item.level === 'medium'
                    ? 'bg-forensic-warning/30 text-forensic-warning'
                    : 'bg-forensic-stone/20 text-forensic-stone'
              }`}
            >
              {item.level}
            </span>
            <span className="text-forensic-text">{item.replacement}</span>
            <span className="ml-auto text-[10px] text-forensic-stone/60">{item.reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
