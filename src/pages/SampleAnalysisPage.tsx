import { ChangeEvent, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InfoIcon } from 'lucide-react';
import { CandidateEvidencePanel } from '../features/analysis/components/CandidateEvidencePanel';
import { DetectionLogStream } from '../features/analysis/components/DetectionLogStream';
import { ExpertMeterPanel } from '../features/analysis/components/ExpertMeterPanel';
import { FusionVerdictPanel } from '../features/analysis/components/FusionVerdictPanel';
import { ImageScanCanvas, type ScanRegion } from '../features/analysis/components/ImageScanCanvas';
import { SemanticChainPanel } from '../features/analysis/components/SemanticChainPanel';
import { semanticSteps } from '../features/analysis/data';
import { PHASE_CONFIGS, type PhaseId, useDetectionPhases } from '../features/analysis/hooks/useDetectionPhases';
import { activeSample, samples } from '../features/samples/data';
import type { FakeRegion } from '../features/samples/types';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { loadAnnotationFromSession, readFileAsDataUrl, readLocalAsset, saveLocalAsset } from '../shared/utils/localSample';

function isFakeRegionList(value: unknown[] | null): value is FakeRegion[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'object' && item !== null && 'id' in item && 'clue' in item);
}

function phaseStepId(activePhase: PhaseId, selectedEvidence?: FakeRegion) {
  if (activePhase === 'semantic-chain') return 'global';
  if (activePhase === 'expert-spatial' || activePhase === 'expert-frequency') return 'local';
  if (activePhase === 'expert-semantic' || activePhase === 'fusion') return 'logic';
  if (activePhase === 'complete') return 'explain';
  return selectedEvidence?.semanticStepId ?? 'global';
}

export function SampleAnalysisPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeSample.id;
  const selectedSample = samples.find((sample) => sample.id === sampleId && sample.type === 'image') ?? activeSample;
  const storedEvidence = loadAnnotationFromSession(selectedSample.id);
  const candidateEvidence = isFakeRegionList(storedEvidence) ? storedEvidence : selectedSample.regions;
  const analysisSample = { ...selectedSample, regions: candidateEvidence };

  const {
    activePhase,
    isRunning,
    isComplete,
    visibleLogLines,
    startDetection,
    resetDetection,
    isPhaseComplete,
    isPhaseActive,
    progress,
  } = useDetectionPhases();

  const [selectedEvidenceId, setSelectedEvidenceId] = useState(candidateEvidence[0]?.id ?? '');
  const [selectedExpert, setSelectedExpert] = useState<PhaseId | null>(null);
  const [localImage, setLocalImage] = useState(() => {
    const stored = readLocalAsset('image');
    return {
      dataUrl: stored.dataUrl ?? selectedSample.assetSrc ?? null,
      name: stored.name ?? 'fake.jpg',
    };
  });

  const selectedEvidence = useMemo(
    () => candidateEvidence.find((region) => region.id === selectedEvidenceId) ?? candidateEvidence[0],
    [candidateEvidence, selectedEvidenceId],
  );

  const scanRegions: ScanRegion[] = useMemo(
    () =>
      candidateEvidence.map((region) => ({
        id: region.id,
        x: region.x,
        y: region.y,
        width: region.width,
        height: region.height,
        type: region.type,
        riskScore: region.confidence,
      })),
    [candidateEvidence],
  );

  const activeStepId = phaseStepId(activePhase, selectedEvidence);
  const activePhaseLabel = PHASE_CONFIGS.find((phase) => phase.id === activePhase)?.label ?? '';
  const resolvedImageSrc = localImage.dataUrl ?? selectedSample.assetSrc ?? '/demo-assets/fake.jpg';

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (dataUrl) => {
      saveLocalAsset('image', dataUrl, file.name);
      setLocalImage({ dataUrl, name: file.name });
      resetDetection();
    });
  }

  function handleStart() {
    setSelectedExpert(null);
    startDetection();
  }

  function handleReset() {
    setSelectedExpert(null);
    resetDetection();
  }

  function handleGenerateReport() {
    navigate(`/report?sampleId=${selectedSample.id}`);
  }

  return (
    <PageShell eyebrow="检测工作台" title="图像证据可解释检测" description="">
      <div className="mb-4 rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-forensic-text">{selectedSample.id}</p>
            <p className="mt-1 text-xs text-forensic-stone">输入文件：{localImage.name}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer rounded-md border border-forensic-gold/[0.08] bg-graphite-800 px-3 py-2 text-xs text-forensic-stone transition hover:border-forensic-gold/30">
              导入图像
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
            <button
              type="button"
              onClick={handleStart}
              disabled={isRunning}
              className="rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-xs font-medium text-forensic-gold disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRunning ? '检测运行中' : '开始检测'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-md border border-forensic-gold/[0.08] bg-graphite-800 px-4 py-2 text-xs font-medium text-forensic-stone"
            >
              重置
            </button>
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-forensic-stone">
              {isRunning ? `正在执行：${activePhaseLabel}` : isComplete ? '检测完成' : '就绪'}
            </span>
            <span className="font-mono text-xs tabular-nums text-forensic-gold">{progress}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-graphite-800">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #B88A44, #D2A64A)',
                boxShadow: isRunning ? '0 0 8px rgba(184,138,68,0.5)' : 'none',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {isComplete && (
          <div className="mt-3 flex items-center gap-2 rounded border border-forensic-gold/10 bg-graphite-800/50 px-3 py-1.5 text-xs text-forensic-stone">
            <InfoIcon size={12} />
            演示模式 · 检测结果由预置证据驱动，不代表真实模型输出
          </div>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)_360px]">
        <SectionCard title="样本扫描" eyebrow="输入与候选证据">
          <div className="space-y-4">
            <ImageScanCanvas
              imageSrc={resolvedImageSrc}
              regions={scanRegions}
              activePhase={activePhase}
              selectedRegionId={selectedEvidenceId}
              onRegionClick={setSelectedEvidenceId}
            />
            <DetectionLogStream lines={visibleLogLines} isRunning={isRunning} />
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.14em] text-forensic-stone">候选证据</p>
              <CandidateEvidencePanel sample={analysisSample} selectedId={selectedEvidenceId} onSelect={setSelectedEvidenceId} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="语义链推理" eyebrow="逐步解锁">
          <SemanticChainPanel
            steps={semanticSteps}
            compact
            activePhase={activePhase}
            isPhaseComplete={isPhaseComplete}
            activeStepId={activeStepId}
            onSelectStep={() => undefined}
          />
        </SectionCard>

        <SectionCard title="专家组检测" eyebrow="多证据计量">
          <ExpertMeterPanel
            activePhase={activePhase}
            isPhaseComplete={isPhaseComplete}
            isPhaseActive={isPhaseActive}
            selectedExpert={selectedExpert}
            onExpertClick={setSelectedExpert}
          />
          <FusionVerdictPanel
            isVisible={isComplete}
            riskScore={selectedSample.riskScore}
            onGenerateReport={handleGenerateReport}
            onViewReport={handleGenerateReport}
          />
        </SectionCard>
      </div>
    </PageShell>
  );
}
