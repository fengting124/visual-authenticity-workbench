type KeyframeStripProps = {
  frames?: string[];
  selectedFrame?: string;
  onSelect?: (frame: string) => void;
};

export function KeyframeStrip({ frames, selectedFrame, onSelect }: KeyframeStripProps) {
  const frameList = frames ?? Array.from({ length: 6 }, (_, index) => `KF-${String(index + 1).padStart(2, '0')}`);

  return (
    <div className="grid grid-cols-6 gap-2">
      {frameList.map((frame) => (
        <button
          type="button"
          key={frame}
          onClick={() => onSelect?.(frame)}
          className={`aspect-video rounded border bg-graphite-850 p-2 text-left ${
            selectedFrame === frame ? 'border-forensic-gold' : 'border-graphite-800'
          }`}
        >
          <div className="h-full rounded-sm bg-[#111315] [background-image:linear-gradient(45deg,rgba(111,143,114,.24)_1px,transparent_1px)] [background-size:12px_12px]" />
          <p className="mt-1 text-[10px] text-forensic-stone">{frame}</p>
        </button>
      ))}
    </div>
  );
}
