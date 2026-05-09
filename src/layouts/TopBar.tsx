import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { activeSample, samples } from '../features/samples/data';

function LiveClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('zh-CN', { hour12: false }));

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(new Date().toLocaleTimeString('zh-CN', { hour12: false }));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="font-mono text-xs tabular-nums text-forensic-stone">{time}</span>;
}

export function TopBar() {
  const prefersReduced = useReducedMotion();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId');
  const currentSample = samples.find((sample) => sample.id === sampleId) ?? activeSample;

  return (
    <header
      className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-forensic-gold/[0.08] px-6"
      style={{
        background: 'rgba(17,19,21,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div>
        <p className="text-sm font-medium text-forensic-text">视觉真实性证据工作台</p>
        <p className="text-xs text-forensic-stone">证据发现 · 可解释检测 · 结构化报告</p>
      </div>
      <div className="flex items-center gap-4 text-xs text-forensic-stone">
        <span className="rounded border border-forensic-gold/35 bg-forensic-gold/10 px-2 py-1 text-forensic-gold">
          当前样本：{currentSample.id}
        </span>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-forensic-olive"
            animate={prefersReduced ? undefined : { opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <span className="text-xs text-forensic-stone">系统就绪</span>
        </div>
        <LiveClock />
      </div>
    </header>
  );
}
