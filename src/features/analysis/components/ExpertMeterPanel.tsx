import { motion, useReducedMotion } from 'framer-motion';
import { genericExpertConfigs, targetedExpertConfigs } from '../data';
import type { PhaseId } from '../hooks/useDetectionPhases';

type ExpertMeterPanelProps = {
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
  const activeTargetedCount = targetedExpertConfigs.filter((expert) => expert.activated).length;

  return (
    <div className="space-y-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">GENERIC EXPERTS · 广域覆盖</span>
        <span className="font-mono text-[10px] tabular-nums text-forensic-stone/60">4 / 4 ACTIVE</span>
      </div>

      {genericExpertConfigs.map((expert) => {
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
            transition={isActive && !prefersReduced ? { duration: 1.2, repeat: Infinity } : { duration: 0.2 }}
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
                      transition={prefersReduced ? { duration: 0 } : { duration: 0.8, repeat: Infinity }}
                    />
                  )}
                  {isPending && <div className="h-2 w-2 rounded-full border border-forensic-stone/20 bg-graphite-800" />}
                </div>
                <span className="font-mono text-[11px] text-forensic-stone/60">{expert.icon}</span>
                <span className={`text-xs font-medium ${isPending ? 'text-forensic-stone/40' : 'text-forensic-text'}`}>
                  {expert.label}
                </span>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-forensic-stone/40">{expert.method}</span>
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

            {isDone && (
              <div className="mt-2 flex items-center justify-between rounded bg-graphite-900/50 px-2 py-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-forensic-stone/60">SHAPLEY · 贡献度</span>
                <span className="font-mono text-[11px] font-bold tabular-nums text-forensic-gold">
                  {(expert.shapley * 100).toFixed(1)}%
                </span>
              </div>
            )}
          </motion.button>
        );
      })}

      <div className="my-3 rounded border border-forensic-gold/10 bg-graphite-900/40 px-3 py-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-forensic-stone/50">GATING · 动态路由</div>
        <div className="mt-1 font-mono text-[10px] tabular-nums text-forensic-stone">
          G(x)ᵢ = x · W_g,ᵢ + Softmax(x · W_noise,ᵢ)
        </div>
        <div className="mt-1 text-[10px] text-forensic-stone/60">
          通用专家固定激活,专用专家由门控亲和度 + 高斯扰动动态匹配
        </div>
      </div>

      <div className="mb-2 mt-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">TARGETED EXPERTS · 靶向针对</span>
        <span className="font-mono text-[10px] tabular-nums text-forensic-stone/60">
          {activeTargetedCount} / {targetedExpertConfigs.length} ACTIVE
        </span>
      </div>
      <div className="space-y-2">
        {targetedExpertConfigs.map((expert) => (
          <div
            key={expert.id}
            className={`rounded-lg border p-2.5 ${
              expert.activated
                ? 'border-forensic-gold/30 bg-forensic-gold/[0.04]'
                : 'border-forensic-stone/10 bg-graphite-900/30 opacity-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${expert.activated ? 'bg-forensic-gold' : 'bg-forensic-stone/30'}`} />
              <span className={`text-xs font-medium ${expert.activated ? 'text-forensic-text' : 'text-forensic-stone/50'}`}>
                {expert.label}
              </span>
              <span className="ml-auto rounded border border-forensic-gold/20 bg-graphite-950 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-forensic-gold/70">
                {expert.adapter}
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] tabular-nums">
              <span className="text-forensic-stone/50">
                GATE: <span className="text-forensic-text">{expert.gateScore.toFixed(2)}</span>
              </span>
              {expert.activated && expert.shapley > 0 && (
                <span className="text-forensic-stone/50">
                  SHAPLEY: <span className="text-forensic-gold">{(expert.shapley * 100).toFixed(1)}%</span>
                </span>
              )}
              {!expert.activated && <span className="text-forensic-stone/40">未激活</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
