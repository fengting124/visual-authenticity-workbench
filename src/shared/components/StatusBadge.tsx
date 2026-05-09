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
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium tabular-nums',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
