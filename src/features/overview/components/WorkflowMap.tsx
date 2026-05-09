import { Background, Controls, Edge, Node, ReactFlow } from '@xyflow/react';
import type { WorkflowNode } from '../types';

type WorkflowMapProps = {
  nodes: WorkflowNode[];
};

export function WorkflowMap({ nodes }: WorkflowMapProps) {
  const flowNodes: Node[] = nodes.map((node, index) => ({
    id: node.id,
    position: { x: index * 260, y: index % 2 === 0 ? 20 : 120 },
    data: {
      label: (
        <div className="w-48 rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-3 text-left">
          <p className="text-sm font-semibold text-forensic-text">{node.label}</p>
          <p className="mt-1 text-xs leading-5 text-forensic-stone">{node.detail}</p>
        </div>
      ),
    },
    type: 'default',
  }));

  const edges: Edge[] = nodes.slice(1).map((node, index) => ({
    id: `${nodes[index].id}-${node.id}`,
    source: nodes[index].id,
    target: node.id,
    animated: false,
    style: { stroke: '#B88A44', strokeWidth: 1 },
  }));

  return (
    <div className="h-72 overflow-hidden rounded-md border border-forensic-gold/[0.08] bg-graphite-950">
      <ReactFlow nodes={flowNodes} edges={edges} fitView nodesDraggable={false} panOnScroll={false}>
        <Background color="#2D3338" gap={22} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
