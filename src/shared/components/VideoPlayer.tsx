import { Play, ScanLine } from 'lucide-react';

export function VideoPlayer() {
  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-md border border-graphite-800 bg-[#0d0f10]">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#2d3338_1px,transparent_1px),linear-gradient(90deg,#2d3338_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded border border-graphite-800 bg-graphite-900/80 px-3 py-1 text-xs text-forensic-stone">
        <ScanLine className="h-3.5 w-3.5 text-forensic-olive" />
        local placeholder video
      </div>
      <button className="relative flex h-14 w-14 items-center justify-center rounded-full border border-forensic-gold/50 bg-forensic-gold/10 text-forensic-gold">
        <Play className="h-7 w-7 fill-current" />
      </button>
    </div>
  );
}
