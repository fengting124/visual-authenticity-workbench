import type { ReactNode } from 'react';
import { StatusTone } from '../types/common';
import { cn } from '../utils/cn';

type StatusBadgeProps = {
  children: ReactNode;
  tone?: StatusTone;
};

const toneClass: Record<StatusTone, string> = {
  neutral: 'border-graphite-800 text-forensic-stone bg-graphite-850',
  success: 'border-forensic-olive/40 text-forensic-olive bg-forensic-olive/10',
  warning: 'border-forensic-warning/40 text-forensic-warning bg-forensic-warning/10',
  risk: 'border-forensic-risk/40 text-forensic-risk bg-forensic-risk/10',
};

export function StatusBadge({ children, tone = 'neutral' }: StatusBadgeProps) {
  return (
    <span className={cn('inline-flex rounded border px-2 py-1 text-xs font-medium', toneClass[tone])}>
      {children}
    </span>
  );
}
