import { Play, ScanLine } from 'lucide-react';

type VideoPlayerProps = {
  src?: string | null;
  onLoadedMetadata?: (duration: number) => void;
};

export function VideoPlayer({ src, onLoadedMetadata }: VideoPlayerProps) {
  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-900">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#2d3338_1px,transparent_1px),linear-gradient(90deg,#2d3338_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-forensic-gold/[0.08] bg-graphite-950/80 px-3 py-1 text-xs text-forensic-stone backdrop-blur">
        <ScanLine className="h-3.5 w-3.5 text-forensic-gold" />
        本地视频样本
      </div>
      {src ? (
        <video
          src={src}
          controls
          onLoadedMetadata={(event) => onLoadedMetadata?.(event.currentTarget.duration)}
          className="relative h-full w-full object-contain"
        />
      ) : (
        <button
          type="button"
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-forensic-gold/50 bg-forensic-gold/10 text-forensic-gold"
        >
          <Play className="h-7 w-7 fill-current" />
        </button>
      )}
    </div>
  );
}
