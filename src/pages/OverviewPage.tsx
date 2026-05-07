import { overviewData } from '../features/overview/data';
import { MetricCard } from '../features/overview/components/MetricCard';
import { TaskCard } from '../features/overview/components/TaskCard';
import { WorkflowMap } from '../features/overview/components/WorkflowMap';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { ScoreBar } from '../shared/components/ScoreBar';
import { StatusBadge } from '../shared/components/StatusBadge';

export function OverviewPage() {
  return (
    <PageShell
      eyebrow="System Overview"
      title="Visual content authenticity analysis workstation"
      description="A frontend-only cybersecurity competition demo covering annotation, semantic-chain understanding, expert-group detection, and structured forensic reporting."
    >
      <div className="grid grid-cols-4 gap-4">
        {overviewData.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-[1.7fr_1fr] gap-5">
        <SectionCard title="End-to-end workflow" eyebrow="Product Flow">
          <WorkflowMap nodes={overviewData.workflow} />
        </SectionCard>
        <SectionCard title="Recent analysis" eyebrow="Review Queue">
          <div className="space-y-3">
            {overviewData.recent.map((item) => (
              <div key={item.id} className="rounded-md border border-graphite-800 bg-graphite-850 p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{item.sample}</p>
                    <p className="mt-1 text-xs text-forensic-stone">
                      {item.id} · {item.type}
                    </p>
                  </div>
                  <StatusBadge tone={item.score > 0.65 ? 'warning' : 'neutral'}>{item.decision}</StatusBadge>
                </div>
                <ScoreBar label="Risk score" value={item.score * 100} tone="warning" />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {overviewData.tasks.map((task) => (
          <TaskCard key={task.title} task={task} />
        ))}
      </div>
    </PageShell>
  );
}
