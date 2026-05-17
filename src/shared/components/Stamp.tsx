import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

type StampTone = 'red' | 'gold' | 'olive';

type StampProps = {
  children: ReactNode;
  tone?: StampTone;
  rotate?: number;
  className?: string;
  animate?: boolean;
};

const toneStyles: Record<StampTone, { border: string; color: string; bg: string }> = {
  red: { border: '#A64545', color: '#A64545', bg: 'rgba(166,69,69,0.06)' },
  gold: { border: '#B88A44', color: '#B88A44', bg: 'rgba(184,138,68,0.06)' },
  olive: { border: '#6F8F72', color: '#6F8F72', bg: 'rgba(111,143,114,0.06)' },
};

export function Stamp({
  children,
  tone = 'red',
  rotate = -4,
  className,
  animate = true,
}: StampProps) {
  const style = toneStyles[tone];

  return (
    <motion.span
      initial={animate ? { scale: 1.4, rotate: rotate - 8, opacity: 0 } : undefined}
      animate={animate ? { scale: 1, rotate, opacity: 0.92 } : { rotate, opacity: 0.92 }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn(
        'relative inline-flex items-center justify-center px-3.5 py-1 font-serif text-[11px] font-bold uppercase tracking-[0.18em]',
        className,
      )}
      style={{
        border: `2px solid ${style.border}`,
        color: style.color,
        background: style.bg,
      }}
    >
      <span
        className="pointer-events-none absolute inset-[-2px] rounded-[2px]"
        style={{ border: `2px solid ${style.border}`, opacity: 0.35 }}
      />
      {children}
    </motion.span>
  );
}
