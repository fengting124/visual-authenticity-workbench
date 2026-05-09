import { Check, Circle } from 'lucide-react';

type PipelineStatusBarProps = {
  steps: string[];
  currentStep: number;
  complete?: boolean;
};

export function PipelineStatusBar({ steps, currentStep, complete = false }: PipelineStatusBarProps) {
  return (
    <div
      className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl"
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((step, index) => {
        const done = complete || index < currentStep;
        const active = !complete && index === currentStep;
        return (
          <div
            key={step}
            className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm ${
              active
                ? 'border-[#00c4ff]/40 bg-[#00c4ff]/10 text-[#00c4ff]'
                : done
                  ? 'border-[#3ecf8e]/35 bg-[#3ecf8e]/10 text-[#3ecf8e]'
                  : 'border-white/10 bg-white/[0.03] text-[#7a8aa0]'
            }`}
          >
            {done ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
            {step}
          </div>
        );
      })}
    </div>
  );
}
