import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type FlowNode = {
  icon: LucideIcon;
  label: string;
};

type PipelineIconFlowProps = {
  nodes: FlowNode[];
  activeIndex?: number;
};

export function PipelineIconFlow({ nodes, activeIndex = 2 }: PipelineIconFlowProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex items-center justify-between gap-2">
      {nodes.map((node, index) => {
        const Icon = node.icon;
        const isActive = index === activeIndex;
        const isComplete = index < activeIndex;

        return (
          <div key={node.label} className="flex flex-1 items-center">
            <motion.div
              className={`relative flex min-w-0 flex-1 flex-col items-center overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 px-3 py-5 transition-colors hover:border-forensic-gold/25 hover:bg-graphite-800 ${
                isActive ? 'ring-2 ring-forensic-gold/40' : ''
              }`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
            >
              {isActive && !prefersReduced && <div className="animate-pulse-ring absolute -inset-1 rounded-xl border border-forensic-gold/30" />}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(184,138,68,0.18), transparent)' }}
              />
              {isComplete && <CheckCircle2 className="absolute left-2 top-2 h-3.5 w-3.5 text-forensic-olive" />}
              <span className="mb-2 font-mono text-[10px] tabular-nums text-forensic-stone/40">0{index + 1}</span>
              <Icon className={`h-5 w-5 ${isComplete ? 'text-forensic-olive' : 'text-forensic-gold'}`} />
              <span className="mt-2.5 text-xs font-medium text-forensic-text">{node.label}</span>
            </motion.div>

            {index < nodes.length - 1 && (
              <div className="relative mx-2 flex h-px w-8 flex-shrink-0 items-center overflow-hidden bg-forensic-gold/15">
                {!prefersReduced && (
                  <motion.div
                    className="absolute h-1.5 w-1.5 rounded-full bg-forensic-gold"
                    animate={{ x: ['-100%', '700%'] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: index * 0.35,
                    }}
                    style={{ top: '-2px' }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
