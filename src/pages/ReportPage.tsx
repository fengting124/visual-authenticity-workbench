import { reportSections } from '../features/report/data';
import { ReportPreview } from '../features/report/components/ReportPreview';
import { PageShell } from '../layouts/PageShell';

export function ReportPage() {
  return (
    <PageShell
      eyebrow="Structured Report"
      title="Formal forensic analysis report"
      description="Report-style output consolidating sample information, final decision, semantic evidence, expert evidence, annotated regions, and review guidance."
    >
      <ReportPreview sections={reportSections} />
    </PageShell>
  );
}
