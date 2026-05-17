import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

// Route wrapper keeps page transitions and heading rhythm consistent.
export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
      className="archive-grid relative min-h-full"
    >
      <div className="mb-6 max-w-5xl">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-[1px] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{
              background: '#C9A66B',
              color: '#1C1E20',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: '#1C1E20', opacity: 0.5 }}
            />
            FILE · {eyebrow}
          </span>
        </div>
        <motion.h1
          className="mt-3 font-serif text-3xl font-bold tracking-tight text-forensic-text"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-2 text-sm leading-6 text-forensic-stone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}
      </div>
      {children}
    </motion.div>
  );
}
