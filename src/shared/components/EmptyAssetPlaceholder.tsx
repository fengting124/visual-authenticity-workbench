import { motion, useReducedMotion } from 'framer-motion';
import { ScanSearch } from 'lucide-react';

type EmptyAssetPlaceholderProps = {
  label: string;
  detail?: string;
};

export function EmptyAssetPlaceholder({ label, detail }: EmptyAssetPlaceholderProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative flex h-full min-h-52 flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-forensic-gold/[0.08] bg-graphite-950/50 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(184,138,68,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,138,68,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <motion.div
        className="relative mb-3"
        animate={prefersReduced ? undefined : { opacity: [0.5, 0.8, 0.5] }}
        transition={prefersReduced ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ScanSearch className="h-8 w-8 text-forensic-gold/40" />
      </motion.div>
      <p className="relative text-sm font-medium text-forensic-stone/60">{label}</p>
      {detail && <p className="relative mt-1 max-w-[200px] text-xs leading-5 text-forensic-stone/40">{detail}</p>}
    </div>
  );
}
