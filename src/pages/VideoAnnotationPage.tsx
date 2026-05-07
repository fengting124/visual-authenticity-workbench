import { videoSegments } from '../features/annotation/data';
import { AnnotationPanel } from '../features/annotation/components/AnnotationPanel';
import { KeyframeStrip } from '../features/annotation/components/KeyframeStrip';
import { VideoTimeline } from '../features/annotation/components/VideoTimeline';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { VideoPlayer } from '../shared/components/VideoPlayer';

export function VideoAnnotationPage() {
  return (
    <PageShell
      eyebrow="Video Annotation"
      title="Generated video segment annotation workspace"
      description="Temporal evidence review with suspicious interval blocks, keyframe tracking, and segment-level metadata."
    >
      <div className="grid grid-cols-[1.6fr_420px] gap-5">
        <div className="space-y-5">
          <SectionCard title="Video player" eyebrow="Local Placeholder">
            <VideoPlayer />
          </SectionCard>
          <SectionCard title="Professional timeline" eyebrow="Suspicious Segments">
            <VideoTimeline segments={videoSegments} />
          </SectionCard>
          <SectionCard title="Keyframe strip" eyebrow="Frame Evidence">
            <KeyframeStrip />
          </SectionCard>
        </div>
        <SectionCard title="Segment annotation panel" eyebrow="Active Segment">
          <AnnotationPanel segment={videoSegments[1]} />
        </SectionCard>
      </div>
    </PageShell>
  );
}
