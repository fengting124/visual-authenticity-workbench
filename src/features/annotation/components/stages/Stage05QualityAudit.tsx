import { demoReverseChain } from '../../data/reverseChain';

type Props = { isActive: boolean; isComplete: boolean };

export function Stage05QualityAudit({ isActive, isComplete }: Props) {
  const data = demoReverseChain.stage05_qualityAudit;
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  const verdictColor = {
    easy_catch: '#6F8F72',
    uncertain: '#D2A64A',
    missed: '#C95A4A',
  };
  const verdictLabel = {
    easy_catch: '识破',
    uncertain: '不确定',
    missed: '未识破',
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        {data.detectorEvaluations.map((evaluation) => (
          <div
            key={evaluation.detectorName}
            className="flex items-center gap-3 rounded border border-forensic-gold/[0.08] bg-graphite-900 px-3 py-1.5"
          >
            <span className="text-xs text-forensic-text">{evaluation.detectorName}</span>
            <div className="ml-auto flex items-center gap-3">
              <span className="font-mono text-xs tabular-nums text-forensic-stone">
                {(evaluation.confidence * 100).toFixed(0)}%
              </span>
              <span
                className="rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase"
                style={{
                  background: `${verdictColor[evaluation.verdict]}20`,
                  color: verdictColor[evaluation.verdict],
                  border: `1px solid ${verdictColor[evaluation.verdict]}40`,
                }}
              >
                {verdictLabel[evaluation.verdict]}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <div className="rounded border border-forensic-warning/40 bg-forensic-warning/[0.05] p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-warning">
            难度归档
          </p>
          <p className="mt-1 font-mono text-xl font-bold text-forensic-warning">
            {data.difficultyTier}
          </p>
          <p className="mt-1 text-[10px] text-forensic-stone">{data.bucket}</p>
        </div>
        {data.triggerEvolution && (
          <div className="rounded border border-forensic-risk/40 bg-forensic-risk/[0.05] p-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-risk">
              演化告警 · EVOLUTION ALERT
            </p>
            <p className="mt-1.5 text-[10px] leading-snug text-forensic-text">
              {data.evolutionMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
