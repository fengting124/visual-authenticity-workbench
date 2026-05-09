import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { PhaseId } from '../hooks/useDetectionPhases';

export interface ScanRegion {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  riskScore: number;
}

type ImageScanCanvasProps = {
  imageSrc: string;
  regions: ScanRegion[];
  activePhase: PhaseId;
  selectedRegionId: string | null;
  onRegionClick: (id: string) => void;
};

function riskColorFor(score: number) {
  if (score >= 75) return '#C95A4A';
  if (score >= 50) return '#D2A64A';
  return '#6F8F72';
}

export function ImageScanCanvas({
  imageSrc,
  regions,
  activePhase,
  selectedRegionId,
  onRegionClick,
}: ImageScanCanvasProps) {
  const prefersReduced = useReducedMotion();
  const isSweeping = activePhase === 'scan-sweep';
  const showRegions = ['expert-spatial', 'expert-frequency', 'expert-style', 'expert-semantic', 'fusion', 'complete'].includes(activePhase);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-forensic-gold/15 bg-graphite-900">
      <img
        src={imageSrc}
        alt="待检测样本"
        className="block h-auto w-full"
        style={{ filter: isSweeping ? 'brightness(0.85)' : 'brightness(1)', transition: 'filter 0.5s' }}
      />

      <AnimatePresence>
        {isSweeping && (
          <motion.div
            key="scan-line"
            className="pointer-events-none absolute left-0 right-0 z-20"
            style={{ height: '2px' }}
            initial={{ top: '0%' }}
            animate={prefersReduced ? undefined : { top: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
          >
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #B88A44, rgba(184,138,68,0.6), #B88A44, transparent)',
                boxShadow: '0 0 12px 4px rgba(184,138,68,0.4)',
              }}
            />
            <div
              className="absolute w-full"
              style={{
                height: '40px',
                top: '-40px',
                background: 'linear-gradient(to top, rgba(184,138,68,0.08), transparent)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isSweeping && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(184,138,68,0.03) 4px)',
          }}
        />
      )}

      <AnimatePresence>
        {showRegions &&
          regions.map((region, index) => {
            const isSelected = selectedRegionId === region.id;
            const riskColor = riskColorFor(region.riskScore);

            return (
              <motion.button
                type="button"
                key={region.id}
                className="absolute z-30 cursor-pointer"
                style={{
                  left: `${region.x}%`,
                  top: `${region.y}%`,
                  width: `${region.width}%`,
                  height: `${region.height}%`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.15, duration: 0.3 }}
                onClick={() => onRegionClick(region.id)}
              >
                <motion.div
                  className="absolute inset-0 rounded"
                  style={{
                    border: `1.5px solid ${riskColor}`,
                    backgroundColor: isSelected ? `${riskColor}22` : `${riskColor}0d`,
                  }}
                  animate={
                    !isSelected && !prefersReduced
                      ? {
                          borderColor: [`${riskColor}99`, `${riskColor}33`, `${riskColor}99`],
                        }
                      : undefined
                  }
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <div className="absolute left-0 top-0 h-2.5 w-2.5" style={{ borderTop: `2px solid ${riskColor}`, borderLeft: `2px solid ${riskColor}` }} />
                <div className="absolute right-0 top-0 h-2.5 w-2.5" style={{ borderTop: `2px solid ${riskColor}`, borderRight: `2px solid ${riskColor}` }} />
                <div className="absolute bottom-0 left-0 h-2.5 w-2.5" style={{ borderBottom: `2px solid ${riskColor}`, borderLeft: `2px solid ${riskColor}` }} />
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5" style={{ borderBottom: `2px solid ${riskColor}`, borderRight: `2px solid ${riskColor}` }} />

                <motion.div
                  className="absolute -top-5 left-0 flex items-center gap-1 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: 'rgba(17,19,21,0.9)',
                    color: riskColor,
                    border: `1px solid ${riskColor}40`,
                  }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: riskColor }} />
                  {region.type}
                </motion.div>
              </motion.button>
            );
          })}
      </AnimatePresence>

      <AnimatePresence>
        {activePhase === 'complete' && (
          <motion.div
            key="verdict-stamp"
            className="absolute right-3 top-3 z-40 flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{
              background: 'rgba(201,90,74,0.15)',
              border: '1.5px solid rgba(201,90,74,0.6)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-forensic-risk">高风险</span>
            <span className="text-sm font-bold tabular-nums text-forensic-risk">87%</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
