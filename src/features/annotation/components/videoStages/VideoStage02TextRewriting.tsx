import { demoVideoReverseChain } from '../../data/videoReverseChain';

type Props = { isActive: boolean; isComplete: boolean };

export function VideoStage02TextRewriting({ isActive, isComplete }: Props) {
  const data = demoVideoReverseChain.stage02_textRewriting;
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  return (
    <div className="space-y-3">
      <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
            DEEPSEEK · 反义改写
          </p>
          <span className="font-mono text-[10px] text-forensic-stone/60">{data.rewriteLLM}</span>
        </div>

        <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr]">
          <div className="rounded border border-forensic-olive/30 bg-forensic-olive/[0.04] p-2.5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-forensic-olive">
              原始文本
            </p>
            <p className="mt-1 text-sm leading-snug text-forensic-text">{data.plan.originalText}</p>
          </div>
          <div className="flex flex-col items-center justify-center font-mono text-[10px] text-forensic-stone/60">
            <span className="text-base text-forensic-gold">→</span>
            <span className="mt-0.5 uppercase tracking-widest">{data.plan.rewriteType}</span>
          </div>
          <div className="rounded border border-forensic-risk/35 bg-forensic-risk/[0.04] p-2.5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-forensic-risk">
              改写后文本
            </p>
            <p className="mt-1 text-sm leading-snug text-forensic-text">
              {data.plan.rewrittenText}
            </p>
          </div>
        </div>

        <div className="mt-2 rounded bg-graphite-950 px-2.5 py-1.5">
          <p className="text-[10px] leading-snug text-forensic-stone">{data.plan.valueReason}</p>
        </div>
      </div>

      <div className="space-y-1.5 text-xs">
        <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-stone/60">
          篡改方案价值评估(自动)
        </p>
        {data.valueRanking.map((item) => (
          <div
            key={item.type}
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
            <span className={item.level === 'high' ? 'text-forensic-text' : 'text-forensic-stone'}>
              {item.type}
            </span>
            <span className="ml-auto text-[10px] text-forensic-stone/60">{item.reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
