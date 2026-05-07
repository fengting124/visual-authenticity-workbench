type KeyframeStripProps = {
  count?: number;
};

export function KeyframeStrip({ count = 6 }: KeyframeStripProps) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="aspect-video rounded border border-graphite-800 bg-graphite-850 p-2"
        >
          <div className="h-full rounded-sm bg-[#111315] [background-image:linear-gradient(45deg,rgba(111,143,114,.24)_1px,transparent_1px)] [background-size:12px_12px]" />
          <p className="mt-1 text-[10px] text-forensic-stone">KF-{String(index + 1).padStart(2, '0')}</p>
        </div>
      ))}
    </div>
  );
}
