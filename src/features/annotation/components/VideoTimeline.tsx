import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { VideoSegmentEvidence } from '../../samples/types';

type VideoTimelineProps = {
  segments: VideoSegmentEvidence[];
  selectedId: string;
  onSelect: (id: string) => void;
  visibleCount?: number;
  isScanning?: boolean;
  scanProgress?: number;
  durationSeconds?: number;
};

function parseTimecode(value: string) {
  const parts = value.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return Number(value) || 0;
}

function formatTick(seconds: number) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remaining = Math.round(safeSeconds - minutes * 60);
  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

export function VideoTimeline({
  segments,
  selectedId,
  onSelect,
  visibleCount,
  isScanning = false,
  scanProgress = 0,
  durationSeconds = 30,
}: VideoTimelineProps) {
  const prefersReduced = useReducedMotion();
  const count = visibleCount ?? segments.length;
  const totalDuration = Number.isFinite(durationSeconds) && durationSeconds > 0 ? durationSeconds : 30;
  const ticks = [0, totalDuration / 3, (totalDuration / 3) * 2, totalDuration];

  return (
    <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-950 p-4">
      <div className="mb-3 flex justify-between text-xs text-forensic-stone">
        {ticks.map((tick) => (
          <span key={tick}>{formatTick(tick)}</span>
        ))}
      </div>

      <div className="relative h-16 overflow-hidden rounded bg-graphite-850">
        <div className="absolute inset-x-0 top-1/2 h-px bg-graphite-800" />
        <div className="absolute bottom-0 left-[37%] top-0 w-px bg-forensic-gold/40" />

        <AnimatePresence>
          {isScanning && (
            <motion.div
              key="scan-progress"
              className="absolute bottom-0 top-0 z-10 w-0.5"
              style={{ backgroundColor: '#B88A44', boxShadow: '0 0 8px rgba(184,138,68,0.6)' }}
              initial={{ left: '0%' }}
              animate={prefersReduced ? undefined : { left: `${scanProgress}%` }}
              transition={{ duration: 0.4, ease: 'linear' }}
            >
              <div
                className="absolute inset-y-0 right-0"
                style={{
                  width: `${scanProgress * 0.4}px`,
                  background: 'linear-gradient(to left, rgba(184,138,68,0.15), transparent)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isScanning && (
          <motion.div
            className="absolute bottom-0 left-0 top-0 z-0"
            style={{ background: 'rgba(184,138,68,0.04)' }}
            animate={{ width: `${scanProgress}%` }}
            transition={{ duration: 0.4, ease: 'linear' }}
          />
        )}

        {segments.map((segment, index) => {
          const isVisible = index < count;
          const isSelected = selectedId === segment.id;
          const start = parseTimecode(segment.start);
          const end = parseTimecode(segment.end);
          const left = Math.max(0, Math.min((start / totalDuration) * 100, 98));
          const width = Math.max(5, Math.min(((end - start) / totalDuration) * 100, 100 - left));

          if (!isVisible) {
            return (
              <motion.div
                key={`pending-${segment.id}`}
                className="absolute top-4 h-8 rounded border border-dashed border-forensic-stone/20 bg-transparent"
                style={{ left: `${left}%`, width: `${width}%` }}
                animate={
                  isScanning && !prefersReduced
                    ? {
                        borderColor: ['rgba(168,162,154,0.2)', 'rgba(184,138,68,0.3)', 'rgba(168,162,154,0.2)'],
                      }
                    : undefined
                }
                transition={isScanning && !prefersReduced ? { duration: 1.5, repeat: Infinity, delay: index * 0.4 } : { duration: 0.2 }}
              />
            );
          }

          return (
            <motion.button
              type="button"
              key={segment.id}
              whileHover={{ y: -2 }}
              onClick={() => onSelect(segment.id)}
              className={`absolute top-4 h-8 rounded border px-2 text-xs ${
                isSelected
                  ? 'border-forensic-risk bg-forensic-risk/20 text-forensic-risk'
                  : 'border-forensic-warning/50 bg-forensic-warning/15 text-forensic-warning'
              }`}
              style={{ left: `${left}%`, width: `${width}%` }}
              initial={{ opacity: 0, scaleY: 0.5 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: index * 0.18, duration: 0.3, ease: 'easeOut' }}
            >
              <span className="flex h-full items-center gap-1 truncate">
                <span className="font-medium">{segment.id}</span>
                <span className="opacity-70">·</span>
                <motion.span className="font-mono tabular-nums" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.18 + 0.2 }}>
                  {segment.riskScore}%
                </motion.span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-3 text-[10px] text-forensic-stone/60">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-3 rounded-sm bg-forensic-warning/50" />
          可疑片段
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-3 rounded-sm bg-forensic-risk/50" />
          高风险片段
        </span>
        {isScanning && (
          <span className="ml-auto flex items-center gap-1 text-forensic-gold">
            <motion.span
              animate={prefersReduced ? undefined : { opacity: [1, 0.3, 1] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.8, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-forensic-gold"
            />
            扫描 {Math.round(scanProgress)}%
          </span>
        )}
      </div>
    </div>
  );
}
