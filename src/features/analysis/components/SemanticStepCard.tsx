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

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.22 },
  }),
};

const methodLabels: Record<string, string> = {
  global: 'CLIP · Zero-Shot Classification',
  local: 'Grounding DINO · Open-Vocabulary Detection',
  logic: 'ConceptNet ⊕ LLM · Dual-Branch Verification',
};

function MethodTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-forensic-gold/30 bg-forensic-gold/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
      {children}
    </span>
  );
}

function GlobalSemanticView({ step }: { step: SemanticStep }) {
  return (
    <div className="space-y-2">
      {step.sceneCandidates?.map((candidate, index) => (
        <motion.div key={candidate.name} custom={index} initial="hidden" animate="visible" variants={rowVariants}>
          <div className="mb-1 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className={candidate.selected ? 'font-semibold text-forensic-gold' : 'text-forensic-stone'}>
                {candidate.name}
              </span>
              {candidate.selected && (
                <span className="rounded border border-forensic-gold/30 bg-forensic-gold/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-forensic-gold">
                  SELECTED
                </span>
              )}
            </div>
            <span className={`font-mono tabular-nums ${candidate.selected ? 'text-forensic-gold' : 'text-forensic-stone'}`}>
              {candidate.score.toFixed(2)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-graphite-800">
            <motion.div
              className={`h-full rounded-full ${candidate.selected ? 'bg-forensic-gold' : 'bg-forensic-stone/35'}`}
              initial={{ width: '0%' }}
              animate={{ width: `${candidate.score * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.45, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function LocalConsistencyView({ step }: { step: SemanticStep }) {
  return (
    <div className="grid gap-3 md:grid-cols-[160px_1fr]">
      <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3">
        <p className="mb-3 text-xs font-medium text-forensic-text">实体列表</p>
        <div className="space-y-2">
          {step.entities?.map((entity, index) => (
            <motion.div
              key={entity.name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={rowVariants}
              className="flex items-center gap-2 text-xs"
            >
              <span
                className={`h-1.5 w-1.5 border ${
                  entity.outlier ? 'border-forensic-risk bg-forensic-risk/20' : 'border-forensic-olive bg-forensic-olive/20'
                }`}
              />
              <span className={entity.outlier ? 'font-semibold text-forensic-risk' : 'text-forensic-stone'}>
                {entity.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="space-y-2 rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3">
        {step.entities?.map((entity, index) => (
          <motion.div
            key={entity.name}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={rowVariants}
            className="flex items-center justify-between gap-3 rounded border border-forensic-gold/[0.06] bg-graphite-850 px-3 py-2 text-xs"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${entity.outlier ? 'bg-forensic-risk' : 'bg-forensic-olive'}`} />
              <span className={entity.outlier ? 'font-semibold text-forensic-risk' : 'text-forensic-text'}>
                {entity.name}
              </span>
              {entity.outlier && (
                <span className="rounded border border-forensic-risk/35 bg-forensic-risk/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-forensic-risk">
                  OUTLIER
                </span>
              )}
            </div>
            <span className={`font-mono tabular-nums ${entity.outlier ? 'text-forensic-risk' : 'text-forensic-olive'}`}>
              d={entity.distance.toFixed(2)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LogicVerificationView({ step }: { step: SemanticStep }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">Knowledge Graph (ConceptNet)</p>
          <div className="space-y-2">
            {step.triplets?.map((triplet, index) => (
              <motion.div key={`${triplet.h}-${triplet.r}-${triplet.t}`} custom={index} initial="hidden" animate="visible" variants={rowVariants} className="rounded bg-graphite-850 p-2 text-xs">
                <p className="text-forensic-text">⟨{triplet.h}, {triplet.r}, {triplet.t}⟩</p>
                <p className="mt-1 font-mono tabular-nums text-forensic-warning">E_KG = {triplet.kgEnergy.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">LLM Reasoning</p>
          <div className="space-y-2">
            {step.triplets?.map((triplet, index) => (
              <motion.div key={`${triplet.h}-${triplet.r}-llm`} custom={index} initial="hidden" animate="visible" variants={rowVariants} className="rounded bg-graphite-850 p-2 text-xs">
                <p className="text-forensic-stone">{triplet.h} 与 {triplet.t} 的关系存在常识违和。</p>
                <p className="mt-1 font-mono tabular-nums text-forensic-risk">E_LLM = {triplet.llmScore.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <motion.div custom={2} initial="hidden" animate="visible" variants={rowVariants} className="rounded-md border border-forensic-gold/20 bg-forensic-gold/5 p-3">
        <p className="font-mono text-xs tabular-nums text-forensic-gold">
          P_final = Sigmoid(α · E_KG + β · E_LLM)
        </p>
        <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px] tabular-nums">
          <span className="rounded border border-forensic-gold/[0.08] bg-graphite-900 px-2 py-1 text-forensic-stone">α={step.alpha?.toFixed(1)}</span>
          <span className="rounded border border-forensic-gold/[0.08] bg-graphite-900 px-2 py-1 text-forensic-stone">β={step.beta?.toFixed(1)}</span>
          <span className="rounded border border-forensic-gold/[0.08] bg-graphite-900 px-2 py-1 text-forensic-warning">E_KG={step.eKG?.toFixed(2)}</span>
          <span className="rounded border border-forensic-gold/[0.08] bg-graphite-900 px-2 py-1 text-forensic-risk">E_LLM={step.eLLM?.toFixed(2)}</span>
          <span className="rounded border border-forensic-gold/30 bg-forensic-gold/10 px-2 py-1 text-forensic-gold">→ P_final=0.93</span>
        </div>
      </motion.div>
    </div>
  );
}

function StepBody({ step }: { step: SemanticStep }) {
  if (step.id === 'global') return <GlobalSemanticView step={step} />;
  if (step.id === 'local') return <LocalConsistencyView step={step} />;
  if (step.id === 'logic') return <LogicVerificationView step={step} />;
  return null;
}

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
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-forensic-gold/40 bg-forensic-gold/10 font-mono text-xs tabular-nums text-forensic-gold">
            {index + 1}
          </span>
          <div>
            <h3 className="font-semibold">{step.name}</h3>
            <p className="mt-1 text-xs text-forensic-stone">{step.method}</p>
          </div>
        </div>
        <StatusBadge tone={toneForStatus(step.status)}>{statusLabel(step.status)}</StatusBadge>
      </div>

      <div className="mb-4">
        <MethodTag>{methodLabels[step.id] ?? step.method ?? 'Semantic Reasoning'}</MethodTag>
      </div>

      <div className="mb-4 grid gap-2 text-sm text-forensic-stone">
        <p>
          <span className="text-forensic-text">输入证据：</span>
          {step.input}
        </p>
        <p>
          <span className="text-forensic-text">中间结果：</span>
          {step.result}
        </p>
      </div>

      <StepBody step={step} />

      <p className="mt-4 text-xs leading-6 text-forensic-stone">
        <span className="text-forensic-text">解释文本：</span>
        {step.explanation}
      </p>
    </motion.button>
  );
}
