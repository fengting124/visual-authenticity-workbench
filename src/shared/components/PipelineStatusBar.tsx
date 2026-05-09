import { Check, Circle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

type PipelineStatusBarProps = {
  steps: string[];
  currentStep: number;
  complete?: boolean;
};

export function PipelineStatusBar({ steps, currentStep, complete = false }: PipelineStatusBarProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="grid gap-2 rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-3 backdrop-blur-xl"
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((step, index) => {
        const done = complete || index < currentStep;
        const active = !complete && index === currentStep;
        const isPreviousComplete = index > 0 && (complete || index - 1 < currentStep);

        return (
          <div
            key={step}
            className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-lg border px-3 py-2 text-sm ${
              active
                ? 'border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold'
                : done
                  ? 'border-forensic-olive/35 bg-forensic-olive/10 text-forensic-olive'
                  : 'border-forensic-gold/[0.08] bg-graphite-800 text-forensic-stone'
            }`}
          >
            {active && !prefersReduced && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'rgba(184,138,68,0.35)' }}
              />
            )}
            {isPreviousComplete && active && !prefersReduced && (
              <motion.div
                className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-forensic-gold"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            )}
            <span className="relative z-10">
              {done ? (
                <motion.span
                  className="block"
                  initial={prefersReduced ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Check className="h-4 w-4 text-forensic-olive" />
                </motion.span>
              ) : (
                <Circle className="h-3 w-3" />
              )}
            </span>
            <span className="relative z-10">{step}</span>
          </div>
        );
      })}
    </div>
  );
}
