import { motion, useReducedMotion } from 'framer-motion';

type MaskBox = {
  id: string;
  bbox: [number, number, number, number];
  label?: string;
  highlighted?: boolean;
};

type SamMaskOverlayProps = {
  imageSrc: string;
  imageAlt: string;
  masks: MaskBox[];
  showScanLine?: boolean;
  className?: string;
};

export function SamMaskOverlay({
  imageSrc,
  imageAlt,
  masks,
  showScanLine = false,
  className,
}: SamMaskOverlayProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden rounded border border-forensic-gold/15 bg-graphite-950 ${className ?? ''}`}
    >
      <img src={imageSrc} alt={imageAlt} className="block h-full w-full object-cover opacity-95" />

      {showScanLine && !prefersReduced && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 z-10 h-0.5"
          style={{
            background: 'linear-gradient(90deg, transparent, #B88A44, transparent)',
            boxShadow: '0 0 10px 2px rgba(184,138,68,0.5)',
          }}
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
        />
      )}

      {masks.map((mask, index) => (
        <motion.div
          key={mask.id}
          className="absolute z-20"
          style={{
            left: `${mask.bbox[0]}%`,
            top: `${mask.bbox[1]}%`,
            width: `${mask.bbox[2]}%`,
            height: `${mask.bbox[3]}%`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.08, duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 rounded-sm"
            style={{
              border: mask.highlighted ? '2px solid #C95A4A' : '1.5px solid rgba(184,138,68,0.6)',
              background: mask.highlighted ? 'rgba(201,90,74,0.18)' : 'rgba(184,138,68,0.08)',
            }}
            animate={
              mask.highlighted && !prefersReduced
                ? { borderColor: ['#C95A4A', 'rgba(201,90,74,0.5)', '#C95A4A'] }
                : undefined
            }
            transition={
              mask.highlighted && !prefersReduced ? { duration: 1.4, repeat: Infinity } : undefined
            }
          />
          {mask.highlighted && (
            <>
              <span className="absolute -left-px -top-px h-2 w-2 border-l-2 border-t-2 border-forensic-risk" />
              <span className="absolute -right-px -top-px h-2 w-2 border-r-2 border-t-2 border-forensic-risk" />
              <span className="absolute -bottom-px -left-px h-2 w-2 border-b-2 border-l-2 border-forensic-risk" />
              <span className="absolute -bottom-px -right-px h-2 w-2 border-b-2 border-r-2 border-forensic-risk" />
            </>
          )}
          {mask.label && (
            <span
              className="absolute -top-5 left-0 whitespace-nowrap rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
              style={{
                background: 'rgba(17,19,21,0.92)',
                color: mask.highlighted ? '#C95A4A' : '#B88A44',
                border: mask.highlighted
                  ? '1px solid rgba(201,90,74,0.5)'
                  : '1px solid rgba(184,138,68,0.3)',
              }}
            >
              {mask.label}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
