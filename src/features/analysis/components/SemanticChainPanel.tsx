import { CheckCircle2, Lock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SemanticStep } from '../types';
import type { PhaseId } from '../hooks/useDetectionPhases';
import { SemanticStepCard } from './SemanticStepCard';

type SemanticChainPanelProps = {
  steps: SemanticStep[];
  compact?: boolean;
  activeStepId?: string;
  activePhase?: PhaseId;
  isPhaseComplete?: (id: PhaseId) => boolean;
  onSelectStep?: (id: string) => void;
};

const stepVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.18, duration: 0.35, ease: 'easeOut' },
  }),
};

function fallbackLockedPhase(stepId: string): PhaseId {
  const map: Record<string, PhaseId> = {
    global: 'semantic-chain',
    local: 'expert-spatial',
    logic: 'expert-semantic',
    explain: 'complete',
  };
  return map[stepId] ?? 'semantic-chain';
}

export function SemanticChainPanel({
  steps,
  activeStepId,
  activePhase = 'complete',
  isPhaseComplete,
  onSelectStep,
}: SemanticChainPanelProps) {
  const prefersReduced = useReducedMotion();
  const isUnlocked = (phaseId: PhaseId) => (phaseId === 'complete' ? activePhase === 'complete' : (isPhaseComplete?.(phaseId) ?? true));

  return (
    <div className="space-y-4">
      {steps.length > 0 && (
        <div className="space-y-3">
          {steps.map((step, index) => {
            const lockedUntilPhase = (step.lockedUntilPhase as PhaseId | undefined) ?? fallbackLockedPhase(step.id);
            const locked = !isUnlocked(lockedUntilPhase);
            const processing = activePhase === lockedUntilPhase && !locked;

            return locked ? (
              <div
                key={step.id}
                className="flex items-center gap-2 rounded-lg border border-forensic-stone/10 bg-graphite-900/50 p-3"
              >
                <Lock size={12} className="text-forensic-stone/30" />
                <span className="text-xs text-forensic-stone/30">{step.name}</span>
              </div>
            ) : (
              <motion.div
                key={step.id}
                variants={stepVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                className={processing ? 'rounded-md' : undefined}
              >
                <motion.div
                  className="rounded-md"
                  animate={
                    processing && !prefersReduced
                      ? { boxShadow: ['0 0 0 rgba(184,138,68,0)', '0 0 18px rgba(184,138,68,0.18)', '0 0 0 rgba(184,138,68,0)'] }
                      : undefined
                  }
                  transition={{ duration: 1.1, repeat: Infinity }}
                >
                  <div className="mb-2 flex items-center gap-2 text-xs text-forensic-olive">
                    <CheckCircle2 size={12} />
                    阶段已解锁
                  </div>
                  <SemanticStepCard step={step} index={index} active={step.id === activeStepId || processing} onSelect={onSelectStep} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
