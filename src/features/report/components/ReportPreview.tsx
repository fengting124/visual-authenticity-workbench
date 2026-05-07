import { imageSample, videoSegments } from '../../annotation/data';
import { expertResults, semanticSteps } from '../../analysis/data';
import type { ReportSectionData } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { ReportSection } from './ReportSection';

type ReportPreviewProps = {
  sections: ReportSectionData[];
};

export function ReportPreview({ sections }: ReportPreviewProps) {
  return (
    <article className="rounded-lg border border-graphite-800 bg-[#16191b] p-8 shadow-workstation">
      <div className="mb-8 flex items-start justify-between gap-6 border-b border-graphite-800 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-forensic-gold">Forensic Report</p>
          <h2 className="mt-2 text-2xl font-semibold">Visual Authenticity Analysis Report</h2>
          <p className="mt-2 text-sm text-forensic-stone">Structured demonstration output with mock evidence.</p>
        </div>
        <StatusBadge tone="warning">Medium-high risk</StatusBadge>
      </div>
      <div className="mb-8 grid grid-cols-[1fr_280px] gap-6">
        <div className="rounded-md border border-graphite-800 bg-graphite-900 p-5">
          <p className="text-sm font-semibold">Final Decision</p>
          <p className="mt-2 text-sm leading-6 text-forensic-stone">
            The sample contains localized evidence requiring expert review. The conclusion is based on
            semantic-chain evidence and multi-expert fusion signals.
          </p>
        </div>
        <div className="rounded-md border border-forensic-warning/35 bg-forensic-warning/10 p-5">
          <ScoreBar label="Risk score" value={72} tone="warning" />
        </div>
      </div>
      {sections.map((section) => (
        <ReportSection key={section.title} section={section} />
      ))}
      <section className="border-t border-graphite-800 py-5">
        <h3 className="mb-4 text-base font-semibold">Annotated Image Evidence</h3>
        <div className="grid grid-cols-2 gap-3">
          {imageSample.regions.map((region) => (
            <div key={region.id} className="rounded-md border border-graphite-800 bg-graphite-900 p-4">
              <p className="text-sm font-medium">{region.label}</p>
              <p className="mt-2 text-sm leading-6 text-forensic-stone">{region.clue}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-graphite-800 py-5">
        <h3 className="mb-4 text-base font-semibold">Suspicious Video Segments</h3>
        <div className="grid grid-cols-3 gap-3">
          {videoSegments.map((segment) => (
            <div key={segment.id} className="rounded-md border border-graphite-800 bg-graphite-900 p-4">
              <p className="text-sm font-medium">{segment.label}</p>
              <p className="mt-1 text-xs text-forensic-stone">
                {segment.start} to {segment.end}
              </p>
              <p className="mt-2 text-sm leading-6 text-forensic-stone">{segment.clue}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-graphite-800 py-5">
        <h3 className="mb-4 text-base font-semibold">Evidence Trace</h3>
        <div className="grid grid-cols-2 gap-3">
          {semanticSteps.map((step) => (
            <div key={step.id} className="rounded-md border border-graphite-800 bg-graphite-900 p-4">
              <p className="text-sm font-medium">{step.name}</p>
              <p className="mt-2 text-sm leading-6 text-forensic-stone">{step.result}</p>
            </div>
          ))}
          {expertResults.map((expert) => (
            <div key={expert.id} className="rounded-md border border-graphite-800 bg-graphite-900 p-4">
              <p className="text-sm font-medium">{expert.name}</p>
              <p className="mt-2 text-sm leading-6 text-forensic-stone">{expert.evidence}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
