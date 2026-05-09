import { motion, useReducedMotion } from 'framer-motion';
import type { FakeRegion } from '../../samples/types';

type FakeRegionOverlayProps = {
  regions: FakeRegion[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function FakeRegionOverlay({ regions, selectedId, onSelect }: FakeRegionOverlayProps) {
  const prefersReduced = useReducedMotion();

  return (
    <>
      {regions.map((region) => (
        <motion.button
          type="button"
          key={region.id}
          className={`absolute cursor-pointer rounded border text-left transition-colors duration-150 ${
            selectedId === region.id
              ? 'border-forensic-gold bg-forensic-gold/10'
              : 'border-forensic-risk/60 bg-forensic-risk/5'
          }`}
          style={{
            left: `${region.x}%`,
            top: `${region.y}%`,
            width: `${region.width}%`,
            height: `${region.height}%`,
          }}
          animate={
            selectedId !== region.id && !prefersReduced
              ? {
                  borderColor: ['rgba(201,90,74,0.6)', 'rgba(201,90,74,0.2)', 'rgba(201,90,74,0.6)'],
                }
              : undefined
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => onSelect(region.id)}
        >
          <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-graphite-900 px-1 py-0.5 text-[10px] text-forensic-risk border border-forensic-risk/30">
            {region.type}
          </span>
        </motion.button>
      ))}
    </>
  );
}
