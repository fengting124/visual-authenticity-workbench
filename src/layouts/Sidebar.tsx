import { NavLink, useLocation } from 'react-router-dom';
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
import { cn } from '../shared/utils/cn';

type NavigationItem =
  | { divider: true }
  | { icon: typeof LayoutDashboard; label: string; path: string; sub?: boolean };

const navItems: NavigationItem[] = [
  { icon: LayoutDashboard, label: '总览', path: '/' },
  { icon: Database, label: '样本库', path: '/samples' },
  { divider: true },
  { icon: Tag, label: '标注中心', path: '/annotation' },
  { icon: ImageIcon, label: '图像标注', path: '/annotation/image', sub: true },
  { icon: Video, label: '视频标注', path: '/annotation/video', sub: true },
  { divider: true },
  { icon: Cpu, label: '检测中心', path: '/analysis' },
  { icon: FlaskConical, label: '检测工作台', path: '/analysis/sample', sub: true },
  { divider: true },
  { icon: FileText, label: '证据报告', path: '/report' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[220px] flex-col border-r border-white/10 bg-[#0d1421]">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[#00c4ff]">Evidence</p>
        <h1 className="mt-2 text-lg font-semibold leading-tight text-[#e8edf5]">视觉证据工作台</h1>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item, index) => {
          if ('divider' in item) {
            return <div key={`divider-${index}`} className="my-3 h-px bg-white/10" />;
          }

          const Icon = item.icon;
          const isActive = item.path === '/' ? location.pathname === '/' : location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                item.sub ? 'ml-4 text-[13px]' : undefined,
                isActive
                  ? 'bg-[#00c4ff]/10 text-[#00c4ff]'
                  : 'text-[#7a8aa0] hover:bg-white/[0.05] hover:text-[#e8edf5]',
              )}
            >
              {isActive && <span className="absolute left-0 h-5 w-0.5 rounded bg-[#00c4ff]" />}
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4 text-sm">
        <p className="flex items-center gap-2 text-[#3ecf8e]">
          <span className="h-2 w-2 rounded-full bg-[#3ecf8e]" />
          系统就绪
        </p>
        <p className="mt-2 text-[#7a8aa0]">
          <span className="font-semibold text-[#00c4ff]">12</span> 待处理
        </p>
      </div>
    </aside>
  );
}
