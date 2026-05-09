import { Background, Edge, Node, ReactFlow } from '@xyflow/react';
import type { SemanticStep } from '../types';
import { SemanticStepCard } from './SemanticStepCard';

type SemanticChainPanelProps = {
  steps: SemanticStep[];
  compact?: boolean;
  activeStepId?: string;
  onSelectStep?: (id: string) => void;
};

export function SemanticChainPanel({
  steps,
  compact = false,
  activeStepId,
  onSelectStep,
}: SemanticChainPanelProps) {
  const nodes: Node[] = steps.map((step, index) => ({
    id: step.id,
    position: { x: index * 220, y: 20 },
    data: { label: step.name },
    style: {
      border: step.id === activeStepId ? '1px solid #D2A64A' : '1px solid #2D3338',
      background: step.id === activeStepId ? 'rgba(210,166,74,.12)' : '#202428',
      color: '#F3F0EA',
      width: 170,
      fontSize: 12,
    },
  }));
  const edges: Edge[] = steps.slice(1).map((step, index) => ({
    id: `${steps[index].id}-${step.id}`,
    source: steps[index].id,
    target: step.id,
    style: { stroke: '#6F8F72' },
  }));

  return (
    <div className="space-y-4">
      {steps.length === 0 && null}
      {!compact && (
        <div className="h-40 rounded-md border border-graphite-800 bg-[#101213]">
          <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false}>
            <Background color="#2D3338" gap={18} />
          </ReactFlow>
        </div>
      )}
      {steps.length > 0 && <div className="space-y-3">
        {steps.map((step, index) => (
          <SemanticStepCard
            key={step.id}
            step={step}
            index={index}
            active={step.id === activeStepId}
            onSelect={onSelectStep}
          />
        ))}
      </div>}
    </div>
  );
}
