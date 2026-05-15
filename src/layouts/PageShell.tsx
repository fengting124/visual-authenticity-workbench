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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.22 }}>
      <div className="mb-6 max-w-5xl">
        <div className="flex items-center gap-2">
          <motion.div
            className="h-3 w-0.5 rounded-full bg-forensic-gold"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          <p className="text-xs uppercase tracking-[0.2em] text-forensic-gold">{eyebrow}</p>
        </div>
        <motion.h1
          className="mt-2 text-3xl font-semibold tracking-normal text-forensic-text"
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
