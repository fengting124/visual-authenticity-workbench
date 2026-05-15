import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { formatPercent } from '../utils/format';

type ScoreBarProps = {
  label: string;
  value: number;
  tone?: 'gold' | 'olive' | 'risk' | 'warning';
};

const toneClass = {
  gold: 'bg-forensic-gold',
  olive: 'bg-forensic-olive',
  risk: 'bg-forensic-risk',
  warning: 'bg-forensic-warning',
};

export function ScoreBar({ label, value, tone = 'gold' }: ScoreBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-forensic-stone">
        <span>{label}</span>
        <motion.span className="tabular-nums" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {formatPercent(value)}
        </motion.span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-graphite-800">
        <motion.div
          className={cn('h-full rounded-full', toneClass[tone])}
          initial={{ width: '0%' }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  );
}
