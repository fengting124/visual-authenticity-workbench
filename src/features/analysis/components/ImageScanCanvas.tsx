import { useEffect, useRef, useState } from 'react';
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
  riskScore: number;
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
  riskScore,
  onRegionClick,
}: ImageScanCanvasProps) {
  const prefersReduced = useReducedMotion();
  const [flashTrigger, setFlashTrigger] = useState(0);
  const prevPhaseRef = useRef(activePhase);
  const isSweeping = activePhase === 'scan-sweep';
  const showRegions = ['expert-spatial', 'expert-frequency', 'expert-style', 'expert-semantic', 'fusion', 'complete'].includes(activePhase);

  useEffect(() => {
    if (prevPhaseRef.current === 'scan-sweep' && activePhase !== 'scan-sweep') {
      setFlashTrigger((current) => current + 1);
    }
    prevPhaseRef.current = activePhase;
  }, [activePhase]);

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
            transition={prefersReduced ? { duration: 0 } : { duration: 1.6, ease: 'linear', repeat: Infinity }}
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
        {flashTrigger > 0 && (
          <motion.div
            key={`flash-${flashTrigger}`}
            className="pointer-events-none absolute inset-0 z-[25] bg-forensic-text"
            initial={{ opacity: 0.18 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

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
                  transition={!isSelected && !prefersReduced ? { duration: 2.5, repeat: Infinity } : { duration: 0.2 }}
                />
                <div className="absolute left-0 top-0 h-2.5 w-2.5" style={{ borderLeft: `2px solid ${riskColor}`, borderTop: `2px solid ${riskColor}` }} />
                <div className="absolute right-0 top-0 h-2.5 w-2.5" style={{ borderRight: `2px solid ${riskColor}`, borderTop: `2px solid ${riskColor}` }} />
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
            className="absolute right-4 top-4 z-40 overflow-hidden rounded-lg"
            initial={{ scale: 0.7, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.15 }}
            style={{
              background: 'linear-gradient(135deg, rgba(201,90,74,0.18), rgba(201,90,74,0.08))',
              border: '1.5px solid rgba(201,90,74,0.7)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(201,90,74,0.25)',
            }}
          >
            <div className="border-b border-forensic-risk/30 bg-forensic-risk/15 px-3 py-1">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-forensic-risk">FORENSIC VERDICT</div>
            </div>
            <div className="px-3 py-2">
              <div className="font-mono text-sm font-bold uppercase tracking-wide text-forensic-risk">AI-GENERATED</div>
              <div className="mt-0.5 flex items-baseline gap-1 font-mono tabular-nums">
                <span className="text-xs text-forensic-stone">CONFIDENCE</span>
                <span className="text-base font-bold text-forensic-risk">{riskScore}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
