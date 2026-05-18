import { demoVideoReverseChain } from '../../data/videoReverseChain';

type Props = { isActive: boolean; isComplete: boolean };

function formatTime(seconds: number) {
  return `${seconds.toFixed(2)}s`;
}

export function VideoStage03MultimodalSynthesis({ isActive, isComplete }: Props) {
  const data = demoVideoReverseChain.stage03_synthesis;
  const tamperedVideo = demoVideoReverseChain.tamperedVideo;
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  const totalDuration = demoVideoReverseChain.sourceVideo.duration;
  const tamperedStart = data.tamperedSegment.timeRange[0];
  const tamperedEnd = data.tamperedSegment.timeRange[1];
  const leftPct = (tamperedStart / totalDuration) * 100;
  const widthPct = ((tamperedEnd - tamperedStart) / totalDuration) * 100;

  return (
    <div className="space-y-3">
      <div className="rounded border border-forensic-gold/15 bg-graphite-900 p-3">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
          多模态合成管线 · MULTIMODAL SYNTHESIS PIPELINE
        </p>
        <div className="grid grid-cols-4 gap-2 text-[10px]">
          {[
            { label: 'TTS 语音合成', value: data.pipeline.ttsModel },
            { label: '口型同步', value: data.pipeline.lipSyncModel },
            { label: '片段拼接', value: 'MoviePy' },
            { label: '过渡帧插值', value: 'RIFE-NCNN' },
          ].map((stage, index) => (
            <div key={stage.label} className="relative flex flex-col rounded bg-graphite-950 p-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-forensic-stone/60">
                {String(index + 1).padStart(2, '0')} · {stage.label}
              </span>
              <span className="mt-1 truncate font-mono text-[10px] text-forensic-gold">
                {stage.value}
              </span>
              {index < 3 && (
                <span className="pointer-events-none absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-forensic-gold/40 md:block">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_280px]">
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-stone/60">
            篡改时间轴 · 红色区间 = 替换片段
          </p>
          <div className="relative h-12 overflow-hidden rounded border border-forensic-gold/15 bg-graphite-950">
            <div className="absolute inset-x-2 inset-y-3 rounded bg-graphite-850" />
            <div
              className="absolute inset-y-3 rounded bg-forensic-risk/30 ring-1 ring-forensic-risk/60"
              style={{
                left: `calc(${leftPct}% + 8px)`,
                width: `calc(${widthPct}% - 16px)`,
                minWidth: '20px',
              }}
            >
              <span className="absolute -top-4 left-0 whitespace-nowrap font-mono text-[9px] text-forensic-risk">
                {formatTime(tamperedStart)} - {formatTime(tamperedEnd)} · 已替换
              </span>
            </div>
            {data.audioBoundaries.map((boundary, index) => {
              const pct = (boundary.startTime / totalDuration) * 100;
              return (
                <div
                  key={`${boundary.type}-${index}`}
                  className="absolute inset-y-3 w-0.5 bg-forensic-warning"
                  style={{ left: `calc(${pct}% + 8px)` }}
                >
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] text-forensic-warning">
                    淡入/出
                  </span>
                </div>
              );
            })}
            <div className="absolute inset-x-2 bottom-1 flex justify-between font-mono text-[8px] tabular-nums text-forensic-stone/40">
              <span>0s</span>
              <span>{(totalDuration / 2).toFixed(1)}s</span>
              <span>{totalDuration}s</span>
            </div>
          </div>

          <div className="rounded border border-forensic-gold/[0.08] bg-graphite-900 p-2.5">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-forensic-stone/60">
              合成质量元数据
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
              <span className="text-forensic-stone">替换时长</span>
              <span className="text-right font-mono tabular-nums text-forensic-text">
                {data.pipeline.durationSec.toFixed(1)}s
              </span>
              <span className="text-forensic-stone">质量评分</span>
              <span className="text-right font-mono tabular-nums font-bold text-forensic-text">
                {(data.pipeline.qualityScore * 100).toFixed(0)}%
              </span>
              <span className="text-forensic-stone">指纹</span>
              <span className="text-right text-[10px] leading-snug text-forensic-stone/80">
                {data.pipeline.fingerprintSummary}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-stone/60">
            伪造视频预览(替换后)
          </p>
          <div className="aspect-video overflow-hidden rounded border border-forensic-risk/40 bg-graphite-950">
            <video src={tamperedVideo.src} controls className="h-full w-full object-cover" />
          </div>
          <p className="font-mono text-[10px] text-forensic-risk">含 3-6s 替换片段</p>
        </div>
      </div>
    </div>
  );
}
