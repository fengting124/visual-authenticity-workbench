import { ChangeEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';
import { expertResults, semanticSteps } from '../features/analysis/data';
import { CandidateEvidencePanel } from '../features/analysis/components/CandidateEvidencePanel';
import { EvidenceFusionPanel } from '../features/analysis/components/EvidenceFusionPanel';
import { ExpertContributionChart } from '../features/analysis/components/ExpertContributionChart';
import { ExpertGroupPanel } from '../features/analysis/components/ExpertGroupPanel';
import { SampleViewer } from '../features/analysis/components/SampleViewer';
import { SemanticChainPanel } from '../features/analysis/components/SemanticChainPanel';
import { activeSample, samples } from '../features/samples/data';
import type { FakeRegion } from '../features/samples/types';
import { PageShell } from '../layouts/PageShell';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { loadAnnotationFromSession, readFileAsDataUrl, readLocalAsset, saveLocalAsset } from '../shared/utils/localSample';

const detectionStages = [
  { title: '图像输入解析', output: '建立图像检测任务上下文' },
  { title: '候选证据读取', output: '载入自动标注候选证据' },
  { title: '语义链推理', output: '输出语义链中间解释' },
  { title: '专家组检测', output: '输出多专家风险分数' },
  { title: '证据融合', output: '形成最终判断和报告入口' },
];

function isFakeRegionList(value: unknown[] | null): value is FakeRegion[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'object' && item !== null && 'id' in item && 'clue' in item);
}

export function SampleAnalysisPage() {
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeSample.id;
  const selectedSample = samples.find((sample) => sample.id === sampleId && sample.type === 'image') ?? activeSample;
  const storedEvidence = loadAnnotationFromSession(selectedSample.id);
  const candidateEvidence = isFakeRegionList(storedEvidence) ? storedEvidence : selectedSample.regions;
  const analysisSample = { ...selectedSample, regions: candidateEvidence };

  const [selectedEvidenceId, setSelectedEvidenceId] = useState(candidateEvidence[0]?.id ?? '');
  const [localImage, setLocalImage] = useState(() => {
    const stored = readLocalAsset('image');
    return {
      dataUrl: stored.dataUrl ?? selectedSample.assetSrc ?? null,
      name: stored.name ?? 'fake.jpg',
    };
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  const selectedEvidence = useMemo(
    () => candidateEvidence.find((region) => region.id === selectedEvidenceId) ?? candidateEvidence[0],
    [candidateEvidence, selectedEvidenceId],
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
    <PageShell eyebrow="检测工作台" title="候选证据进入可解释检测" description="">
      <PipelineStatusBar steps={['解析', '读取', '推理', '专家', '融合']} currentStep={activeIndex} complete={complete} />
      {complete && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded text-xs text-slate-400 bg-slate-800/50 border border-slate-700/50 mt-2">
          <InfoIcon size={12} />
          演示模式 · 检测结果由预置证据驱动，不代表真实模型输出
        </div>
      )}

      <SectionCard title="图像检测输入" eyebrow={selectedSample.id} className="mt-5">
        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <label className="rounded-md border border-graphite-800 bg-graphite-850 p-4">
            <p className="text-sm font-semibold">选择待检测图像</p>
            <p className="mt-2 text-xs text-forensic-stone">{localImage.name}</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mt-4 block w-full text-xs text-forensic-stone file:mr-3 file:rounded file:border-0 file:bg-forensic-gold/10 file:px-3 file:py-2 file:text-forensic-gold"
            />
            <button
              type="button"
              onClick={startDetection}
              className="mt-4 w-full rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
            >
              开始检测
            </button>
          </label>
          <div className="grid grid-cols-5 gap-3">
            {detectionStages.map((stage) => (
              <div key={stage.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <p className="text-sm font-semibold">{stage.title}</p>
                <p className="mt-2 text-xs text-[#7a8aa0]">{stage.output}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-[330px_1fr_430px]">
        <SectionCard title="样本与候选证据" eyebrow="标注输出">
          <SampleViewer sample={analysisSample} imageSrc={localImage.dataUrl} />
          <div className="mt-4">
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-forensic-stone">来自自动标注的候选证据</p>
            <CandidateEvidencePanel sample={analysisSample} selectedId={selectedEvidenceId} onSelect={setSelectedEvidenceId} />
          </div>
        </SectionCard>
        <SectionCard title="语义链理解" eyebrow="检测过程">
          <SemanticChainPanel steps={semanticSteps} compact activeStepId={activeStepId} onSelectStep={() => undefined} />
        </SectionCard>
        <SectionCard title="专家组检测" eyebrow="多证据专家">
          <ExpertGroupPanel experts={expertResults} activeExpertIds={activeExpertIds} onSelectExpert={() => undefined} />
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
