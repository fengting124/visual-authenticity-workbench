import { motion, useReducedMotion } from 'framer-motion';
import { expertMeterConfigs } from '../data';
import type { PhaseId } from '../hooks/useDetectionPhases';

type ExpertMeterPanelProps = {
  activePhase: PhaseId;
  isPhaseComplete: (id: PhaseId) => boolean;
  isPhaseActive: (id: PhaseId) => boolean;
  onExpertClick: (phaseId: PhaseId) => void;
  selectedExpert: PhaseId | null;
};

function getRiskColor(score: number) {
  if (score >= 75) return { bar: '#C95A4A', glow: 'rgba(201,90,74,0.3)', text: 'text-forensic-risk' };
  if (score >= 50) return { bar: '#D2A64A', glow: 'rgba(210,166,74,0.3)', text: 'text-forensic-warning' };
  return { bar: '#6F8F72', glow: 'rgba(111,143,114,0.3)', text: 'text-forensic-olive' };
}

export function ExpertMeterPanel({
  isPhaseComplete,
  isPhaseActive,
  onExpertClick,
  selectedExpert,
}: ExpertMeterPanelProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="space-y-3">
      {expertMeterConfigs.map((expert) => {
        const phaseId = expert.phaseId as PhaseId;
        const isDone = isPhaseComplete(phaseId);
        const isActive = isPhaseActive(phaseId);
        const isPending = !isDone && !isActive;
        const colors = getRiskColor(expert.riskScore);
        const isSelected = selectedExpert === phaseId;

        return (
          <motion.button
            type="button"
            key={expert.phaseId}
            className={`w-full cursor-pointer rounded-lg border p-3 text-left transition-colors duration-200 ${
              isSelected
                ? 'border-forensic-gold/40 bg-forensic-gold/5'
                : 'border-forensic-gold/10 bg-graphite-850 hover:border-forensic-gold/20'
            }`}
            animate={
              isActive && !prefersReduced
                ? {
                    borderColor: ['rgba(184,138,68,0.15)', 'rgba(184,138,68,0.4)', 'rgba(184,138,68,0.15)'],
                  }
                : undefined
            }
            transition={{ duration: 1.2, repeat: Infinity }}
            onClick={() => isDone && onExpertClick(phaseId)}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative flex h-4 w-4 items-center justify-center">
                  {isDone && (
                    <motion.div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: colors.bar, boxShadow: `0 0 6px ${colors.glow}` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      className="h-2 w-2 rounded-full bg-forensic-gold"
                      animate={prefersReduced ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                  {isPending && <div className="h-2 w-2 rounded-full border border-forensic-stone/20 bg-graphite-800" />}
                </div>
                <span className="font-mono text-[11px] text-forensic-stone/60">{expert.icon}</span>
                <span className={`text-xs font-medium ${isPending ? 'text-forensic-stone/40' : 'text-forensic-text'}`}>
                  {expert.label}
                </span>
              </div>

              {isDone && (
                <motion.span
                  className={`text-sm font-bold tabular-nums ${colors.text}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {expert.riskScore}%
                </motion.span>
              )}
              {isActive && <span className="text-xs text-forensic-gold">分析中...</span>}
              {isPending && <span className="text-xs text-forensic-stone/30">待机</span>}
            </div>

            <div className="h-1 overflow-hidden rounded-full bg-graphite-800">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: isDone
                    ? `linear-gradient(90deg, ${colors.bar}99, ${colors.bar})`
                    : isActive
                      ? 'linear-gradient(90deg, #B88A44, #D2A64A)'
                      : 'transparent',
                  boxShadow: isDone ? `0 0 8px ${colors.glow}` : 'none',
                }}
                initial={{ width: '0%' }}
                animate={{
                  width: isDone ? `${expert.riskScore}%` : isActive ? '40%' : '0%',
                }}
                transition={{
                  duration: isDone ? 0.8 : 0.4,
                  ease: 'easeOut',
                }}
              />
            </div>

            {isDone && (
              <motion.div className="mt-2 flex flex-wrap gap-1" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                {expert.findings.map((finding) => (
                  <span
                    key={finding}
                    className="rounded px-1.5 py-0.5 text-[10px]"
                    style={{
                      background: `${colors.bar}18`,
                      color: colors.bar,
                      border: `1px solid ${colors.bar}30`,
                    }}
                  >
                    {finding}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
