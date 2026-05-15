import { motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Cpu,
  Database,
  FileText,
  FlaskConical,
  Image as ImageIcon,
  LayoutDashboard,
  Tag,
  Video,
} from 'lucide-react';
import { sampleMetrics } from '../features/samples/data';
import { cn } from '../shared/utils/cn';

type NavigationItem =
  | { divider: true; id: string }
  | { icon: typeof LayoutDashboard; label: string; path: string; sub?: boolean };

const navItems: NavigationItem[] = [
  { icon: LayoutDashboard, label: '总览', path: '/' },
  { icon: Database, label: '样本库', path: '/samples' },
  { divider: true, id: 'sample-divider' },
  { icon: Tag, label: '标注中心', path: '/annotation' },
  { icon: ImageIcon, label: '图像标注', path: '/annotation/image', sub: true },
  { icon: Video, label: '视频标注', path: '/annotation/video', sub: true },
  { divider: true, id: 'annotation-divider' },
  { icon: Cpu, label: '检测中心', path: '/analysis' },
  { icon: FlaskConical, label: '检测工作台', path: '/analysis/sample', sub: true },
  { divider: true, id: 'analysis-divider' },
  { icon: FileText, label: '证据报告', path: '/report' },
];

const navVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

export function Sidebar() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[220px] flex-col border-r border-forensic-gold/[0.08] bg-graphite-900">
      <div className="border-b border-forensic-gold/[0.08] px-5 py-5">
        <div className="flex items-center gap-2">
          <motion.svg
            viewBox="0 0 32 32"
            className="h-4 w-4 text-forensic-gold"
            animate={prefersReduced ? undefined : { rotate: 360 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
            <circle cx="16" cy="16" r="5.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
            <path d="M16 3.5v6M16 22.5v6M3.5 16h6M22.5 16h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1.6" fill="currentColor" />
          </motion.svg>
          <p className="text-xs uppercase tracking-[0.22em] text-forensic-gold">Evidence</p>
        </div>
        <h1 className="mt-2 text-lg font-semibold leading-tight text-forensic-text">视觉证据工作台</h1>
      </div>

      <motion.nav className="flex-1 space-y-1 p-3" variants={navVariants} initial="hidden" animate="visible">
        {navItems.map((item) => {
          if ('divider' in item) {
            return <div key={item.id} className="my-3 h-px bg-forensic-gold/10" />;
          }

          const Icon = item.icon;
          const isExactMatch = location.pathname === item.path;
          const isParentOfActiveSub = !item.sub && item.path !== '/' && location.pathname.startsWith(item.path + '/');
          const isActive = isExactMatch || isParentOfActiveSub;

          return (
            <motion.div key={item.path} variants={itemVariants}>
              <Link
                to={item.path}
                className={cn(
                  'relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150',
                  item.sub ? 'ml-4 text-[13px]' : undefined,
                  isActive
                    ? 'bg-forensic-gold/[0.08] text-forensic-gold'
                    : 'text-forensic-stone hover:bg-forensic-gold/[0.06] hover:text-forensic-text',
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-forensic-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      <div className="border-t border-forensic-gold/[0.08] p-4 font-mono text-[10px] uppercase tracking-[0.16em]">
        <div className="space-y-2 rounded-lg border border-forensic-gold/[0.08] bg-graphite-950/40 p-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-forensic-olive" />
            <span className="text-forensic-stone/50">MODEL</span>
            <span className="ml-auto text-forensic-olive">READY</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-forensic-olive"
              animate={prefersReduced ? undefined : { opacity: [1, 0.35, 1] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 2.5, repeat: Infinity }}
            />
            <span className="text-forensic-stone/50">ENGINE</span>
            <span className="ml-auto text-forensic-olive">ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-forensic-gold" />
            <span className="text-forensic-stone/50">QUEUE</span>
            <span className="ml-auto tabular-nums text-forensic-gold">{sampleMetrics.reviewRequired}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
