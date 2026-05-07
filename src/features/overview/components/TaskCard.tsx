import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { TaskEntrance } from '../types';
import { SectionCard } from '../../../shared/components/SectionCard';

type TaskCardProps = {
  task: TaskEntrance;
};

const accentClass = {
  gold: 'text-forensic-gold border-forensic-gold/30',
  olive: 'text-forensic-olive border-forensic-olive/30',
  stone: 'text-forensic-stone border-graphite-800',
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Link to={task.to}>
      <SectionCard className={`h-full p-4 transition-colors hover:border-forensic-gold/40 ${accentClass[task.accent]}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-forensic-text">{task.title}</h3>
            <p className="mt-2 text-sm leading-6 text-forensic-stone">{task.description}</p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0" />
        </div>
      </SectionCard>
    </Link>
  );
}
