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
        <p className="text-xs uppercase tracking-[0.2em] text-forensic-gold">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-forensic-text">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-forensic-stone">{description}</p>
      </div>
      {children}
    </motion.div>
  );
}
