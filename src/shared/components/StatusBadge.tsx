import type { ReactNode } from 'react';
import { StatusTone } from '../types/common';
import { cn } from '../utils/cn';

type StatusBadgeProps = {
  children: ReactNode;
  tone?: StatusTone;
};

const toneClass: Record<StatusTone, string> = {
  neutral: 'border-white/10 text-[#7a8aa0] bg-white/[0.04]',
  success: 'border-[#3ecf8e]/35 text-[#3ecf8e] bg-[#3ecf8e]/10',
  warning: 'border-[#d4a843]/35 text-[#d4a843] bg-[#d4a843]/10',
  risk: 'border-[#e05353]/35 text-[#e05353] bg-[#e05353]/10',
};

export function StatusBadge({ children, tone = 'neutral' }: StatusBadgeProps) {
  return (
    <span className={cn('inline-flex rounded border px-2 py-1 text-xs font-medium', toneClass[tone])}>
      {children}
    </span>
  );
}
