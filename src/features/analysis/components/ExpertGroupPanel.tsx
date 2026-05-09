import { Background, Edge, Node, ReactFlow } from '@xyflow/react';
import type { ExpertResult } from '../types';
import { ExpertCard } from './ExpertCard';

type ExpertGroupPanelProps = {
  experts: ExpertResult[];
  showGraph?: boolean;
  activeExpertIds?: string[];
  onSelectExpert?: (id: string) => void;
};

export function ExpertGroupPanel({
  experts,
  showGraph = false,
  activeExpertIds = [],
  onSelectExpert,
}: ExpertGroupPanelProps) {
  const nodes: Node[] = [
    ...experts.map((expert, index) => ({
      id: expert.id,
      position: { x: index % 2 === 0 ? 20 : 270, y: index < 2 ? 20 : 150 },
      data: { label: expert.name },
      style: {
        background: activeExpertIds.includes(expert.id) ? 'rgba(111,143,114,.18)' : '#202428',
        color: '#F3F0EA',
        border: activeExpertIds.includes(expert.id) ? '1px solid #6F8F72' : '1px solid #2D3338',
      },
    })),
    {
      id: 'fusion',
      position: { x: 150, y: 92 },
      data: { label: '融合结果' },
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
        <div className="h-64 rounded-md border border-forensic-gold/[0.08] bg-graphite-950">
          <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false}>
            <Background color="#2D3338" gap={18} />
          </ReactFlow>
        </div>
      )}
      {experts.map((expert) => (
        <ExpertCard
          key={expert.id}
          expert={expert}
          active={activeExpertIds.includes(expert.id)}
          onSelect={onSelectExpert}
        />
      ))}
    </div>
  );
}
