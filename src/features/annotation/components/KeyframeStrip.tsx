import { motion } from 'framer-motion';

export type KeyframeItem = {
  id: string;
  src?: string;
  timeLabel?: string;
};

type KeyframeStripProps = {
  frames?: string[] | KeyframeItem[];
  selectedFrame?: string;
  onSelect?: (frame: string) => void;
  visibleCount?: number;
};

export function KeyframeStrip({ frames, selectedFrame, onSelect, visibleCount }: KeyframeStripProps) {
  const frameList = (frames ?? Array.from({ length: 6 }, (_, index) => `KF-${String(index + 1).padStart(2, '0')}`)).map((frame) =>
    typeof frame === 'string' ? { id: frame } : frame,
  );
  const count = visibleCount ?? frameList.length;

  return (
    <div className="grid grid-cols-6 gap-2">
      {frameList.map((frame, index) => {
        const isRevealed = index < count;
        const isSelected = selectedFrame === frame.id;

        if (!isRevealed) {
          return (
            <div key={frame.id} className="aspect-video rounded border border-forensic-stone/10 bg-graphite-900/50 p-2">
              <div className="h-full rounded-sm bg-graphite-950/50" />
              <p className="mt-1 text-[10px] text-forensic-stone/20">{frame.id}</p>
            </div>
          );
        }

        return (
          <motion.button
            type="button"
            key={frame.id}
            onClick={() => onSelect?.(frame.id)}
            className={`aspect-video rounded border bg-graphite-850 p-2 text-left transition-colors ${
              isSelected ? 'border-forensic-gold' : 'border-forensic-gold/[0.08] hover:border-forensic-gold/30'
            }`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.25, ease: 'easeOut' }}
          >
            {frame.src ? (
              <img src={frame.src} alt={frame.id} className="h-full w-full rounded-sm object-cover" />
            ) : (
              <div
                className={`h-full rounded-sm [background-image:linear-gradient(45deg,rgba(111,143,114,.24)_1px,transparent_1px)] [background-size:12px_12px] ${
                  isSelected ? 'bg-forensic-gold/5' : 'bg-graphite-950'
                }`}
              />
            )}
            <p className={`mt-1 flex justify-between gap-1 text-[10px] ${isSelected ? 'text-forensic-gold' : 'text-forensic-stone'}`}>
              <span>{frame.id}</span>
              {frame.timeLabel && <span className="font-mono tabular-nums text-forensic-stone/60">{frame.timeLabel}</span>}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
