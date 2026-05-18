import { useEffect, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import {
  ReverseChainStage,
  type StageStatus,
} from '../features/annotation/components/ReverseChainStage';
import { VideoStage01Parsing } from '../features/annotation/components/videoStages/VideoStage01Parsing';
import { VideoStage02TextRewriting } from '../features/annotation/components/videoStages/VideoStage02TextRewriting';
import { VideoStage03MultimodalSynthesis } from '../features/annotation/components/videoStages/VideoStage03MultimodalSynthesis';
import { VideoStage04LabelOutput } from '../features/annotation/components/videoStages/VideoStage04LabelOutput';
import { VideoStage05QualityAudit } from '../features/annotation/components/videoStages/VideoStage05QualityAudit';
import { demoVideoReverseChain } from '../features/annotation/data/videoReverseChain';
import { PageShell } from '../layouts/PageShell';

const STAGE_DURATIONS = [2400, 2200, 3000, 2400, 2200];

const STAGE_META = [
  { title: '视频解析与语音提取', subtitle: 'Whisper ASR + 关键帧采样' },
  { title: '文本反向生成', subtitle: 'DeepSeek 反义改写 + 价值评估' },
  { title: '多模态片段合成', subtitle: 'TTS + LipSync + MoviePy 拼接' },
  { title: '四级标签产出', subtitle: '视频级 / 片段级 / 内容级 / 过程级' },
  { title: '检测端识破率自检', subtitle: 'C3D + Transformer + GCN + BMN' },
];

const STAGE_COMPONENTS = [
  VideoStage01Parsing,
  VideoStage02TextRewriting,
  VideoStage03MultimodalSynthesis,
  VideoStage04LabelOutput,
  VideoStage05QualityAudit,
];

export function VideoAnnotationPage() {
  const [running, setRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());

  function startPipeline() {
    setRunning(true);
    setCurrentStage(0);
    setCompletedStages(new Set());
  }

  function resetPipeline() {
    setRunning(false);
    setCurrentStage(-1);
    setCompletedStages(new Set());
  }

  useEffect(() => {
    if (!running || currentStage < 0 || currentStage >= STAGE_DURATIONS.length) return undefined;

    const timer = window.setTimeout(() => {
      setCompletedStages((prev) => new Set([...prev, currentStage]));
      if (currentStage < STAGE_DURATIONS.length - 1) {
        setCurrentStage(currentStage + 1);
      } else {
        setRunning(false);
      }
    }, STAGE_DURATIONS[currentStage]);

    return () => window.clearTimeout(timer);
  }, [running, currentStage]);

  const getStatus = (index: number): StageStatus => {
    if (completedStages.has(index)) return 'complete';
    if (currentStage === index && running) return 'active';
    return 'idle';
  };

  const allComplete = completedStages.size === STAGE_DURATIONS.length;
  const source = demoVideoReverseChain.sourceVideo;

  return (
    <PageShell
      eyebrow="视频反向生成链路标注"
      title="自动产出四级证据链标签"
      description="用反向生成链路造出带四级标签的合成视频样本,为检测端提供可解释训练数据"
    >
      <div className="mb-5 flex items-center justify-between gap-4 rounded-lg border border-forensic-gold/[0.18] bg-graphite-900 px-5 py-3 shadow-archive-card">
        <div className="flex items-center gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-stone/60">
              输入素材
            </p>
            <p className="mt-0.5 font-mono text-sm text-forensic-text">{source.name}</p>
          </div>
          <div className="border-l border-forensic-gold/15 pl-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-stone/60">
              规格
            </p>
            <p className="mt-0.5 font-mono text-sm text-forensic-text">
              {source.duration}s · {source.resolution} · {source.frameRate}fps
            </p>
          </div>
          <div className="border-l border-forensic-gold/15 pl-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-stone/60">
              进度
            </p>
            <p className="mt-0.5 font-mono text-sm font-bold tabular-nums text-forensic-gold">
              {completedStages.size} / 5
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={startPipeline}
            disabled={running}
            className="inline-flex items-center gap-2 rounded border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-forensic-gold transition-colors hover:bg-forensic-gold/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5" />
            {running ? '执行中' : allComplete ? '重新执行' : '启动链路'}
          </button>
          <button
            type="button"
            onClick={resetPipeline}
            className="inline-flex items-center gap-2 rounded border border-forensic-gold/[0.08] bg-graphite-850 px-4 py-2 font-mono text-xs uppercase tracking-widest text-forensic-stone transition-colors hover:border-forensic-gold/25"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            重置
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {STAGE_META.map((meta, index) => {
          const status = getStatus(index);
          const stageNumber = index + 1;
          const StageComponent = STAGE_COMPONENTS[index];

          return (
            <ReverseChainStage
              key={stageNumber}
              index={stageNumber}
              title={meta.title}
              subtitle={meta.subtitle}
              status={status}
              showConnector={index < STAGE_META.length - 1}
            >
              <StageComponent isActive={status === 'active'} isComplete={status === 'complete'} />
            </ReverseChainStage>
          );
        })}
      </div>
    </PageShell>
  );
}
