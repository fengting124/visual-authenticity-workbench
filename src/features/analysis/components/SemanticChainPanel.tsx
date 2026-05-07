import { motion } from 'framer-motion';
import { Background, Edge, Node, ReactFlow } from '@xyflow/react';
import type { SemanticStep } from '../types';

type SemanticChainPanelProps = {
  steps: SemanticStep[];
  compact?: boolean;
};

export function SemanticChainPanel({ steps, compact = false }: SemanticChainPanelProps) {
  const nodes: Node[] = steps.map((step, index) => ({
    id: step.id,
    position: { x: index * 210, y: 20 },
    data: { label: step.name },
    style: {
      border: '1px solid #2D3338',
      background: '#202428',
      color: '#F3F0EA',
      width: 160,
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
      {!compact && (
        <div className="h-40 rounded-md border border-graphite-800 bg-[#101213]">
          <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false}>
            <Background color="#2D3338" gap={18} />
          </ReactFlow>
        </div>
      )}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ borderColor: '#B88A44' }}
            className="rounded-md border border-graphite-800 bg-graphite-850 p-4"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded border border-forensic-gold/40 bg-forensic-gold/10 text-xs text-forensic-gold">
                {index + 1}
              </span>
              <h3 className="font-semibold">{step.name}</h3>
            </div>
            <div className="grid gap-3 text-sm text-forensic-stone">
              <p><span className="text-forensic-text">Input:</span> {step.input}</p>
              <p><span className="text-forensic-text">Processing result:</span> {step.result}</p>
              <p><span className="text-forensic-text">Explanation:</span> {step.explanation}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
