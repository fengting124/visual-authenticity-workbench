import { ChangeEvent, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { activeSample, samples } from '../features/samples/data';
import { AnnotationResultPanel } from '../features/annotation/components/AnnotationResultPanel';
import { ImageAnnotationCanvas } from '../features/annotation/components/ImageAnnotationCanvas';
import { RegionClueList } from '../features/annotation/components/RegionClueList';
import { PageShell } from '../layouts/PageShell';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { readFileAsDataUrl, readLocalAsset, saveAnnotationToSession, saveLocalAsset } from '../shared/utils/localSample';

const imageStages = [
  { title: '图像读取', output: '建立图像任务上下文' },
  { title: '区域扫描', output: '发现候选可疑区域' },
  { title: '线索生成', output: '输出反射、纹理、边界线索' },
  { title: '结果固化', output: '写入候选证据队列' },
];

export function ImageAnnotationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeSample.id;
  const sample = samples.find((item) => item.id === sampleId && item.type === 'image') ?? activeSample;

  const [selectedRegionId, setSelectedRegionId] = useState(sample.regions[0]?.id ?? '');
  const [running, setRunning] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
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

  function runAnnotation() {
    setRunning(true);
    setComplete(false);
    setActiveIndex(0);
    imageStages.forEach((_, index) => {
      window.setTimeout(() => {
        setActiveIndex(index);
        if (index === imageStages.length - 1) {
          window.setTimeout(() => {
            setRunning(false);
            setComplete(true);
          }, 450);
        }
      }, index * 550);
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
        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <label className="rounded-md border border-graphite-800 bg-graphite-850 p-4">
            <p className="text-sm font-semibold">选择图像文件</p>
            <p className="mt-2 text-xs text-forensic-stone">{localImage.name}</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mt-4 block w-full text-xs text-forensic-stone file:mr-3 file:rounded file:border-0 file:bg-forensic-gold/10 file:px-3 file:py-2 file:text-forensic-gold"
            />
            <button
              type="button"
              onClick={runAnnotation}
              className="mt-4 w-full rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
            >
              {running ? '正在标注' : '开始标注'}
            </button>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {imageStages.map((stage) => (
              <div key={stage.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <p className="text-sm font-semibold">{stage.title}</p>
                <p className="mt-2 text-xs text-[#7a8aa0]">{stage.output}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-[55fr_45fr]">
        <SectionCard title="图像画布" eyebrow="候选区域">
          <ImageAnnotationCanvas
            sample={sample}
            selectedRegionId={selectedRegionId}
            onSelectRegion={setSelectedRegionId}
            imageSrc={localImage.dataUrl}
          />
        </SectionCard>
        <SectionCard title="标注结果面板" eyebrow="结构化输出">
          <AnnotationResultPanel
            sample={sample}
            selectedRegion={selectedRegion}
            running={running}
            reviewed={reviewed}
            onRun={runAnnotation}
            onReview={() => setReviewed(true)}
            onSendToAnalysis={sendToAnalysis}
          />
        </SectionCard>
      </div>

      <SectionCard title="候选证据列表" className="mt-5">
        <RegionClueList regions={sample.regions} selectedId={selectedRegionId} onSelect={setSelectedRegionId} />
      </SectionCard>
    </PageShell>
  );
}
