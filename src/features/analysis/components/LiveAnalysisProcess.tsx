import { motion } from 'framer-motion';
import { liveAnalysisStages } from '../data';
import { StatusBadge } from '../../../shared/components/StatusBadge';

export function LiveAnalysisProcess() {
  return (
    <div className="grid gap-3">
      {liveAnalysisStages.map((stage, index) => (
        <motion.div
          key={stage.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
          className="grid grid-cols-[160px_1fr_1fr_110px] gap-4 rounded-md border border-graphite-800 bg-graphite-850 p-4 text-sm"
        >
          <div>
            <p className="text-xs text-forensic-stone">阶段 {index + 1}</p>
            <p className="mt-1 font-semibold">{stage.name}</p>
          </div>
          <div>
            <p className="text-xs text-forensic-stone">输入</p>
            <p className="mt-1 leading-6">{stage.input}</p>
          </div>
          <div>
            <p className="text-xs text-forensic-stone">输出</p>
            <p className="mt-1 leading-6">{stage.output}</p>
          </div>
          <div className="flex items-start justify-end">
            <StatusBadge tone={stage.status === '运行中' ? 'warning' : 'neutral'}>{stage.status}</StatusBadge>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
