import { ChangeEvent, useMemo, useState } from 'react';
import { activeSample } from '../features/samples/data';
import { AnnotationResultPanel } from '../features/annotation/components/AnnotationResultPanel';
import { ImageAnnotationCanvas } from '../features/annotation/components/ImageAnnotationCanvas';
import { RegionClueList } from '../features/annotation/components/RegionClueList';
import { PageShell } from '../layouts/PageShell';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { readFileAsDataUrl, readLocalAsset, saveLocalAsset } from '../shared/utils/localSample';

const imageStages = [
  { title: '图像读取', input: '导入图像与样本元数据', output: '生成图像任务上下文' },
  { title: '区域扫描', input: '图像画布、纹理、边界、反射关系', output: '发现 R-01 与 R-02 候选区域' },
  { title: '线索生成', input: '候选区域与局部视觉特征', output: '输出反射不一致、纹理断裂线索' },
  { title: '结果固化', input: '区域、线索、置信度、复核状态', output: '进入可解释检测入口' },
];

export function ImageAnnotationPage() {
  const [selectedRegionId, setSelectedRegionId] = useState(activeSample.regions[0].id);
  const [running, setRunning] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [localImage, setLocalImage] = useState(() => {
    const stored = readLocalAsset('image');
    return {
      dataUrl: stored.dataUrl ?? activeSample.assetSrc ?? null,
      name: stored.name ?? 'fake.jpg',
    };
  });
  const selectedRegion = useMemo(
    () => activeSample.regions.find((region) => region.id === selectedRegionId),
    [selectedRegionId],
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

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (dataUrl) => {
      saveLocalAsset('image', dataUrl, file.name);
      setLocalImage({ dataUrl, name: file.name });
    });
  }

  return (
    <PageShell
      eyebrow="图像标注"
      title="图像证据发现"
      description="上传图像并执行标注流程，输出可疑区域、区域类型、线索描述、置信度和复核状态。"
    >
      <PipelineStatusBar steps={['读取', '扫描', '生成', '固化']} currentStep={activeIndex} complete={complete} />
      <SectionCard title="图像输入" eyebrow="本地样本" className="mt-5">
        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <label className="rounded-md border border-graphite-800 bg-graphite-850 p-4">
            <p className="text-sm font-semibold">选择图像文件</p>
            <p className="mt-2 text-xs text-forensic-stone">{localImage.name ?? '尚未选择图像'}</p>
            <input type="file" accept="image/*" onChange={handleImage} className="mt-4 block w-full text-xs text-forensic-stone file:mr-3 file:rounded file:border-0 file:bg-forensic-gold/10 file:px-3 file:py-2 file:text-forensic-gold" />
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
        <SectionCard title="图像画布" eyebrow="候选区域叠加">
          <ImageAnnotationCanvas
            sample={activeSample}
            selectedRegionId={selectedRegionId}
            onSelectRegion={setSelectedRegionId}
            imageSrc={localImage.dataUrl}
          />
        </SectionCard>
        <SectionCard title="标注结果面板" eyebrow="结构化输出">
          <AnnotationResultPanel
            sample={activeSample}
            selectedRegion={selectedRegion}
            running={running}
            reviewed={reviewed}
            onRun={runAnnotation}
            onReview={() => setReviewed(true)}
          />
        </SectionCard>
      </div>
      <SectionCard title="伪造线索列表" eyebrow="候选证据" className="mt-5">
        <RegionClueList
          regions={activeSample.regions}
          selectedId={selectedRegionId}
          onSelect={setSelectedRegionId}
        />
      </SectionCard>
    </PageShell>
  );
}
