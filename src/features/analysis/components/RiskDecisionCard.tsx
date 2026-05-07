import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';

export function RiskDecisionCard() {
  return (
    <div className="rounded-md border border-forensic-gold/35 bg-forensic-gold/10 p-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-forensic-gold">Final Fusion Result</p>
          <h3 className="mt-1 text-xl font-semibold">Medium-high authenticity risk</h3>
        </div>
        <StatusBadge tone="warning">Needs expert review</StatusBadge>
      </div>
      <ScoreBar label="Final risk score" value={72} tone="warning" />
      <Link
        to="/report"
        className="mt-4 inline-flex items-center gap-2 rounded-md border border-forensic-gold/45 bg-graphite-950 px-4 py-2 text-sm font-medium text-forensic-gold"
      >
        <FileText className="h-4 w-4" />
        Generate report
      </Link>
    </div>
  );
}
