import { ChangeEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { activeSample, samples } from '../features/samples/data';
import { findImportedSample } from '../features/samples/importedSamples';
import { AnnotationLogStream } from '../features/annotation/components/AnnotationLogStream';
import { AnnotationResultPanel } from '../features/annotation/components/AnnotationResultPanel';
import { ImageAnnotationCanvas } from '../features/annotation/components/ImageAnnotationCanvas';
import { RegionClueList } from '../features/annotation/components/RegionClueList';
import { PageShell } from '../layouts/PageShell';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { readFileAsDataUrl, readLocalAsset, saveAnnotationToSession, saveLocalAsset } from '../shared/utils/localSample';

const IMAGE_ANNOTATION_STAGES = [
  {
    title: '图像读取',
    output: '建立图像任务上下文',
    durationMs: 700,
    logLines: ['[INIT] 图像解码器就绪', '[INFO] 色彩空间: sRGB', '[INFO] 分辨率读取完成'],
  },
  {
    title: '区域扫描',
    output: '发现候选可疑区域',
    durationMs: 1400,
    logLines: ['[SCAN] 启动多尺度网格扫描', '[SCAN] 层级 1/3: 低频异常检测', '[SCAN] 层级 2/3: 纹理一致性核查', '[SCAN] 层级 3/3: 边界语义分析', '[WARN] 检测到候选异常区域'],
  },
  {
    title: '线索生成',
    output: '输出反射、纹理、边界线索',
    durationMs: 900,
    logLines: ['[CLUE] 区域 R-01: 反射不一致 → 置信度 82%', '[CLUE] 区域 R-02: 纹理断裂 → 置信度 74%', '[CLUE] 区域 R-03: 边界异常 → 置信度 68%'],
  },
  {
    title: '结果固化',
    output: '写入候选证据队列',
    durationMs: 500,
    logLines: ['[SAVE] 写入候选证据数据库', '[OK]   标注任务完成，等待复核'],
  },
] as const;

export function ImageAnnotationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeSample.id;
  const importedSample = findImportedSample(sampleId);
  const sample =
    importedSample?.type === 'image'
      ? importedSample
      : samples.find((item) => item.id === sampleId && item.type === 'image') ?? activeSample;

  const [selectedRegionId, setSelectedRegionId] = useState(sample.regions[0]?.id ?? '');
  const [running, setRunning] = useState(false);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const reviewed = reviewedIds.has(selectedRegionId);
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [annotationLogLines, setAnnotationLogLines] = useState<string[]>([]);
  const [localImage, setLocalImage] = useState(() => {
    const stored = readLocalAsset('image');
    return {
      dataUrl: stored.dataUrl ?? sample.assetSrc ?? null,
      name: stored.name ?? 'fake.jpg',
    };
  });

  const selectedRegion = useMemo(
    () => sample.regions.find((region) => region.id === selectedRegionId) ?? sample.regions[0],
    [sample.regions, selectedRegionId],
  );

  const visibleRegionCount = complete || activeIndex >= 3 ? sample.regions.length : activeIndex >= 2 ? sample.regions.length : 0;
  const annotationPhase = running ? activeIndex : complete ? 3 : -1;

  function runAnnotation() {
    setRunning(true);
    setComplete(false);
    setActiveIndex(0);
    setAnnotationLogLines([]);

    let elapsed = 0;
    IMAGE_ANNOTATION_STAGES.forEach((stage, stageIndex) => {
      window.setTimeout(() => {
        setActiveIndex(stageIndex);
        if (stageIndex === IMAGE_ANNOTATION_STAGES.length - 1) {
          window.setTimeout(() => {
            setRunning(false);
            setComplete(true);
          }, stage.durationMs);
        }
      }, elapsed);

      const lineInterval = stage.durationMs / (stage.logLines.length + 1);
      stage.logLines.forEach((line, lineIndex) => {
        window.setTimeout(() => {
          setAnnotationLogLines((prev) => [...prev, line]);
        }, elapsed + lineInterval * (lineIndex + 1));
      });

      elapsed += stage.durationMs;
    });
  }

  function sendToAnalysis() {
    saveAnnotationToSession(sample.id, sample.regions);
    navigate(`/analysis/sample?sampleId=${sample.id}`);
  }

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (dataUrl) => {
      saveLocalAsset('image', dataUrl, file.name);
      setLocalImage({ dataUrl, name: file.name });
    });
  }

  return (
    <PageShell eyebrow="图像标注" title="图像证据发现" description="">
      <PipelineStatusBar steps={['读取', '扫描', '生成', '固化']} currentStep={activeIndex} complete={complete} />

      <SectionCard title="图像输入" eyebrow={sample.id} className="mt-5">
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-forensic-gold/[0.08] bg-graphite-900 px-4 py-3 text-xs">
          <span className="min-w-0 flex-1 truncate font-mono tabular-nums text-forensic-stone">{localImage.name}</span>
          <label className="cursor-pointer rounded-md border border-forensic-gold/[0.08] bg-graphite-850 px-3 py-2 text-forensic-stone transition-colors hover:border-forensic-gold/30 hover:text-forensic-text">
            选择文件
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={runAnnotation}
            className="rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 font-medium text-forensic-gold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={running}
          >
            {running ? '正在标注' : '开始标注'}
          </button>
          <div className="flex min-w-[260px] items-center gap-3 border-l border-forensic-gold/[0.08] pl-3">
            <span className="text-forensic-stone">当前阶段</span>
            <motion.span
              key={activeIndex}
              className="font-medium text-forensic-gold"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {running
                ? IMAGE_ANNOTATION_STAGES[activeIndex]?.title ?? '准备中'
                : complete
                  ? '✓ ' + IMAGE_ANNOTATION_STAGES[IMAGE_ANNOTATION_STAGES.length - 1].title
                  : '就绪'}
            </motion.span>
            {running && <span className="ml-auto text-forensic-stone">{IMAGE_ANNOTATION_STAGES[activeIndex]?.output}</span>}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-[55fr_45fr]">
        <SectionCard title="图像画布" eyebrow="候选区域">
          <div className="space-y-4">
            <ImageAnnotationCanvas
              sample={sample}
              selectedRegionId={selectedRegionId}
              onSelectRegion={setSelectedRegionId}
              imageSrc={localImage.dataUrl}
              annotationPhase={annotationPhase}
              isRunning={running}
              isComplete={complete}
            />
            <AnnotationLogStream lines={annotationLogLines} isRunning={running} isComplete={complete} />
          </div>
        </SectionCard>
        <SectionCard title="标注结果面板" eyebrow="结构化输出">
          <AnnotationResultPanel
            sample={sample}
            selectedRegion={visibleRegionCount > 0 ? selectedRegion : undefined}
            running={running}
            reviewed={reviewed}
            onRun={runAnnotation}
            onReview={() => setReviewedIds((prev) => new Set([...prev, selectedRegionId]))}
            onSendToAnalysis={sendToAnalysis}
          />
        </SectionCard>
      </div>

      <SectionCard title="候选证据列表" className="mt-5">
        <RegionClueList
          regions={sample.regions}
          selectedId={selectedRegionId}
          onSelect={setSelectedRegionId}
          visibleCount={visibleRegionCount}
          isRunning={running}
        />
      </SectionCard>
    </PageShell>
  );
}
