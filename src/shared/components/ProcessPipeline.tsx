import { motion } from 'framer-motion';
import { CheckCircle2, CircleDotDashed } from 'lucide-react';

export type ProcessStage = {
  title: string;
  input: string;
  output: string;
};

type ProcessPipelineProps = {
  stages: ProcessStage[];
  activeIndex: number;
  complete: boolean;
};

export function ProcessPipeline({ stages, activeIndex, complete }: ProcessPipelineProps) {
  return (
    <div className="grid gap-3">
      {stages.map((stage, index) => {
        const done = complete || index < activeIndex;
        const active = !complete && index === activeIndex;
        return (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`grid grid-cols-[180px_1fr_1fr] gap-4 rounded-md border p-4 text-sm ${
              active
                ? 'border-forensic-gold/50 bg-forensic-gold/10'
                : done
                  ? 'border-forensic-olive/40 bg-forensic-olive/10'
                  : 'border-graphite-800 bg-graphite-850'
            }`}
          >
            <div className="flex items-start gap-3">
              {done ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-forensic-olive" />
              ) : (
                <CircleDotDashed className="mt-0.5 h-4 w-4 text-forensic-gold" />
              )}
              <div>
                <p className="text-xs text-forensic-stone">步骤 {index + 1}</p>
                <p className="mt-1 font-semibold">{stage.title}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-forensic-stone">输入</p>
              <p className="mt-1 leading-6">{stage.input}</p>
            </div>
            <div>
              <p className="text-xs text-forensic-stone">输出</p>
              <p className="mt-1 leading-6">{stage.output}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
