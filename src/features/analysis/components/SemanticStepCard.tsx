import { motion } from 'framer-motion';
import type { SemanticStep } from '../types';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, toneForStatus } from '../../../shared/utils/format';

type SemanticStepCardProps = {
  step: SemanticStep;
  index: number;
  active: boolean;
  onSelect?: (id: string) => void;
};

export function SemanticStepCard({ step, index, active, onSelect }: SemanticStepCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(step.id)}
      whileHover={{ borderColor: '#B88A44' }}
      className={`w-full rounded-md border p-4 text-left ${
        active ? 'border-forensic-warning bg-forensic-warning/10' : 'border-forensic-gold/[0.08] bg-graphite-850'
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-forensic-gold/40 bg-forensic-gold/10 text-xs text-forensic-gold">
            {index + 1}
          </span>
          <h3 className="font-semibold">{step.name}</h3>
        </div>
        <StatusBadge tone={toneForStatus(step.status)}>{statusLabel(step.status)}</StatusBadge>
      </div>
      <div className="grid gap-3 text-sm text-forensic-stone">
        <p>
          <span className="text-forensic-text">输入证据：</span>
          {step.input}
        </p>
        <p>
          <span className="text-forensic-text">中间结果：</span>
          {step.result}
        </p>
        <p>
          <span className="text-forensic-text">解释文本：</span>
          {step.explanation}
        </p>
      </div>
    </motion.button>
  );
}
