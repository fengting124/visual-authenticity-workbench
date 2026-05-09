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
        <span className="tabular-nums">{formatPercent(value)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-graphite-800">
        <div className={cn('h-full rounded-full', toneClass[tone])} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
