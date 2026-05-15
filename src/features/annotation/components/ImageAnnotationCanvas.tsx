import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { EvidenceSample } from '../../samples/types';
import { EmptyAssetPlaceholder } from '../../../shared/components/EmptyAssetPlaceholder';
import { FakeRegionOverlay } from './FakeRegionOverlay';

type ImageAnnotationCanvasProps = {
  sample: EvidenceSample;
  selectedRegionId: string;
  onSelectRegion: (id: string) => void;
  imageSrc?: string | null;
  annotationPhase: number;
  isRunning: boolean;
  isComplete: boolean;
};

export function ImageAnnotationCanvas({
  sample,
  selectedRegionId,
  onSelectRegion,
  imageSrc,
  annotationPhase,
  isRunning,
  isComplete,
}: ImageAnnotationCanvasProps) {
  const prefersReduced = useReducedMotion();
  const resolvedImageSrc = imageSrc ?? sample.assetSrc;
  const showRegions = annotationPhase >= 2 || isComplete;
  const visibleCount = isComplete || annotationPhase >= 3 ? sample.regions.length : annotationPhase === 2 ? sample.regions.length : 0;
  const isSweeping = isRunning && annotationPhase === 1;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-900">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(135deg,rgba(184,138,68,.12)_1px,transparent_1px)] [background-size:18px_18px]" />

      {resolvedImageSrc ? (
        <motion.img
          src={resolvedImageSrc}
          alt="导入样本"
          className="h-full w-full object-contain"
          animate={{
            opacity: annotationPhase === 0 && isRunning ? [0.6, 1] : 0.9,
            filter: isSweeping ? 'brightness(0.8)' : 'brightness(1)',
          }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <EmptyAssetPlaceholder label={sample.id} detail="本地视觉占位，叠加候选证据区域" />
      )}

      <AnimatePresence>
        {isSweeping && (
          <motion.div
            key="annotation-scan-line"
            className="pointer-events-none absolute left-0 right-0 z-20"
            style={{ height: '2px' }}
            initial={{ top: '0%' }}
            animate={prefersReduced ? undefined : { top: '100%' }}
            exit={{ opacity: 0 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 1.4, ease: 'linear', repeat: Infinity }}
          >
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #B88A44, rgba(184,138,68,0.5), #B88A44, transparent)',
                boxShadow: '0 0 10px 3px rgba(184,138,68,0.35)',
              }}
            />
            <div
              className="absolute w-full"
              style={{
                height: '32px',
                top: '-32px',
                background: 'linear-gradient(to top, rgba(184,138,68,0.07), transparent)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isSweeping && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(184,138,68,0.025) 4px)',
          }}
        />
      )}

      {showRegions && (
        <FakeRegionOverlay
          regions={sample.regions}
          selectedId={selectedRegionId}
          onSelect={onSelectRegion}
          visibleCount={visibleCount}
          staggerReveal={annotationPhase === 2}
        />
      )}

      <AnimatePresence>
        {isComplete && (
          <motion.div
            key="annotation-complete"
            className="absolute right-3 top-3 z-40 flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{
              background: 'rgba(111,143,114,0.15)',
              border: '1.5px solid rgba(111,143,114,0.5)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ scale: 0.6, opacity: 0, rotate: 6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.2 }}
          >
            <span className="text-xs font-bold tracking-widest text-forensic-olive">标注完成</span>
            <span className="text-sm font-bold tabular-nums text-forensic-olive">{sample.regions.length} 区域</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRunning && (
          <motion.div
            key="phase-indicator"
            className="absolute bottom-3 left-3 z-40 flex items-center gap-2 rounded-md px-2.5 py-1 text-[11px] font-medium"
            style={{
              background: 'rgba(17,19,21,0.85)',
              border: '1px solid rgba(184,138,68,0.25)',
              backdropFilter: 'blur(6px)',
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-forensic-gold"
              animate={prefersReduced ? undefined : { opacity: [1, 0.3, 1] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.8, repeat: Infinity }}
            />
            <span className="text-forensic-gold">
              {annotationPhase === 0 && '读取中...'}
              {annotationPhase === 1 && '扫描中...'}
              {annotationPhase === 2 && '生成线索...'}
              {annotationPhase === 3 && '固化结果...'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
