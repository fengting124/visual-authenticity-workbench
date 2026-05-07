import ReactECharts from 'echarts-for-react';
import { expertResults, riskDistribution, semanticSteps } from '../features/analysis/data';
import { ExpertGroupPanel } from '../features/analysis/components/ExpertGroupPanel';
import { SemanticChainPanel } from '../features/analysis/components/SemanticChainPanel';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';

export function AnalysisCenterPage() {
  const riskOption = {
    backgroundColor: 'transparent',
    color: ['#6F8F72', '#D2A64A', '#B88A44', '#C95A4A'],
    tooltip: {},
    legend: { bottom: 0, textStyle: { color: '#A8A29A' } },
    series: [{ type: 'pie', radius: ['42%', '68%'], data: riskDistribution }],
  };
  const expertOption = {
    backgroundColor: 'transparent',
    color: ['#B88A44'],
    radar: {
      indicator: expertResults.map((expert) => ({ name: expert.name.replace(' Expert', ''), max: 100 })),
      axisName: { color: '#A8A29A' },
      splitLine: { lineStyle: { color: '#2D3338' } },
      splitArea: { areaStyle: { color: ['rgba(32,36,40,.55)', 'rgba(17,19,21,.55)'] } },
    },
    series: [{ type: 'radar', data: [{ value: expertResults.map((expert) => expert.score) }] }],
  };

  return (
    <PageShell
      eyebrow="Understanding and Detection"
      title="Model analysis workflow entrance"
      description="Sample selection, semantic-chain understanding, expert-group detection, and recent result review for the demo pipeline."
    >
      <div className="grid grid-cols-[1fr_1fr] gap-5">
        <SectionCard title="Semantic-chain understanding" eyebrow="Reasoning Flow">
          <SemanticChainPanel steps={semanticSteps} />
        </SectionCard>
        <SectionCard title="Expert-group detection" eyebrow="Multi-evidence Engine">
          <ExpertGroupPanel experts={expertResults} showGraph />
        </SectionCard>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_1fr_1fr] gap-5">
        <SectionCard title="Sample selection" eyebrow="Ready Queue">
          {['IMG-DEMO-014', 'VID-DEMO-021', 'IMG-DEMO-019'].map((sample, index) => (
            <div key={sample} className="mb-3 rounded-md border border-graphite-800 bg-graphite-850 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{sample}</p>
                <StatusBadge tone={index === 0 ? 'warning' : 'neutral'}>
                  {index === 0 ? 'Active' : 'Queued'}
                </StatusBadge>
              </div>
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Risk distribution" eyebrow="Batch Summary">
          <ReactECharts option={riskOption} style={{ height: 260 }} />
        </SectionCard>
        <SectionCard title="Expert score comparison" eyebrow="Fusion Inputs">
          <ReactECharts option={expertOption} style={{ height: 260 }} />
        </SectionCard>
      </div>
    </PageShell>
  );
}
