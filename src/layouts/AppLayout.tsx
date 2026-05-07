import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  FileText,
  Film,
  Gauge,
  Image,
  LayoutDashboard,
  Network,
} from 'lucide-react';
import { cn } from '../shared/utils/cn';

type AppLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { label: 'Overview', to: '/', icon: LayoutDashboard },
  { label: 'Annotation Center', to: '/annotation', icon: Gauge },
  { label: 'Image Annotation', to: '/annotation/image', icon: Image },
  { label: 'Video Annotation', to: '/annotation/video', icon: Film },
  { label: 'Analysis Center', to: '/analysis', icon: BarChart3 },
  { label: 'Sample Analysis', to: '/analysis/sample', icon: Network },
  { label: 'Report', to: '/report', icon: FileText },
];

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-graphite-950 text-forensic-text">
      <aside className="fixed inset-y-0 left-0 z-20 w-72 border-r border-graphite-800 bg-[#0f1112]">
        <div className="border-b border-graphite-800 px-6 py-6">
          <p className="text-xs uppercase tracking-[0.22em] text-forensic-gold">visual lab</p>
          <h1 className="mt-2 text-xl font-semibold leading-tight">Authenticity Workbench</h1>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'border-forensic-gold/35 bg-forensic-gold/10 text-forensic-text'
                      : 'border-transparent text-forensic-stone hover:border-graphite-800 hover:bg-graphite-900',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <div className="ml-72 flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-graphite-800 bg-graphite-950/90 px-8 backdrop-blur">
          <div>
            <p className="text-sm font-medium">visual-authenticity-workbench</p>
            <p className="text-xs text-forensic-stone">Frontend Prototype</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-forensic-stone">
            <span className="rounded border border-forensic-olive/40 bg-forensic-olive/10 px-2 py-1 text-forensic-olive">
              Demo Status
            </span>
            <span>Current mode: Frontend Prototype</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-forensic-olive" />
              system nominal
            </span>
          </div>
        </header>
        <main className="flex-1 px-8 py-7">{children}</main>
      </div>
    </div>
  );
}
