import { reportSections } from '../features/report/data';
import { ReportPreview } from '../features/report/components/ReportPreview';
import { PageShell } from '../layouts/PageShell';

export function ReportPage() {
  return (
    <PageShell
      eyebrow="证据报告"
      title="结构化证据报告"
      description="报告区分自动标注发现的候选证据与可解释检测生成的分析证据。"
    >
      <ReportPreview sections={reportSections} />
    </PageShell>
  );
}
