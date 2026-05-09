import { ChangeEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { activeVideoSample, samples } from '../features/samples/data';
import { KeyframeStrip } from '../features/annotation/components/KeyframeStrip';
import { SegmentPanel } from '../features/annotation/components/SegmentPanel';
import { VideoTimeline } from '../features/annotation/components/VideoTimeline';
import { PageShell } from '../layouts/PageShell';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { VideoPlayer } from '../shared/components/VideoPlayer';
import { readFileAsDataUrl, readLocalAsset, saveLocalAsset } from '../shared/utils/localSample';

const videoStages = [
  { title: '视频读取', output: '抽取帧序列与时间轴' },
  { title: '片段扫描', output: '发现可疑时间片段' },
  { title: '关键帧定位', output: '输出关键帧 KF-01 至 KF-06' },
  { title: '片段证据生成', output: '生成风险分数与复核状态' },
];

export function VideoAnnotationPage() {
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeVideoSample.id;
  const videoSample = samples.find((sample) => sample.id === sampleId && sample.type === 'video') ?? activeVideoSample;

  const [selectedSegmentId, setSelectedSegmentId] = useState(videoSample.segments[0]?.id ?? '');
  const selectedSegment = useMemo(
    () => videoSample.segments.find((segment) => segment.id === selectedSegmentId) ?? videoSample.segments[0],
    [selectedSegmentId, videoSample.segments],
  );
  const [selectedFrame, setSelectedFrame] = useState(selectedSegment?.keyframes[0] ?? '');
  const [running, setRunning] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [localVideo, setLocalVideo] = useState(() => {
    const stored = readLocalAsset('video');
    return {
      dataUrl: stored.dataUrl ?? videoSample.videoSrc ?? null,
      name: stored.name ?? '片段伪造视频.mp4',
    };
  });

  function runAnnotation() {
    setRunning(true);
    setComplete(false);
    setActiveIndex(0);
    videoStages.forEach((_, index) => {
      window.setTimeout(() => {
        setActiveIndex(index);
        if (index === videoStages.length - 1) {
          window.setTimeout(() => {
            setRunning(false);
            setComplete(true);
          }, 450);
        }
      }, index * 550);
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
          <label className="rounded-md border border-graphite-800 bg-graphite-850 p-4">
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
          <div className="grid grid-cols-4 gap-3">
            {videoStages.map((stage) => (
              <div key={stage.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <p className="text-sm font-semibold">{stage.title}</p>
                <p className="mt-2 text-xs text-[#7a8aa0]">{stage.output}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-[1.6fr_430px]">
        <div className="space-y-5">
          <SectionCard title="视频播放器" eyebrow="本地样本">
            <VideoPlayer src={localVideo.dataUrl ?? videoSample.videoSrc} />
          </SectionCard>
          <SectionCard title="取证时间线" eyebrow="可疑片段">
            <VideoTimeline
              segments={videoSample.segments}
              selectedId={selectedSegment.id}
              onSelect={(id) => {
                setSelectedSegmentId(id);
                const nextSegment = videoSample.segments.find((segment) => segment.id === id);
                setSelectedFrame(nextSegment?.keyframes[0] ?? '');
              }}
            />
          </SectionCard>
        </div>
        <SectionCard title="片段标注面板" eyebrow="选中片段">
          <SegmentPanel
            segment={selectedSegment}
            running={running}
            reviewed={reviewed}
            onRun={runAnnotation}
            onReview={() => setReviewed(true)}
          />
        </SectionCard>
      </div>

      <SectionCard title="关键帧条" eyebrow={`选中帧：${selectedFrame}`} className="mt-5">
        <KeyframeStrip frames={selectedSegment.keyframes} selectedFrame={selectedFrame} onSelect={setSelectedFrame} />
      </SectionCard>
    </PageShell>
  );
}
