import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type DetectionLogStreamProps = {
  lines: string[];
  isRunning: boolean;
};

function lineColorClass(line: string) {
  if (line.startsWith('[WARN]') || line.startsWith('[ERR]')) return 'text-forensic-warning';
  if (line.startsWith('[DONE]') || line.startsWith('[OK]')) return 'text-forensic-olive';
  if (line.startsWith('[EXP') || line.startsWith('[FUSE]')) return 'text-forensic-gold';
  return 'text-forensic-stone';
}

export function DetectionLogStream({ lines, isRunning }: DetectionLogStreamProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div
      className="overflow-y-auto rounded-lg border border-forensic-gold/10 bg-graphite-950 p-3 font-mono text-[11px] leading-relaxed"
      style={{ height: '160px', scrollbarWidth: 'thin' }}
    >
      <div className="mb-2 flex items-center gap-2 border-b border-forensic-gold/10 pb-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-forensic-risk/70" />
          <span className="h-2 w-2 rounded-full bg-forensic-warning/70" />
          <span className="h-2 w-2 rounded-full bg-forensic-olive/70" />
        </div>
        <span className="text-forensic-stone/50">vaw-detect.log</span>
        {isRunning && (
          <motion.span
            className="ml-auto text-forensic-gold"
            animate={prefersReduced ? undefined : { opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          >
            ●
          </motion.span>
        )}
      </div>

      {lines.length === 0 && <span className="text-forensic-stone/30">等待检测启动...</span>}
      <AnimatePresence initial={false}>
        {lines.map((line, index) => (
          <motion.div
            key={`${line}-${index}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`${lineColorClass(line)} block`}
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
          transition={{ duration: 0.7, repeat: Infinity }}
        >
          █
        </motion.span>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
