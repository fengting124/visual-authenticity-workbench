import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';

type RiskDecisionCardProps = {
  creating: boolean;
  onGenerate: () => void;
};

function AnimatedScore({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1200;
    let frame = 0;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <span>{display}</span>;
}

export function RiskDecisionCard({ creating, onGenerate }: RiskDecisionCardProps) {
  return (
    <div className="rounded-md border border-forensic-warning/35 bg-forensic-warning/10 p-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-forensic-warning">最终融合结果</p>
          <h3 className="mt-1 text-xl font-semibold text-forensic-text">高风险</h3>
        </div>
        <StatusBadge tone="warning">需要复核</StatusBadge>
      </div>
      <div className="mb-2 text-5xl font-bold tabular-nums text-forensic-warning">
        <AnimatedScore target={82} />
        <span className="text-xl">%</span>
      </div>
      <ScoreBar label="最终风险分数" value={82} tone="warning" />
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onGenerate}
          className="rounded-md border border-forensic-gold/45 bg-graphite-950 px-4 py-2 text-sm font-medium text-forensic-gold"
        >
          {creating ? '正在生成报告' : '生成报告'}
        </button>
        <Link
          to="/report"
          className="rounded-md border border-forensic-gold/[0.08] bg-graphite-950 px-4 py-2 text-center text-sm font-medium text-forensic-text"
        >
          查看报告
        </Link>
      </div>
    </div>
  );
}
