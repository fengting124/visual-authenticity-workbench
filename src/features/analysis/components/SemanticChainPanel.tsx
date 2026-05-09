import { Background, Edge, Node, ReactFlow } from '@xyflow/react';
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
  compact = false,
  activeStepId,
  activePhase = 'complete',
  isPhaseComplete,
  onSelectStep,
}: SemanticChainPanelProps) {
  const prefersReduced = useReducedMotion();
  const isUnlocked = (phaseId: PhaseId) => (phaseId === 'complete' ? activePhase === 'complete' : (isPhaseComplete?.(phaseId) ?? true));

  const nodes: Node[] = steps.map((step, index) => {
    const lockedUntilPhase = (step.lockedUntilPhase as PhaseId | undefined) ?? fallbackLockedPhase(step.id);
    const locked = !isUnlocked(lockedUntilPhase);
    return {
      id: step.id,
      position: { x: index * 220, y: 20 },
      data: { label: step.name },
      style: {
        border: locked ? '1px solid rgba(168,162,154,0.12)' : step.id === activeStepId ? '1px solid #D2A64A' : '1px solid #2D3338',
        background: locked ? 'rgba(26,29,32,0.5)' : step.id === activeStepId ? 'rgba(210,166,74,.12)' : '#202428',
        color: locked ? 'rgba(168,162,154,0.38)' : '#F3F0EA',
        width: 170,
        fontSize: 12,
      },
    };
  });

  const edges: Edge[] = steps.slice(1).map((step, index) => ({
    id: `${steps[index].id}-${step.id}`,
    source: steps[index].id,
    target: step.id,
    style: { stroke: '#6F8F72' },
  }));

  return (
    <div className="space-y-4">
      {!compact && (
        <div className="h-40 rounded-md border border-forensic-gold/[0.08] bg-graphite-950">
          <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false}>
            <Background color="#2D3338" gap={18} />
          </ReactFlow>
        </div>
      )}
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
