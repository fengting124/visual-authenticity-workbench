import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

type HandNoteProps = {
  children: ReactNode;
  tone?: 'red' | 'blue';
  rotate?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
};

export function HandNote({
  children,
  tone = 'red',
  rotate = -2,
  className,
  size = 'md',
}: HandNoteProps) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className={cn(
        'inline-block font-hand leading-tight',
        sizeMap[size],
        tone === 'red' ? 'text-archive-redink' : 'text-archive-blueink',
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </motion.span>
  );
}
