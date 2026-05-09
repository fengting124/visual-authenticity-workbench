import type { EvidenceSample } from '../../samples/types';
import { EmptyAssetPlaceholder } from '../../../shared/components/EmptyAssetPlaceholder';
import { FakeRegionOverlay } from './FakeRegionOverlay';

type ImageAnnotationCanvasProps = {
  sample: EvidenceSample;
  selectedRegionId: string;
  onSelectRegion: (id: string) => void;
  imageSrc?: string | null;
};

export function ImageAnnotationCanvas({
  sample,
  selectedRegionId,
  onSelectRegion,
  imageSrc,
}: ImageAnnotationCanvasProps) {
  const resolvedImageSrc = imageSrc ?? sample.assetSrc;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-900">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(135deg,rgba(184,138,68,.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      {resolvedImageSrc ? (
        <img src={resolvedImageSrc} alt="导入样本" className="h-full w-full object-contain opacity-90" />
      ) : (
        <EmptyAssetPlaceholder label={sample.id} detail="本地视觉占位，叠加候选证据区域" />
      )}
      <FakeRegionOverlay regions={sample.regions} selectedId={selectedRegionId} onSelect={onSelectRegion} />
    </div>
  );
}
