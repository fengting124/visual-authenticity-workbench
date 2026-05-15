import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { AnnotationLogStream } from '../features/annotation/components/AnnotationLogStream';
import { KeyframeStrip, type KeyframeItem } from '../features/annotation/components/KeyframeStrip';
import { SegmentPanel } from '../features/annotation/components/SegmentPanel';
import { VideoTimeline } from '../features/annotation/components/VideoTimeline';
import { activeVideoSample, samples } from '../features/samples/data';
import { findImportedSample } from '../features/samples/importedSamples';
import type { VideoSegmentEvidence } from '../features/samples/types';
import { PageShell } from '../layouts/PageShell';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { VideoPlayer } from '../shared/components/VideoPlayer';
import { readFileAsDataUrl, readLocalAsset, saveLocalAsset } from '../shared/utils/localSample';

const VIDEO_ANNOTATION_STAGES = [
  {
    title: '视频读取',
    output: '抽取帧序列与时间轴',
    durationMs: 700,
    logLines: ['[INIT] 视频解码器就绪', '[INFO] 帧率: 25fps', '[INFO] 演示视频时长: 00:08'],
  },
  {
    title: '片段扫描',
    output: '发现可疑时间片段',
    durationMs: 1400,
    logLines: ['[SCAN] 时序一致性分析启动', '[SCAN] 00:01 → 00:03: 帧间运动向量异常', '[SCAN] 00:06 → 00:07: 光流一致性缺口', '[SCAN] 压缩痕迹检测完成', '[WARN] 发现 2 个可疑片段'],
  },
  {
    title: '关键帧定位',
    output: '输出关键帧 KF-01 至 KF-06',
    durationMs: 800,
    logLines: ['[KF] 定位关键帧 KF-01, KF-02, KF-03', '[KF] 定位关键帧 KF-04, KF-05, KF-06', '[OK] 关键帧提取完成'],
  },
  {
    title: '片段证据生成',
    output: '生成风险分数与复核状态',
    durationMs: 600,
    logLines: ['[CLUE] S-01: 时序边界漂移 → 风险 72%', '[CLUE] S-02: 运动一致性缺口 → 风险 79%', '[SAVE] 写入候选证据队列'],
  },
] as const;

function parseTimecode(value: string) {
  const parts = value.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return Number(value) || 0;
}

function formatTimecode(seconds: number) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remaining = safeSeconds - minutes * 60;
  return `${String(minutes).padStart(2, '0')}:${remaining.toFixed(2).padStart(5, '0')}`;
}

function alignDemoSegments(segments: VideoSegmentEvidence[], isDemoVideo: boolean) {
  if (!isDemoVideo) return segments;
  return segments.map((segment, index) => {
    if (index === 0) {
      return {
        ...segment,
        start: '00:01.00',
        end: '00:03.00',
        clue: '演示视频 1-3 秒片段存在时序边界漂移和运动一致性异常。',
      };
    }
    if (index === 1) {
      return {
        ...segment,
        start: '00:06.00',
        end: '00:07.00',
        clue: '演示视频 6-7 秒片段存在短时光流缺口和压缩痕迹异常。',
      };
    }
    return segment;
  });
}

function buildKeyframeItems(segment: VideoSegmentEvidence | undefined, captures: Record<string, string>) {
  if (!segment) return [];
  const start = parseTimecode(segment.start);
  const end = parseTimecode(segment.end);
  const span = Math.max(end - start, 0.2);

  return segment.keyframes.map((id, index) => {
    const ratio = segment.keyframes.length <= 1 ? 0.5 : index / (segment.keyframes.length - 1);
    const time = Math.min(start + span * ratio, Math.max(start, end - 0.05));
    return {
      id,
      src: captures[id],
      timeLabel: formatTimecode(time),
    };
  });
}

export function VideoAnnotationPage() {
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeVideoSample.id;
  const importedSample = findImportedSample(sampleId);
  const videoSample =
    importedSample?.type === 'video'
      ? importedSample
      : samples.find((sample) => sample.id === sampleId && sample.type === 'video') ?? activeVideoSample;
  const isDemoVideo = videoSample.id === 'VID-DEMO-001';
  const displaySegments = useMemo(() => alignDemoSegments(videoSample.segments, isDemoVideo), [isDemoVideo, videoSample.segments]);
  const [localVideo, setLocalVideo] = useState(() => {
    const stored = readLocalAsset('video');
    return {
      dataUrl: stored.dataUrl ?? videoSample.videoSrc ?? null,
      name: stored.name ?? '片段伪造视频.mp4',
    };
  });
  const videoSrc = localVideo.dataUrl ?? videoSample.videoSrc ?? null;

  const [selectedSegmentId, setSelectedSegmentId] = useState(displaySegments[0]?.id ?? '');
  const selectedSegment = useMemo(
    () => displaySegments.find((segment) => segment.id === selectedSegmentId) ?? displaySegments[0],
    [displaySegments, selectedSegmentId],
  );
  const [selectedFrame, setSelectedFrame] = useState(selectedSegment?.keyframes[0] ?? '');
  const [keyframeCaptures, setKeyframeCaptures] = useState<Record<string, string>>({});
  const [videoDuration, setVideoDuration] = useState(isDemoVideo ? 8 : 30);
  const [running, setRunning] = useState(false);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const reviewed = reviewedIds.has(selectedSegmentId);
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [videoLogLines, setVideoLogLines] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);

  const visibleSegmentCount = complete || activeIndex >= 2 ? displaySegments.length : 0;
  const visibleFrameCount =
    complete || activeIndex >= 3
      ? (selectedSegment?.keyframes.length ?? 0)
      : activeIndex >= 2
        ? Math.ceil((selectedSegment?.keyframes.length ?? 0) / 2)
        : 0;
  const keyframeItems: KeyframeItem[] = useMemo(
    () => buildKeyframeItems(selectedSegment, keyframeCaptures),
    [keyframeCaptures, selectedSegment],
  );

  useEffect(() => {
    if (!videoSrc || !selectedSegment) return undefined;

    let cancelled = false;
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const start = parseTimecode(selectedSegment.start);
    const end = parseTimecode(selectedSegment.end);
    const span = Math.max(end - start, 0.2);
    let captureIndex = 0;
    const targets = selectedSegment.keyframes.map((id, index) => {
      const ratio = selectedSegment.keyframes.length <= 1 ? 0.5 : index / (selectedSegment.keyframes.length - 1);
      return {
        id,
        time: Math.min(start + span * ratio, Math.max(start, end - 0.05)),
      };
    });

    function captureAt(index: number) {
      if (cancelled || !context) return;
      const target = targets[index];
      if (!target) return;
      captureIndex = index;
      video.currentTime = Math.min(target.time, Math.max(video.duration - 0.05, 0));
    }

    video.preload = 'auto';
    video.muted = true;
    video.src = videoSrc;

    video.onloadedmetadata = () => {
      if (cancelled || !context) return;
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 180;
      captureAt(0);
    };

    video.onseeked = () => {
      if (cancelled || !context) return;
      const safeIndex = captureIndex;
      const target = targets[safeIndex];
      if (!target) return;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      setKeyframeCaptures((previous) => ({ ...previous, [target.id]: dataUrl }));
      captureAt(safeIndex + 1);
    };

    video.load();

    return () => {
      cancelled = true;
      video.removeAttribute('src');
      video.load();
    };
  }, [selectedSegment, videoSrc]);

  function runAnnotation() {
    setRunning(true);
    setComplete(false);
    setActiveIndex(0);
    setVideoLogLines([]);
    setScanProgress(0);

    let elapsed = 0;
    VIDEO_ANNOTATION_STAGES.forEach((stage, stageIndex) => {
      window.setTimeout(() => {
        setActiveIndex(stageIndex);
        if (stageIndex === VIDEO_ANNOTATION_STAGES.length - 1) {
          window.setTimeout(() => {
            setRunning(false);
            setComplete(true);
            setScanProgress(100);
          }, stage.durationMs);
        }
      }, elapsed);

      const lineInterval = stage.durationMs / (stage.logLines.length + 1);
      stage.logLines.forEach((line, lineIndex) => {
        window.setTimeout(() => {
          setVideoLogLines((prev) => [...prev, line]);
        }, elapsed + lineInterval * (lineIndex + 1));
      });

      if (stageIndex === 1) {
        const progressInterval = stage.durationMs / 20;
        for (let step = 1; step <= 20; step++) {
          window.setTimeout(() => {
            setScanProgress(step * 5);
          }, elapsed + progressInterval * step);
        }
      }

      elapsed += stage.durationMs;
    });
  }

  function handleVideo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (dataUrl) => {
      saveLocalAsset('video', dataUrl, file.name);
      setLocalVideo({ dataUrl, name: file.name });
    });
  }

  return (
    <PageShell eyebrow="视频标注" title="视频片段证据发现" description="">
      <PipelineStatusBar steps={['读取', '扫描', '定位', '生成']} currentStep={activeIndex} complete={complete} />

      <SectionCard title="视频输入与处理过程" eyebrow={videoSample.id} className="mt-5">
        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <label className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-4">
            <p className="text-sm font-semibold">选择视频文件</p>
            <p className="mt-2 text-xs text-forensic-stone">{localVideo.name}</p>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideo}
              className="mt-4 block w-full text-xs text-forensic-stone file:mr-3 file:rounded file:border-0 file:bg-forensic-olive/10 file:px-3 file:py-2 file:text-forensic-olive"
            />
            <button
              type="button"
              onClick={runAnnotation}
              className="mt-4 w-full rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
            >
              {running ? '正在处理' : '开始处理'}
            </button>
          </label>
          <div className="flex items-center gap-3 rounded-lg border border-forensic-gold/[0.08] bg-graphite-900 px-4 py-2.5 text-xs">
            <span className="text-forensic-stone">当前阶段</span>
            <motion.span
              key={activeIndex}
              className="font-medium text-forensic-gold"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {running
                ? VIDEO_ANNOTATION_STAGES[activeIndex]?.title ?? '准备中'
                : complete
                  ? '✓ ' + VIDEO_ANNOTATION_STAGES[VIDEO_ANNOTATION_STAGES.length - 1].title
                  : '就绪'}
            </motion.span>
            {running && <span className="ml-auto text-forensic-stone">{VIDEO_ANNOTATION_STAGES[activeIndex]?.output}</span>}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-[1.6fr_430px]">
        <div className="space-y-5">
          <SectionCard title="视频播放器" eyebrow="本地样本">
            <VideoPlayer
              src={videoSrc}
              onLoadedMetadata={(duration) => {
                if (Number.isFinite(duration) && duration > 0) setVideoDuration(duration);
              }}
            />
          </SectionCard>
          <SectionCard title="取证时间线" eyebrow="可疑片段">
            <VideoTimeline
              segments={displaySegments}
              selectedId={selectedSegment.id}
              onSelect={(id) => {
                setSelectedSegmentId(id);
                const nextSegment = displaySegments.find((segment) => segment.id === id);
                setSelectedFrame(nextSegment?.keyframes[0] ?? '');
              }}
              visibleCount={visibleSegmentCount}
              isScanning={running && activeIndex === 1}
              scanProgress={scanProgress}
              durationSeconds={videoDuration}
            />
          </SectionCard>
          <SectionCard title="标注日志" eyebrow="实时处理">
            <AnnotationLogStream lines={videoLogLines} isRunning={running} isComplete={complete} />
          </SectionCard>
        </div>
        <SectionCard title="片段标注面板" eyebrow="选中片段">
          <SegmentPanel
            segment={selectedSegment}
            running={running}
            reviewed={reviewed}
            onRun={runAnnotation}
            onReview={() => setReviewedIds((prev) => new Set([...prev, selectedSegmentId]))}
          />
        </SectionCard>
      </div>

      <SectionCard title="关键帧条" eyebrow={`选中帧：${selectedFrame}`} className="mt-5">
        <KeyframeStrip frames={keyframeItems} selectedFrame={selectedFrame} onSelect={setSelectedFrame} visibleCount={visibleFrameCount} />
      </SectionCard>
    </PageShell>
  );
}
