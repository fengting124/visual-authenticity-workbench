import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { ForensicWatermark } from '../shared/components/ForensicWatermark';

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative flex min-h-screen bg-graphite-950 text-forensic-text">
      <Sidebar />
      <div className="ml-[220px] flex min-h-screen flex-1 flex-col">
        <div className="folder-tab-strip" />
        <TopBar />
        <main className="archive-grid flex-1 px-8 py-7">{children}</main>
      </div>
      <ForensicWatermark />
    </div>
  );
}
