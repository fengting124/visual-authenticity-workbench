import { useEffect, useState } from 'react';
import { reportSections } from '../features/report/data';
import { ReportPreview } from '../features/report/components/ReportPreview';
import { PageShell } from '../layouts/PageShell';

export function ReportPage() {
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(false), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function exportReport() {
    setNotice(true);
    window.print();
  }

  return (
    <PageShell eyebrow="证据报告" title="结构化证据报告" description="">
      {notice && (
        <div className="fixed right-6 top-16 z-50 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300 shadow-lg backdrop-blur">
          报告已发送至打印队列
        </div>
      )}
      <ReportPreview sections={reportSections} onExport={exportReport} />
    </PageShell>
  );
}
