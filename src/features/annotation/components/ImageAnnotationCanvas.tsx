import type { ImageSample } from '../types';
import { EmptyAssetPlaceholder } from '../../../shared/components/EmptyAssetPlaceholder';

type ImageAnnotationCanvasProps = {
  sample: ImageSample;
};

export function ImageAnnotationCanvas({ sample }: ImageAnnotationCanvasProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-graphite-800 bg-[#0d0f10]">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(135deg,rgba(184,138,68,.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      <EmptyAssetPlaceholder
        label={sample.id}
        detail="Local placeholder image canvas with synthetic annotation overlay"
      />
      {sample.regions.map((region) => (
        <div
          key={region.id}
          className="absolute rounded-sm border border-forensic-gold bg-forensic-gold/10 shadow-[0_0_0_1px_rgba(0,0,0,.45)]"
          style={{
            left: `${region.x}%`,
            top: `${region.y}%`,
            width: `${region.width}%`,
            height: `${region.height}%`,
          }}
        >
          <span className="absolute -top-7 left-0 rounded border border-forensic-gold/40 bg-graphite-950 px-2 py-1 text-xs text-forensic-gold">
            {region.id}
          </span>
        </div>
      ))}
    </div>
  );
}
