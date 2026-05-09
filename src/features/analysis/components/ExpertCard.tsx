import { motion } from 'framer-motion';
import type { ExpertResult } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';

type ExpertCardProps = {
  expert: ExpertResult;
  active: boolean;
  onSelect?: (id: string) => void;
};

export function ExpertCard({ expert, active, onSelect }: ExpertCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(expert.id)}
      whileHover={{ borderColor: '#00c4ff' }}
      className={`w-full rounded-md border p-4 text-left ${
        active ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-graphite-800 bg-graphite-850'
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-forensic-text">{expert.name}</h3>
          <p className="mt-1 text-xs text-forensic-stone">{expert.focus}</p>
        </div>
        <StatusBadge tone={expert.score > 70 ? 'warning' : 'neutral'}>{expert.status}</StatusBadge>
      </div>
      <p className="text-4xl font-bold text-cyan-400">{expert.score}%</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {expert.keyFindings.map((finding) => (
          <span
            key={finding}
            className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 cursor-pointer hover:bg-cyan-500/20"
          >
            {finding}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <ScoreBar label="贡献度" value={expert.contribution} tone={expert.score > 70 ? 'warning' : 'olive'} />
      </div>
    </motion.button>
  );
}
