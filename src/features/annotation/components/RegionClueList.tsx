import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { FakeRegion } from '../../samples/types';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, toneForStatus } from '../../../shared/utils/format';

type RegionClueListProps = {
  regions: FakeRegion[];
  selectedId: string;
  onSelect: (id: string) => void;
  visibleCount?: number;
  isRunning?: boolean;
};

function AnimatedBar({ value, color }: { value: number; color: string }) {
  const [width, setWidth] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setWidth(value);
      return undefined;
    }
    const timer = window.setTimeout(() => setWidth(value), 80);
    return () => window.clearTimeout(timer);
  }, [value, prefersReduced]);

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-graphite-800">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: '0%' }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
    </div>
  );
}

function scoreColor(confidence: number): string {
  if (confidence >= 75) return '#C95A4A';
  if (confidence >= 60) return '#D2A64A';
  return '#6F8F72';
}

export function RegionClueList({ regions, selectedId, onSelect, visibleCount, isRunning = false }: RegionClueListProps) {
  const count = visibleCount ?? regions.length;
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-3">
      {regions.map((region, index) => {
        const isVisible = index < count;
        const isSelected = selectedId === region.id;
        const color = scoreColor(region.confidence);

        if (!isVisible) {
          return (
            <div key={region.id} className="flex items-center gap-2 rounded-md border border-forensic-stone/10 bg-graphite-900/40 p-4">
              {isRunning && (
                <motion.div
                  className="h-2 w-2 rounded-full bg-forensic-gold/40"
                  animate={prefersReduced ? undefined : { opacity: [0.4, 1, 0.4] }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 1.2, repeat: Infinity, delay: index * 0.3 }}
                />
              )}
              <span className="text-xs text-forensic-stone/30">{isRunning ? '扫描中...' : '待发现'}</span>
            </div>
          );
        }

        return (
          <motion.button
            type="button"
            key={region.id}
            onClick={() => onSelect(region.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.3, ease: 'easeOut' }}
            className={`rounded-md border p-4 text-left transition-colors ${
              isSelected
                ? 'border-forensic-warning bg-forensic-warning/10'
                : 'border-forensic-gold/[0.08] bg-graphite-850 hover:border-forensic-gold/35'
            }`}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  {region.id} · {region.label}
                </p>
                <p className="mt-1 text-xs text-forensic-stone">{region.type}</p>
              </div>
              <StatusBadge tone={toneForStatus(region.reviewStatus)}>{statusLabel(region.reviewStatus)}</StatusBadge>
            </div>
            <p className="mb-3 text-sm leading-6 text-forensic-stone">{region.clue}</p>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-forensic-stone">
                <span>区域置信度</span>
                <motion.span
                  className="font-mono tabular-nums"
                  style={{ color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.12 + 0.4 }}
                >
                  {region.confidence}%
                </motion.span>
              </div>
              <AnimatedBar value={region.confidence} color={color} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
