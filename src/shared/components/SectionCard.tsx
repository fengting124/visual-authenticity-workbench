import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

type SectionCardProps = {
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

// Shared workstation panel wrapper for consistent borders, spacing, and reveal motion.
export function SectionCard({ title, eyebrow, action, children, className }: SectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      className={cn(
        'rounded-lg border border-graphite-800 bg-graphite-900/92 p-5 shadow-workstation',
        className,
      )}
    >
      {(title || eyebrow || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {eyebrow && <p className="text-xs uppercase tracking-[0.18em] text-forensic-gold">{eyebrow}</p>}
            {title && <h2 className="mt-1 text-lg font-semibold text-forensic-text">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      {children}
    </motion.section>
  );
}
