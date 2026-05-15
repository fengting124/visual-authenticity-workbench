import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { FakeRegion } from '../../samples/types';

type FakeRegionOverlayProps = {
  regions: FakeRegion[];
  selectedId: string;
  onSelect: (id: string) => void;
  visibleCount?: number;
  staggerReveal?: boolean;
};

function confidenceColor(confidence: number) {
  if (confidence >= 75) return { border: 'rgba(201,90,74,0.7)', bg: 'rgba(201,90,74,0.08)', text: '#C95A4A' };
  if (confidence >= 60) return { border: 'rgba(210,166,74,0.7)', bg: 'rgba(210,166,74,0.08)', text: '#D2A64A' };
  return { border: 'rgba(111,143,114,0.7)', bg: 'rgba(111,143,114,0.08)', text: '#6F8F72' };
}

export function FakeRegionOverlay({
  regions,
  selectedId,
  onSelect,
  visibleCount,
  staggerReveal = false,
}: FakeRegionOverlayProps) {
  const prefersReduced = useReducedMotion();
  const count = visibleCount ?? regions.length;
  const visibleRegions = regions.slice(0, count);

  return (
    <AnimatePresence>
      {visibleRegions.map((region, index) => {
        const isSelected = selectedId === region.id;
        const colors = confidenceColor(region.confidence);

        return (
          <motion.button
            type="button"
            key={region.id}
            className="absolute cursor-pointer"
            style={{
              left: `${region.x}%`,
              top: `${region.y}%`,
              width: `${region.width}%`,
              height: `${region.height}%`,
            }}
            initial={staggerReveal ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={staggerReveal ? { delay: index * 0.22, duration: 0.35, ease: 'easeOut' } : { duration: 0.2 }}
            onClick={() => onSelect(region.id)}
          >
            <motion.div
              className="absolute inset-0 rounded"
              style={{
                border: `1.5px solid ${colors.border}`,
                backgroundColor: isSelected ? colors.border.replace('0.7', '0.18') : colors.bg,
              }}
              animate={
                !isSelected && !prefersReduced
                  ? {
                      borderColor: [colors.border, colors.border.replace('0.7', '0.25'), colors.border],
                    }
                  : undefined
              }
              transition={!isSelected && !prefersReduced ? { duration: 2.5, repeat: Infinity } : { duration: 0.2 }}
            />

            <div className="absolute left-0 top-0 h-2.5 w-2.5" style={{ borderLeft: `2px solid ${colors.text}`, borderTop: `2px solid ${colors.text}` }} />
            <div className="absolute right-0 top-0 h-2.5 w-2.5" style={{ borderRight: `2px solid ${colors.text}`, borderTop: `2px solid ${colors.text}` }} />
            <div className="absolute bottom-0 left-0 h-2.5 w-2.5" style={{ borderBottom: `2px solid ${colors.text}`, borderLeft: `2px solid ${colors.text}` }} />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5" style={{ borderBottom: `2px solid ${colors.text}`, borderRight: `2px solid ${colors.text}` }} />

            <motion.div
              className="absolute -top-5 left-0 flex items-center gap-1 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: 'rgba(17,19,21,0.92)',
                color: colors.text,
                border: `1px solid ${colors.border.replace('0.7', '0.35')}`,
              }}
              initial={staggerReveal ? { opacity: 0, y: 4 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: staggerReveal ? index * 0.22 + 0.15 : 0 }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors.text }} />
              {region.id}
              <span className="text-forensic-stone/60">·</span>
              {region.type}
            </motion.div>

            {isSelected && (
              <motion.div
                className="absolute -bottom-5 right-0 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10px] tabular-nums"
                style={{
                  backgroundColor: 'rgba(17,19,21,0.92)',
                  color: colors.text,
                  border: `1px solid ${colors.border.replace('0.7', '0.35')}`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {region.confidence}%
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </AnimatePresence>
  );
}
