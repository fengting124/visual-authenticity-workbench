import { expertResults, evidenceSummary, semanticSteps } from '../features/analysis/data';
import { EvidenceSummary } from '../features/analysis/components/EvidenceSummary';
import { ExpertGroupPanel } from '../features/analysis/components/ExpertGroupPanel';
import { RiskDecisionCard } from '../features/analysis/components/RiskDecisionCard';
import { SampleViewer } from '../features/analysis/components/SampleViewer';
import { SemanticChainPanel } from '../features/analysis/components/SemanticChainPanel';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';

export function SampleAnalysisPage() {
  return (
    <PageShell
      eyebrow="Sample Analysis"
      title="Full evidence analysis workspace"
      description="Three-column inspection of sample content, semantic-chain reasoning, and expert-group detection with final evidence fusion."
    >
      <div className="grid grid-cols-[320px_1fr_420px] gap-5">
        <SectionCard title="Current sample" eyebrow="Visual Evidence">
          <SampleViewer />
        </SectionCard>
        <SectionCard title="Semantic-chain content understanding" eyebrow="Reasoning Chain">
          <SemanticChainPanel steps={semanticSteps} compact />
        </SectionCard>
        <SectionCard title="Expert-group detection" eyebrow="Evidence Engine">
          <ExpertGroupPanel experts={expertResults} />
        </SectionCard>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_360px] gap-5">
        <SectionCard title="Evidence summary" eyebrow="Fusion Context">
          <EvidenceSummary items={evidenceSummary} />
        </SectionCard>
        <RiskDecisionCard />
      </div>
    </PageShell>
  );
}
