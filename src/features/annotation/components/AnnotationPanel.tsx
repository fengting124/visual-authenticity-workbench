import type { ImageSample, VideoSegment } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';

type AnnotationPanelProps = {
  sample?: ImageSample;
  segment?: VideoSegment;
};

export function AnnotationPanel({ sample, segment }: AnnotationPanelProps) {
  if (segment) {
    return (
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-forensic-gold">Segment Annotation</p>
          <h3 className="mt-1 text-lg font-semibold">{segment.label}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded border border-graphite-800 bg-graphite-850 p-3">
            <p className="text-xs text-forensic-stone">Start time</p>
            <p className="mt-1 text-forensic-text">{segment.start}</p>
          </div>
          <div className="rounded border border-graphite-800 bg-graphite-850 p-3">
            <p className="text-xs text-forensic-stone">End time</p>
            <p className="mt-1 text-forensic-text">{segment.end}</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-forensic-stone">{segment.clue}</p>
        <ScoreBar label="Annotation confidence" value={segment.confidence} tone="warning" />
        <StatusBadge tone="warning">{segment.status}</StatusBadge>
      </div>
    );
  }

  if (!sample) return null;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-forensic-gold">Image Annotation</p>
        <h3 className="mt-1 text-lg font-semibold">{sample.id}</h3>
      </div>
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-xs text-forensic-stone">Generated prompt</p>
          <p className="mt-1 leading-6">{sample.prompt}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded border border-graphite-800 bg-graphite-850 p-3">
            <p className="text-xs text-forensic-stone">Sample source</p>
            <p className="mt-1">{sample.source}</p>
          </div>
          <div className="rounded border border-graphite-800 bg-graphite-850 p-3">
            <p className="text-xs text-forensic-stone">Image category</p>
            <p className="mt-1">{sample.category}</p>
          </div>
        </div>
      </div>
      <StatusBadge tone="warning">{sample.status}</StatusBadge>
      <button className="w-full rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold">
        Save annotation placeholder
      </button>
    </div>
  );
}
