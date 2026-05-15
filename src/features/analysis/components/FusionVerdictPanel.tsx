import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { fusionEvidenceChips, genericExpertConfigs, targetedExpertConfigs } from '../data';

type FusionVerdictPanelProps = {
  isVisible: boolean;
  riskScore: number;
  onGenerateReport: () => void;
  onViewReport: () => void;
};

function AnimatedScore({ target, onComplete }: { target: number; onComplete: () => void }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1000;
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextDisplay = Math.round(eased * target);
      setDisplay(nextDisplay);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        onComplete();
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, onComplete]);

  return <span className="font-mono tabular-nums">{display}</span>;
}

export function FusionVerdictPanel({ isVisible, riskScore, onGenerateReport, onViewReport }: FusionVerdictPanelProps) {
  const prefersReduced = useReducedMotion();
  const [showPulse, setShowPulse] = useState(false);
  const riskLabel = riskScore >= 75 ? '高风险' : riskScore >= 50 ? '中风险' : '低风险';
  const riskColor = riskScore >= 75 ? '#C95A4A' : riskScore >= 50 ? '#D2A64A' : '#6F8F72';
  const englishLabel = riskLabel === '高风险' ? 'HIGH RISK' : riskLabel === '中风险' ? 'MEDIUM' : 'LOW RISK';
  const allContributors = [
    ...genericExpertConfigs.map((expert) => ({ label: expert.label, shapley: expert.shapley })),
    ...targetedExpertConfigs
      .filter((expert) => expert.activated)
      .map((expert) => ({ label: expert.label, shapley: expert.shapley })),
  ];
  const sortedContributors = allContributors.slice().sort((a, b) => b.shapley - a.shapley);
  const topContributor = sortedContributors[0]?.label ?? '语义专家';
  const circumference = 2 * Math.PI * 60;
  let cumulativeOffset = 0;

  const handleScoreComplete = useCallback(() => {
    if (prefersReduced) return;
    setShowPulse(true);
    window.setTimeout(() => setShowPulse(false), 3000);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="mt-4 rounded-xl border p-5"
          style={{
            borderColor: `${riskColor}40`,
            background: `linear-gradient(135deg, rgba(17,19,21,0.95) 0%, ${riskColor}08 100%)`,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="mb-4 rounded-lg border border-forensic-gold/15 bg-graphite-900/40 p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-forensic-gold">SHAPLEY ATTRIBUTION · 专家贡献度</span>
              <span className="font-mono text-[10px] tabular-nums text-forensic-stone/60">{allContributors.length} CONTRIBUTORS</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-4">
              <div className="relative h-[140px] w-[140px]">
                <svg viewBox="0 0 140 140" className="-rotate-90">
                  <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
                  {allContributors.map((contributor, index) => {
                    const dashLength = contributor.shapley * circumference;
                    const offset = -cumulativeOffset;
                    cumulativeOffset += dashLength;
                    const hue = 35 + index * 18;

                    return (
                      <motion.circle
                        key={contributor.label}
                        cx="70"
                        cy="70"
                        r="60"
                        fill="none"
                        stroke={`hsl(${hue}, 50%, 55%)`}
                        strokeWidth="14"
                        strokeDasharray={`${dashLength} ${circumference}`}
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-forensic-stone/60">TOTAL</div>
                  <div className="font-mono text-xl font-bold tabular-nums text-forensic-text">100%</div>
                  <div className="font-mono text-[9px] tabular-nums text-forensic-stone/50">Σ Shapley</div>
                </div>
              </div>
              <div className="space-y-1.5">
                {sortedContributors.map((contributor, index) => {
                  const sourceIndex = allContributors.findIndex((item) => item.label === contributor.label);
                  const hue = 35 + sourceIndex * 18;

                  return (
                    <motion.div
                      key={contributor.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.08 }}
                      className="flex items-center gap-2 text-[11px]"
                    >
                      <span className="h-2 w-2 flex-shrink-0 rounded-sm" style={{ background: `hsl(${hue}, 50%, 55%)` }} />
                      <span className="flex-1 truncate text-forensic-text">{contributor.label}</span>
                      <span className="font-mono tabular-nums text-forensic-gold">{(contributor.shapley * 100).toFixed(1)}%</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="mt-3 border-t border-forensic-gold/10 pt-2 text-[10px] text-forensic-stone/60">
              主导专家:
              <span className="ml-1 font-mono text-forensic-gold">{topContributor}</span>
              <span> · 关键依据:几何/透视/边界异常证据贡献最高</span>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-forensic-stone/60">FUSION VERDICT</p>
              <motion.p
                className="mt-1 font-mono text-2xl font-bold"
                style={{ color: riskColor }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              >
                {englishLabel}
              </motion.p>
              <p className="mt-0.5 text-xs text-forensic-stone">{riskLabel}</p>
            </div>
            <div className="relative h-20 w-20">
              {showPulse && <div className="animate-pulse-ring absolute -inset-2 rounded-full border-2" style={{ borderColor: riskColor }} />}
              <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke={riskColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - riskScore / 100) }}
                  transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                  style={{ filter: `drop-shadow(0 0 6px ${riskColor}60)` }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold tabular-nums" style={{ color: riskColor }}>
                  <AnimatedScore target={riskScore} onComplete={handleScoreComplete} />
                  <span className="text-xs">%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-1 flex justify-between text-[10px] text-forensic-stone">
              <span>真实</span>
              <span>AI生成</span>
            </div>
            <div
              className="relative h-2 overflow-hidden rounded-full"
              style={{
                background: 'linear-gradient(90deg, #6F8F72 0%, #D2A64A 50%, #C95A4A 100%)',
                opacity: 0.8,
              }}
            >
              <motion.div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-forensic-text/80 bg-graphite-950"
                style={{ boxShadow: `0 0 8px ${riskColor}` }}
                initial={{ left: '0%' }}
                animate={{ left: `calc(${riskScore}% - 6px)` }}
                transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {fusionEvidenceChips.map((evidence, index) => (
              <motion.span
                key={evidence}
                className="rounded-full px-2 py-0.5 text-[10px]"
                style={{
                  background: 'rgba(201,90,74,0.12)',
                  color: '#C95A4A',
                  border: '1px solid rgba(201,90,74,0.25)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.08 }}
              >
                {evidence}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-3">
            <motion.button
              type="button"
              className="group relative flex-1 overflow-hidden rounded-lg py-2.5 text-sm font-medium text-graphite-950"
              style={{ background: 'linear-gradient(135deg, #B88A44, #D2A64A)' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGenerateReport}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              生成取证报告
            </motion.button>
            <motion.button
              type="button"
              className="rounded-lg border border-forensic-gold/15 px-4 py-2.5 text-sm text-forensic-stone transition-colors hover:border-forensic-gold/30"
              whileTap={{ scale: 0.98 }}
              onClick={onViewReport}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              查看报告
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
