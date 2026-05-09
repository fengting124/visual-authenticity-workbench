import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fusionEvidenceChips } from '../data';

type FusionVerdictPanelProps = {
  isVisible: boolean;
  riskScore: number;
  onGenerateReport: () => void;
  onViewReport: () => void;
};

function AnimatedScore({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1000;
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <span className="tabular-nums">{display}</span>;
}

export function FusionVerdictPanel({ isVisible, riskScore, onGenerateReport, onViewReport }: FusionVerdictPanelProps) {
  const riskLabel = riskScore >= 75 ? '高风险' : riskScore >= 50 ? '中风险' : '低风险';
  const riskColor = riskScore >= 75 ? '#C95A4A' : riskScore >= 50 ? '#D2A64A' : '#6F8F72';

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
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs text-forensic-stone">综合判断</p>
              <motion.p
                className="text-2xl font-bold"
                style={{ color: riskColor }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              >
                {riskLabel}
              </motion.p>
            </div>
            <div className="relative h-20 w-20">
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
                  <AnimatedScore target={riskScore} />
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
              className="flex-1 rounded-lg py-2.5 text-sm font-medium text-graphite-950"
              style={{ background: 'linear-gradient(135deg, #B88A44, #D2A64A)' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGenerateReport}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
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
