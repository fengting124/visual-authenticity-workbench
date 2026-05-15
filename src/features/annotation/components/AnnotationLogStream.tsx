import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type AnnotationLogStreamProps = {
  lines: string[];
  isRunning: boolean;
  isComplete: boolean;
};

function lineColor(line: string) {
  if (line.startsWith('[WARN]')) return 'text-forensic-warning';
  if (line.startsWith('[OK]')) return 'text-forensic-olive';
  if (line.startsWith('[CLUE]')) return 'text-forensic-gold';
  if (line.startsWith('[SAVE]')) return 'text-forensic-olive';
  return 'text-forensic-stone';
}

export function AnnotationLogStream({ lines, isRunning, isComplete }: AnnotationLogStreamProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div
      className="overflow-y-auto rounded-lg border border-forensic-gold/10 bg-graphite-950 p-3 font-mono text-[11px] leading-relaxed"
      style={{ height: '140px', scrollbarWidth: 'thin' }}
    >
      <div className="mb-2 flex items-center gap-2 border-b border-forensic-gold/10 pb-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-forensic-risk/70" />
          <span className="h-2 w-2 rounded-full bg-forensic-warning/70" />
          <span className="h-2 w-2 rounded-full bg-forensic-olive/70" />
        </div>
        <span className="text-forensic-stone/50">vaw-annotate.log</span>
        {isRunning && (
          <motion.span
            className="ml-auto text-forensic-gold"
            animate={prefersReduced ? undefined : { opacity: [1, 0.2, 1] }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.9, repeat: Infinity }}
          >
            ●
          </motion.span>
        )}
        {isComplete && !isRunning && <span className="ml-auto text-[10px] text-forensic-olive">● 完成</span>}
      </div>

      {lines.length === 0 && <span className="text-forensic-stone/30">等待标注启动...</span>}

      <AnimatePresence initial={false}>
        {lines.map((line, index) => (
          <motion.div
            key={`${line}-${index}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`${lineColor(line)} block`}
          >
            <span className="mr-2 select-none text-forensic-stone/30">{String(index + 1).padStart(2, '0')}</span>
            {line}
          </motion.div>
        ))}
      </AnimatePresence>

      {isRunning && (
        <motion.span
          className="inline-block text-forensic-gold"
          animate={prefersReduced ? undefined : { opacity: [1, 0, 1] }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.7, repeat: Infinity }}
        >
          █
        </motion.span>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
