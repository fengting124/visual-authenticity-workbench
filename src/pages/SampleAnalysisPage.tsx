import { ChangeEvent, useMemo, useState } from 'react';
import { expertResults, semanticSteps } from '../features/analysis/data';
import { CandidateEvidencePanel } from '../features/analysis/components/CandidateEvidencePanel';
import { EvidenceFusionPanel } from '../features/analysis/components/EvidenceFusionPanel';
import { ExpertContributionChart } from '../features/analysis/components/ExpertContributionChart';
import { ExpertGroupPanel } from '../features/analysis/components/ExpertGroupPanel';
import { LiveAnalysisProcess } from '../features/analysis/components/LiveAnalysisProcess';
import { SampleViewer } from '../features/analysis/components/SampleViewer';
import { SemanticChainPanel } from '../features/analysis/components/SemanticChainPanel';
import { activeSample } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { ProcessPipeline } from '../shared/components/ProcessPipeline';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { readFileAsDataUrl, readLocalAsset, saveLocalAsset } from '../shared/utils/localSample';

const detectionStages = [
  { title: '图像输入解析', input: '导入图像、样本来源、生成器信息', output: '建立图像检测任务上下文' },
  { title: '候选证据读取', input: '自动标注区域、提示词、局部线索', output: '载入 R-01 与 R-02 候选证据' },
  { title: '语义链推理', input: '全局语义、局部区域、逻辑关系', output: '输出全局理解、局部解析、逻辑核验' },
  { title: '专家组检测', input: '候选证据与语义链结果', output: '输出空间、频域、风格、语义专家分数' },
  { title: '证据融合', input: '专家贡献值与风险分数', output: '生成中高风险判断与报告入口' },
];

export function SampleAnalysisPage() {
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(activeSample.regions[0]?.id ?? '');
  const [localImage, setLocalImage] = useState(() => {
    const stored = readLocalAsset('image');
    return {
      dataUrl: stored.dataUrl ?? activeSample.assetSrc ?? null,
      name: stored.name ?? 'fake.jpg',
    };
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const selectedEvidence = useMemo(
    () => activeSample.regions.find((region) => region.id === selectedEvidenceId) ?? activeSample.regions[0],
    [selectedEvidenceId],
  );
  const activeExpertIds = selectedEvidence?.expertIds ?? ['spatial', 'semantic'];
  const activeStepId = selectedEvidence?.semanticStepId ?? 'logic';

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (dataUrl) => {
      saveLocalAsset('image', dataUrl, file.name);
      setLocalImage({ dataUrl, name: file.name });
    });
  }

  function startDetection() {
    setComplete(false);
    setActiveIndex(0);
    detectionStages.forEach((_, index) => {
      window.setTimeout(() => {
        setActiveIndex(index);
        if (index === detectionStages.length - 1) {
          window.setTimeout(() => setComplete(true), 450);
        }
      }, index * 650);
    });
  }

  return (
    <PageShell
      eyebrow="检测工作台"
      title="候选证据进入可解释检测"
      description="该工作台展示自动标注结果如何进入语义链理解、专家组检测、证据融合与报告生成。"
    >
      <PipelineStatusBar steps={['解析', '读取', '推理', '专家', '融合']} currentStep={activeIndex} complete={complete} />
      <SectionCard title="图像检测输入" eyebrow="检测任务" className="mt-5">
        <div className="grid grid-cols-[360px_1fr] gap-4">
          <label className="rounded-md border border-graphite-800 bg-graphite-850 p-4">
            <p className="text-sm font-semibold">选择待检测图像</p>
            <p className="mt-2 text-xs text-forensic-stone">{localImage.name ?? '尚未选择图像'}</p>
            <input type="file" accept="image/*" onChange={handleImage} className="mt-4 block w-full text-xs text-forensic-stone file:mr-3 file:rounded file:border-0 file:bg-forensic-gold/10 file:px-3 file:py-2 file:text-forensic-gold" />
            <button type="button" onClick={startDetection} className="mt-4 w-full rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold">
              开始检测
            </button>
          </label>
          <ProcessPipeline stages={detectionStages} activeIndex={activeIndex} complete={complete} />
        </div>
      </SectionCard>
      <div className="mt-5 hidden">
        <LiveAnalysisProcess />
      </div>
      <div className="grid grid-cols-[330px_1fr_430px] gap-5">
        <SectionCard title="样本与候选证据" eyebrow="标注输出">
          <SampleViewer sample={activeSample} imageSrc={localImage.dataUrl} />
          <div className="mt-4">
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-forensic-stone">
              来自自动标注的候选证据
            </p>
            <CandidateEvidencePanel
              sample={activeSample}
              selectedId={selectedEvidenceId}
              onSelect={setSelectedEvidenceId}
            />
          </div>
        </SectionCard>
        <SectionCard title="语义链理解" eyebrow="检测过程">
          <SemanticChainPanel
            steps={semanticSteps}
            compact
            activeStepId={activeStepId}
            onSelectStep={() => undefined}
          />
        </SectionCard>
        <SectionCard title="专家组检测" eyebrow="多证据专家">
          <ExpertGroupPanel
            experts={expertResults}
            activeExpertIds={activeExpertIds}
            onSelectExpert={() => undefined}
          />
          <div className="mt-4 rounded-md border border-graphite-800 bg-[#101213] p-3">
            <ExpertContributionChart experts={expertResults} />
          </div>
        </SectionCard>
      </div>
      <SectionCard title="证据融合摘要" eyebrow="决策层" className="mt-5">
        <EvidenceFusionPanel />
      </SectionCard>
    </PageShell>
  );
}
