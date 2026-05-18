import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { demoVideoReverseChain } from '../../data/videoReverseChain';

type Props = { isActive: boolean; isComplete: boolean };

export function VideoStage04LabelOutput({ isActive, isComplete }: Props) {
  const data = demoVideoReverseChain.stage04_labels;
  const [jsonExpanded, setJsonExpanded] = useState(true);
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  const levels = [
    { id: '视频级', name: '全局信息', color: '#B88A44', items: 5 },
    { id: '片段级', name: '时空范围', color: '#6F8F72', items: data.segment_level.length },
    { id: '内容级', name: '改写对照', color: '#D2A64A', items: 4 },
    { id: '过程级', name: '生成链路', color: '#C95A4A', items: 7 },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {levels.map((level) => (
          <div
            key={level.id}
            className="rounded border bg-graphite-900 p-2.5"
            style={{ borderColor: `${level.color}40` }}
          >
            <p
              className="font-mono text-[10px] font-bold tabular-nums"
              style={{ color: level.color }}
            >
              {level.id}
            </p>
            <p className="mt-0.5 text-[10px] text-forensic-stone">{level.name}</p>
            <p
              className="mt-1 font-mono text-base font-bold tabular-nums"
              style={{ color: level.color }}
            >
              {level.items}
              <span className="ml-1 text-[9px] font-normal text-forensic-stone/60">字段</span>
            </p>
          </div>
        ))}
      </div>

      <div className="rounded border border-forensic-gold/15 bg-graphite-950">
        <button
          type="button"
          onClick={() => setJsonExpanded(!jsonExpanded)}
          className="flex w-full items-center justify-between px-3 py-2 transition-colors hover:bg-graphite-900"
        >
          <div className="flex items-center gap-2">
            {jsonExpanded ? (
              <ChevronDown className="h-3 w-3 text-forensic-gold" />
            ) : (
              <ChevronRight className="h-3 w-3 text-forensic-gold" />
            )}
            <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
              EVIDENCE JSON · {data.evidence_id}
            </p>
          </div>
          <span className="font-mono text-[9px] text-forensic-stone/60">{data.media_type}</span>
        </button>
        {jsonExpanded && (
          <pre className="overflow-x-auto px-3 pb-3 font-mono text-[10px] leading-relaxed text-forensic-stone">
            {JSON.stringify(
              {
                video_level: data.video_level,
                segment_level: data.segment_level,
                content_level: data.content_level,
                process_level: data.process_level,
              },
              null,
              2,
            )}
          </pre>
        )}
      </div>
    </div>
  );
}
