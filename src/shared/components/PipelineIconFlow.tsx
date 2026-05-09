import type { LucideIcon } from 'lucide-react';

type FlowNode = {
  icon: LucideIcon;
  label: string;
};

type PipelineIconFlowProps = {
  nodes: FlowNode[];
};

export function PipelineIconFlow({ nodes }: PipelineIconFlowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      {nodes.map((node, index) => {
        const Icon = node.icon;
        return (
          <div key={node.label} className="flex flex-1 items-center">
            <div className="flex min-w-20 flex-1 flex-col items-center rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 px-4 py-5">
              <Icon className="h-6 w-6 text-forensic-gold" />
              <span className="mt-3 text-sm font-medium">{node.label}</span>
            </div>
            {index < nodes.length - 1 && (
              <div className="mx-3 h-px w-10 bg-gradient-to-r from-forensic-gold to-forensic-olive" />
            )}
          </div>
        );
      })}
    </div>
  );
}
