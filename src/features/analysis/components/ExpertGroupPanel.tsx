import { motion } from 'framer-motion';
import { Background, Edge, Node, ReactFlow } from '@xyflow/react';
import type { ExpertResult } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';

type ExpertGroupPanelProps = {
  experts: ExpertResult[];
  showGraph?: boolean;
};

export function ExpertGroupPanel({ experts, showGraph = false }: ExpertGroupPanelProps) {
  const nodes: Node[] = [
    ...experts.map((expert, index) => ({
      id: expert.id,
      position: { x: index % 2 === 0 ? 20 : 260, y: index < 2 ? 20 : 140 },
      data: { label: expert.name },
      style: { background: '#202428', color: '#F3F0EA', border: '1px solid #2D3338' },
    })),
    {
      id: 'fusion',
      position: { x: 145, y: 82 },
      data: { label: 'Fusion Engine' },
      style: { background: '#B88A44', color: '#111315', border: '1px solid #B88A44' },
    },
  ];
  const edges: Edge[] = experts.map((expert) => ({
    id: `${expert.id}-fusion`,
    source: expert.id,
    target: 'fusion',
    style: { stroke: '#B88A44' },
  }));

  return (
    <div className="space-y-4">
      {showGraph && (
        <div className="h-64 rounded-md border border-graphite-800 bg-[#101213]">
          <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false}>
            <Background color="#2D3338" gap={18} />
          </ReactFlow>
        </div>
      )}
      {experts.map((expert, index) => (
        <motion.div
          key={expert.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ borderColor: '#6F8F72' }}
          className="rounded-md border border-graphite-800 bg-graphite-850 p-4"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-forensic-text">{expert.name}</h3>
              <p className="mt-1 text-xs leading-5 text-forensic-stone">{expert.focus}</p>
            </div>
            <StatusBadge tone={expert.score > 70 ? 'warning' : 'neutral'}>{expert.status}</StatusBadge>
          </div>
          <ScoreBar
            label="Risk score"
            value={expert.score}
            tone={expert.score > 70 ? 'warning' : 'olive'}
          />
          <p className="mt-3 text-sm leading-6 text-forensic-stone">{expert.evidence}</p>
        </motion.div>
      ))}
    </div>
  );
}
