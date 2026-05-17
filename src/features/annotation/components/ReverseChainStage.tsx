import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../../shared/utils/cn';

export type StageStatus = 'idle' | 'active' | 'complete';

type ReverseChainStageProps = {
  index: number;
  title: string;
  subtitle: string;
  status: StageStatus;
  showConnector?: boolean;
  children: ReactNode;
  className?: string;
};

export function ReverseChainStage({
  index,
  title,
  subtitle,
  status,
  showConnector = true,
  children,
  className,
}: ReverseChainStageProps) {
  const prefersReduced = useReducedMotion();
  const isActive = status === 'active';
  const isComplete = status === 'complete';
  const isIdle = status === 'idle';

  return (
    <div className="relative">
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-lg border bg-graphite-900 transition-colors',
          isIdle && 'border-forensic-stone/10 opacity-50',
          isActive && 'border-forensic-gold/50 bg-graphite-850',
          isComplete && 'border-forensic-olive/35 bg-graphite-850',
          className,
        )}
        animate={
          isActive && !prefersReduced
            ? {
                boxShadow: [
                  '0 0 0 rgba(184,138,68,0)',
                  '0 0 24px rgba(184,138,68,0.18)',
                  '0 0 0 rgba(184,138,68,0)',
                ],
              }
            : { boxShadow: '0 0 0 rgba(184,138,68,0)' }
        }
        transition={
          isActive && !prefersReduced ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 }
        }
      >
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-0.5',
            isActive && 'bg-forensic-gold',
            isComplete && 'bg-forensic-olive',
            isIdle && 'bg-forensic-stone/20',
          )}
        />

        <div className="flex items-start justify-between gap-4 border-b border-forensic-gold/[0.08] px-5 py-3">
          <div className="flex items-start gap-3">
            <span
              className={cn(
                'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded font-mono text-lg font-bold tabular-nums',
                isIdle && 'border border-forensic-stone/20 bg-graphite-900 text-forensic-stone/40',
                isActive && 'border border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold',
                isComplete &&
                  'border border-forensic-olive/40 bg-forensic-olive/10 text-forensic-olive',
              )}
            >
              {String(index).padStart(2, '0')}
            </span>
            <div>
              <h3
                className={cn(
                  'font-serif text-base font-semibold',
                  isIdle ? 'text-forensic-stone/40' : 'text-forensic-text',
                )}
              >
                {title}
              </h3>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-forensic-stone/60">
                {subtitle}
              </p>
            </div>
          </div>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em]',
              isIdle && 'border-forensic-stone/20 text-forensic-stone/40',
              isActive && 'border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold',
              isComplete && 'border-forensic-olive/40 bg-forensic-olive/10 text-forensic-olive',
            )}
          >
            {isIdle && <span className="h-1.5 w-1.5 rounded-full bg-forensic-stone/30" />}
            {isActive && (
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-forensic-gold"
                animate={prefersReduced ? undefined : { opacity: [1, 0.3, 1] }}
                transition={prefersReduced ? undefined : { duration: 0.8, repeat: Infinity }}
              />
            )}
            {isComplete && <span className="h-1.5 w-1.5 rounded-full bg-forensic-olive" />}
            {isIdle && '待执行'}
            {isActive && '进行中'}
            {isComplete && '已完成'}
          </span>
        </div>

        <div className={cn('px-5 py-4', isIdle && 'pointer-events-none')}>{children}</div>
      </motion.div>

      {showConnector && (
        <div className="flex justify-center py-2">
          <div className="flex items-center gap-1">
            <span className="h-3 w-px bg-forensic-gold/30" />
            <span
              className={`h-1.5 w-1.5 rounded-full ${status === 'complete' ? 'bg-forensic-olive' : 'bg-forensic-stone/30'}`}
            />
            <span className="h-3 w-px bg-forensic-gold/30" />
          </div>
        </div>
      )}
    </div>
  );
}
