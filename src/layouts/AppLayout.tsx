import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-graphite-950 text-forensic-text">
      <Sidebar />
      <div className="ml-[220px] flex min-h-screen flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-8 py-7">{children}</main>
      </div>
    </div>
  );
}
