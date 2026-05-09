import { Link } from 'react-router-dom';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';

type RiskDecisionCardProps = {
  creating: boolean;
  onGenerate: () => void;
};

export function RiskDecisionCard({ creating, onGenerate }: RiskDecisionCardProps) {
  return (
    <div className="rounded-md border border-forensic-gold/35 bg-forensic-gold/10 p-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-forensic-gold">最终融合结果</p>
          <h3 className="mt-1 text-xl font-semibold">中高真实性风险</h3>
        </div>
        <StatusBadge tone="warning">需要复核</StatusBadge>
      </div>
      <ScoreBar label="最终风险分数" value={72} tone="warning" />
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
          className="rounded-md border border-graphite-800 bg-graphite-950 px-4 py-2 text-center text-sm font-medium"
        >
          查看报告
        </Link>
      </div>
    </div>
  );
}
