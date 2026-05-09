import { motion } from 'framer-motion';
import type { FakeRegion } from '../../samples/types';

type FakeRegionOverlayProps = {
  regions: FakeRegion[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function FakeRegionOverlay({ regions, selectedId, onSelect }: FakeRegionOverlayProps) {
  return (
    <>
      {regions.map((region) => (
        <motion.button
          type="button"
          key={region.id}
          whileHover={{ scale: 1.01 }}
          onClick={() => onSelect(region.id)}
          className={`absolute rounded-sm border text-left shadow-[0_0_0_1px_rgba(0,0,0,.45)] ${
            selectedId === region.id
              ? 'border-forensic-warning bg-forensic-warning/20'
              : 'border-forensic-gold bg-forensic-gold/10'
          }`}
          style={{
            left: `${region.x}%`,
            top: `${region.y}%`,
            width: `${region.width}%`,
            height: `${region.height}%`,
          }}
        >
          <span className="absolute -top-7 left-0 rounded border border-forensic-gold/40 bg-graphite-950 px-2 py-1 text-xs text-forensic-gold">
            {region.id}
          </span>
        </motion.button>
      ))}
    </>
  );
}
