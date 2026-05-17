import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { activeSample, samples } from '../features/samples/data';

const ROUTE_LABELS: Record<string, string> = {
  '/': '总览',
  '/samples': '样本库',
  '/annotation': '标注中心',
  '/annotation/image': '图像标注',
  '/annotation/video': '视频标注',
  '/analysis': '检测中心',
  '/analysis/sample': '检测工作台',
  '/report': '证据报告',
};

function LiveClock() {
  const formatTime = () => {
    const now = new Date();
    const date = now
      .toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '-');
    const time = now.toLocaleTimeString('zh-CN', { hour12: false });
    return `WS-001 · ${date} ${time}`;
  };
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(formatTime());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="font-mono text-xs tabular-nums text-forensic-stone">{time}</span>;
}

export function TopBar() {
  const prefersReduced = useReducedMotion();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId');
  const currentSample = samples.find((sample) => sample.id === sampleId) ?? activeSample;
  const routeLabel = ROUTE_LABELS[location.pathname] ?? location.pathname;

  return (
    <header
      className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-forensic-gold/[0.08] px-6"
      style={{
        background: 'rgba(17,19,21,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="font-serif text-base font-bold tracking-tight text-forensic-gold">
          VeriLoop
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-forensic-stone/40">
          FORENSIC SYSTEM
        </span>
        <span className="mx-2 h-3 w-px bg-forensic-gold/20" />
        <span className="text-forensic-stone/60">证据工作台</span>
        <ChevronRight className="h-3.5 w-3.5 text-forensic-stone/35" />
        <span className="font-medium text-forensic-text">{routeLabel}</span>
        <ChevronRight className="h-3.5 w-3.5 text-forensic-stone/35" />
        <span className="font-mono text-xs tabular-nums text-forensic-gold">
          {currentSample.id}
        </span>
      </div>
      <div className="flex items-center gap-4 text-xs text-forensic-stone">
        <div className="flex items-center gap-1.5">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-forensic-olive"
            animate={prefersReduced ? undefined : { opacity: [1, 0.4, 1] }}
            transition={prefersReduced ? { duration: 0 } : { duration: 2.5, repeat: Infinity }}
          />
          <span className="text-xs text-forensic-stone">系统就绪</span>
        </div>
        <LiveClock />
      </div>
    </header>
  );
}
