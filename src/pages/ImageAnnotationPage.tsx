import { imageSample } from '../features/annotation/data';
import { AnnotationPanel } from '../features/annotation/components/AnnotationPanel';
import { ImageAnnotationCanvas } from '../features/annotation/components/ImageAnnotationCanvas';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { ScoreBar } from '../shared/components/ScoreBar';

export function ImageAnnotationPage() {
  return (
    <PageShell
      eyebrow="Image Annotation"
      title="Generated image annotation workspace"
      description="Localized region markup, prompt context, clue descriptions, and confidence review in one workstation view."
    >
      <div className="grid grid-cols-[1.7fr_420px] gap-5">
        <SectionCard title="Image canvas" eyebrow="Region Overlay">
          <ImageAnnotationCanvas sample={imageSample} />
        </SectionCard>
        <SectionCard title="Annotation status" eyebrow="Sample Record">
          <AnnotationPanel sample={imageSample} />
        </SectionCard>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_1fr] gap-5">
        <SectionCard title="Fake region list" eyebrow="Marked Regions">
          <div className="space-y-3">
            {imageSample.regions.map((region) => (
              <div key={region.id} className="rounded-md border border-graphite-800 bg-graphite-850 p-4">
                <p className="text-sm font-semibold">{region.label}</p>
                <p className="mt-2 text-sm leading-6 text-forensic-stone">{region.clue}</p>
                <div className="mt-3">
                  <ScoreBar label="Annotation confidence" value={region.confidence} tone="warning" />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Clue description list" eyebrow="Evidence Notes">
          <div className="space-y-3 text-sm leading-6 text-forensic-stone">
            <p>Generated prompt is retained as a review field for prompt-image alignment checks.</p>
            <p>Fake clue descriptions identify localized texture, reflection, and geometry anomalies.</p>
            <p>Sample source and category remain visible to support controlled benchmark tracking.</p>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
