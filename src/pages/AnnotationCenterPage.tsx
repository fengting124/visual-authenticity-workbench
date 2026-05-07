import ReactECharts from 'echarts-for-react';
import { annotationTasks, datasetDistribution } from '../features/annotation/data';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { ScoreBar } from '../shared/components/ScoreBar';
import { StatusBadge } from '../shared/components/StatusBadge';

export function AnnotationCenterPage() {
  const distributionOption = {
    backgroundColor: 'transparent',
    color: ['#B88A44', '#6F8F72', '#A8A29A', '#D2A64A'],
    tooltip: {},
    series: [{ type: 'pie', radius: ['48%', '72%'], data: datasetDistribution }],
  };
  const progressOption = {
    backgroundColor: 'transparent',
    color: ['#B88A44'],
    xAxis: { type: 'category', data: annotationTasks.map((task) => task.id), axisLabel: { color: '#A8A29A' } },
    yAxis: { type: 'value', axisLabel: { color: '#A8A29A' }, splitLine: { lineStyle: { color: '#2D3338' } } },
    series: [{ type: 'bar', data: annotationTasks.map((task) => task.progress), barWidth: 28 }],
    grid: { left: 36, right: 12, top: 20, bottom: 32 },
  };

  return (
    <PageShell
      eyebrow="Annotation Center"
      title="Annotation workflow and dataset foundation"
      description="Image and video review tasks establish the evidence base used by downstream analysis workspaces."
    >
      <div className="grid grid-cols-[1.2fr_1fr] gap-5">
        <SectionCard title="Annotation progress" eyebrow="Task State">
          <ReactECharts option={progressOption} style={{ height: 260 }} />
        </SectionCard>
        <SectionCard title="Dataset distribution" eyebrow="Sample Mix">
          <ReactECharts option={distributionOption} style={{ height: 260 }} />
        </SectionCard>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {annotationTasks.map((task) => (
          <SectionCard key={task.id} className="p-4">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{task.title}</p>
                <p className="mt-1 text-xs text-forensic-stone">{task.type} annotation</p>
              </div>
              <StatusBadge tone={task.status === 'Complete' ? 'success' : 'warning'}>{task.status}</StatusBadge>
            </div>
            <ScoreBar label="Completion" value={task.progress} tone={task.type === 'Image' ? 'gold' : 'olive'} />
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}
