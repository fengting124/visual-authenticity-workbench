import { demoVideoReverseChain } from '../../data/videoReverseChain';

type Props = { isActive: boolean; isComplete: boolean };

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = (seconds - m * 60).toFixed(1);
  return `${String(m).padStart(2, '0')}:${s.padStart(4, '0')}`;
}

export function VideoStage01Parsing({ isActive, isComplete }: Props) {
  const data = demoVideoReverseChain.stage01_parsing;
  const source = demoVideoReverseChain.sourceVideo;
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      <div className="space-y-2">
        <div className="aspect-video overflow-hidden rounded border border-forensic-gold/15 bg-graphite-950">
          <video src={source.src} controls className="h-full w-full object-cover" />
        </div>
        <div className="rounded border border-forensic-gold/[0.08] bg-graphite-900 p-2 text-[10px]">
          <p className="font-mono uppercase tracking-widest text-forensic-stone/60">输入素材</p>
          <p className="mt-0.5 font-mono text-forensic-text">{source.name}</p>
          <div className="mt-1 grid grid-cols-2 gap-1 font-mono text-forensic-stone/60">
            <span>时长 {source.duration}s</span>
            <span>{source.resolution}</span>
            <span>{source.frameRate}fps</span>
            <span className="text-forensic-olive">真实捕获</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
              WHISPER ASR · 语音转文本
            </p>
            <span className="font-mono text-[10px] text-forensic-stone/60">
              {data.asrModel} · {data.asrLatency}
            </span>
          </div>
          <div className="space-y-1.5">
            {data.detectedSegments.map((segment) => (
              <div
                key={segment.id}
                className={`flex items-start gap-3 rounded border px-2.5 py-1.5 ${
                  segment.isCandidate
                    ? 'border-forensic-risk/40 bg-forensic-risk/[0.06]'
                    : 'border-forensic-gold/[0.08] bg-graphite-850'
                }`}
              >
                <div className="flex flex-col items-start gap-0.5 font-mono text-[9px] tabular-nums">
                  <span className="text-forensic-gold">{segment.id}</span>
                  <span className="text-forensic-stone/60">
                    {formatTime(segment.startTime)} - {formatTime(segment.endTime)}
                  </span>
                </div>
                <p
                  className={`flex-1 text-[11px] leading-snug ${
                    segment.isCandidate ? 'text-forensic-text' : 'text-forensic-stone'
                  }`}
                >
                  {segment.originalText}
                </p>
                {segment.isCandidate && (
                  <span className="flex-shrink-0 rounded-sm border border-forensic-risk/40 bg-forensic-risk/15 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-forensic-risk">
                    候选
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-forensic-stone/60">
            候选标记:语义信息密度高 · 篡改价值大
          </p>
        </div>

        <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
            关键帧采样
          </p>
          <p className="font-mono text-[10px] text-forensic-text">{data.keyframeSampling}</p>
          <p className="mt-1 text-[10px] text-forensic-stone/60">
            为后续口型同步和时序异常分析提供帧级索引
          </p>
        </div>
      </div>
    </div>
  );
}
