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
      whileHover={{ borderColor: '#6F8F72' }}
      className={`w-full rounded-md border p-4 text-left ${
        active ? 'border-forensic-olive bg-forensic-olive/10' : 'border-graphite-800 bg-graphite-850'
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-forensic-text">{expert.name}</h3>
        </div>
        <StatusBadge tone={expert.score > 70 ? 'warning' : 'neutral'}>{expert.status}</StatusBadge>
      </div>
      <p className="text-4xl font-bold text-[#00c4ff]">{expert.score}%</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {expert.focus.split('、').slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-[#7a8aa0]">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <ScoreBar label="贡献度" value={expert.contribution} tone={expert.score > 70 ? 'warning' : 'olive'} />
      </div>
    </motion.button>
  );
}
