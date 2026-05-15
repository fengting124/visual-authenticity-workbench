import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

type StatusBadgeProps = {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'risk' | 'olive' | 'gold';
  className?: string;
};

const toneClass: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  neutral: 'border-forensic-gold/[0.08] text-forensic-stone bg-graphite-800',
  success: 'border-forensic-olive/35 text-forensic-olive bg-forensic-olive/10',
  warning: 'border-forensic-warning/35 text-forensic-warning bg-forensic-warning/10',
  risk: 'border-forensic-risk/35 text-forensic-risk bg-forensic-risk/10',
  olive: 'border-forensic-olive/35 text-forensic-olive bg-forensic-olive/10',
  gold: 'border-forensic-gold/35 text-forensic-gold bg-forensic-gold/10',
};

export function StatusBadge({ children, tone = 'neutral', className }: StatusBadgeProps) {
  const prefersReduced = useReducedMotion();
  const childStr = typeof children === 'string' ? children : '';
  const isActive =
    tone === 'warning' &&
    (childStr.includes('处理中') || childStr.includes('分析中') || childStr.includes('待复核') || childStr.includes('运行中'));
  const isRunning = tone === 'warning' && childStr.includes('处理中');

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium tabular-nums',
        toneClass[tone],
        className,
      )}
    >
      {isActive && (
        <motion.span
          className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
          style={{
            backgroundColor: '#D2A64A',
          }}
          animate={isRunning && !prefersReduced ? { opacity: [1, 0.3, 1], scale: [1, 1.3, 1] } : { opacity: 1 }}
          transition={isRunning && !prefersReduced ? { duration: 1, repeat: Infinity } : { duration: 0 }}
        />
      )}
      {children}
    </span>
  );
}
