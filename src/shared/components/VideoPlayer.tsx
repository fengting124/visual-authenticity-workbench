import { Play, ScanLine } from 'lucide-react';

type VideoPlayerProps = {
  src?: string | null;
};

export function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0d1421]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#2d3338_1px,transparent_1px),linear-gradient(90deg,#2d3338_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-[#080d14]/80 px-3 py-1 text-xs text-[#7a8aa0] backdrop-blur">
        <ScanLine className="h-3.5 w-3.5 text-[#00c4ff]" />
        本地视频样本
      </div>
      {src ? (
        <video src={src} controls className="relative h-full w-full object-contain" />
      ) : (
        <button
          type="button"
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#00c4ff]/50 bg-[#00c4ff]/10 text-[#00c4ff]"
        >
          <Play className="h-7 w-7 fill-current" />
        </button>
      )}
    </div>
  );
}
