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
    <div
      className="min-h-full"
      style={{
        backgroundImage: `
          linear-gradient(rgba(184,138,68,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(184,138,68,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        backgroundColor: '#111315',
      }}
    >
      <PageShell eyebrow="证据报告" title="结构化证据报告" description="">
      {notice && (
        <div className="fixed right-6 top-16 z-50 rounded-lg border border-forensic-gold/30 bg-forensic-gold/10 px-4 py-3 text-sm text-forensic-gold shadow-lg backdrop-blur">
          报告已发送至打印队列
        </div>
      )}
        <ReportPreview sections={reportSections} onExport={exportReport} />
      </PageShell>
    </div>
  );
}
