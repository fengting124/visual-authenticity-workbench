import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cpu, FileText, GitMerge, Sparkles, Tag, Upload } from 'lucide-react';
import { recentTasks } from '../features/samples/data';
import { PipelineIconFlow } from '../shared/components/PipelineIconFlow';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { RISK_LABEL, STATUS_LABEL, TYPE_LABEL, toneForRisk } from '../shared/utils/format';

const HeroDemoCard = lazy(() =>
  import('../shared/components/HeroDemoCard').then((module) => ({ default: module.HeroDemoCard })),
);

function useCountUp(target: number, duration = 1400): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

const pipelineNodes = [
  { icon: Upload, label: '导入' },
  { icon: Tag, label: '标注' },
  { icon: Cpu, label: '检测' },
  { icon: GitMerge, label: '融合' },
  { icon: FileText, label: '报告' },
];

const compareRegions = [
  { label: '边界异常', className: 'right-[12%] top-[16%] h-20 w-32' },
  { label: '纹理断裂', className: 'left-[42%] top-[43%] h-20 w-36' },
  { label: '反射不一致', className: 'bottom-[14%] left-[12%] h-16 w-40' },
];

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 120;
      const y = 44 - ((value - min) / Math.max(max - min, 1)) * 36;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 120 48" className="h-12 w-28 overflow-visible">
      <polyline fill="none" stroke="rgba(184,138,68,0.22)" strokeWidth="5" points={points} strokeLinecap="round" strokeLinejoin="round" />
      <polyline fill="none" stroke="#B88A44" strokeWidth="1.8" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnimatedStatCard({
  numericTarget,
  suffix,
  label,
  note,
  values,
}: {
  numericTarget: number;
  suffix: string;
  label: string;
  note: string;
  values: number[];
}) {
  const value = useCountUp(numericTarget, 1600);
  const display = numericTarget === 947 ? `${(value / 10).toFixed(1)}` : String(value);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-6 transition-colors hover:border-forensic-gold/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,138,68,0.2), transparent)' }} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-5xl font-bold tabular-nums text-forensic-gold">
            {display}
            {suffix}
          </p>
          <p className="mt-3 text-sm text-forensic-text">{label}</p>
          <p className="mt-1 text-xs text-forensic-stone/60">{note}</p>
        </div>
        <Sparkline values={values} />
      </div>
    </div>
  );
}

function StatCard({ value, label, note, values }: { value: string; label: string; note: string; values: number[] }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-6 transition-colors hover:border-forensic-gold/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,138,68,0.2), transparent)' }} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-5xl font-bold tabular-nums text-forensic-gold">{value}</p>
          <p className="mt-3 text-sm text-forensic-text">{label}</p>
          <p className="mt-1 text-xs text-forensic-stone/60">{note}</p>
        </div>
        <Sparkline values={values} />
      </div>
    </div>
  );
}

function HeroDemoSkeleton() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-forensic-gold/25 bg-graphite-950 shadow-workstation">
      <div className="absolute inset-x-0 top-0 h-9 border-b border-forensic-gold/15 bg-graphite-950/80" />
      <div className="absolute inset-5 top-14 rounded-xl bg-graphite-850/60" />
      <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 gap-2 border-t border-forensic-gold/15 bg-graphite-950/85 px-3 py-2">
        {['空间', '频域', '风格', '语义'].map((label) => (
          <div key={label} className="text-center">
            <div className="mx-auto h-2 w-8 rounded bg-forensic-stone/10" />
            <div className="mx-auto mt-1 h-3 w-5 rounded bg-forensic-gold/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function OverviewPage() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const sampleCount = useCountUp(124, 1500);
  const accuracy = useCountUp(968, 1500);

  return (
    <>
      <section className="forensic-noise relative overflow-hidden rounded-2xl border border-forensic-gold/[0.08] bg-graphite-950 px-8 py-10 shadow-workstation">
        <div className="grid items-center gap-8 lg:grid-cols-[60fr_40fr]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-forensic-gold/25 bg-forensic-gold/5 px-3 py-1">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className={`absolute h-2 w-2 rounded-full border border-forensic-gold ${prefersReduced ? '' : 'animate-pulse-ring'}`} />
                <span className="h-1.5 w-1.5 rounded-full bg-forensic-gold" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">FORENSIC INTELLIGENCE · v0.9</span>
            </div>

            <div className="mt-6">
              <h1 className="text-6xl font-semibold leading-[1.05] tracking-tight text-forensic-text">洞察 AI 生成内容</h1>
              <h2 className="mt-2 text-6xl font-semibold leading-[1.05] tracking-tight">
                <span className={`bg-gradient-to-r from-forensic-gold via-forensic-text to-forensic-gold bg-[length:200%_100%] bg-clip-text text-transparent ${prefersReduced ? '' : 'animate-shimmer'}`}>
                  隐藏的证据链
                </span>
              </h2>
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-forensic-stone">
              自动标注候选证据 · 语义链可解释推理 · 多专家融合判决 · 一键生成结构化取证报告
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/analysis/sample')}
                className="inline-flex items-center gap-2 rounded-xl bg-forensic-gold px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-forensic-warning"
              >
                <Sparkles className="h-4 w-4" />
                开始检测
              </button>
              <button
                type="button"
                onClick={() => navigate('/samples')}
                className="inline-flex items-center gap-2 rounded-xl border border-forensic-gold/[0.16] bg-graphite-850 px-6 py-3 text-sm font-semibold text-forensic-text transition-colors hover:border-forensic-gold/35"
              >
                浏览样本库
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs tabular-nums text-forensic-stone">
              <span>
                样本 <span className="text-forensic-gold">{sampleCount}</span>
              </span>
              <span>
                准确率 <span className="text-forensic-gold">{(accuracy / 10).toFixed(1)}%</span>
              </span>
              <span>
                平均响应 <span className="text-forensic-gold">1.8s</span>
              </span>
            </div>
          </div>

          <Suspense fallback={<HeroDemoSkeleton />}>
            <HeroDemoCard />
          </Suspense>
        </div>
      </section>

      <section className="mt-2">
        <div className="relative grid gap-5 lg:grid-cols-2">
          <div className="relative h-[280px] overflow-hidden rounded-xl border-2 border-forensic-olive bg-graphite-950">
            <img src="/demo-assets/real.jpg" alt="真实图像" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 rounded-lg border border-forensic-olive/30 bg-forensic-olive/15 px-3 py-2 text-sm text-forensic-olive">
              真实图像 · 置信度 96%
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-forensic-stone/70"
              style={{
                background: '#1A1D20',
                border: '1px solid rgba(168,162,154,0.2)',
                boxShadow: '0 0 0 4px rgba(17,19,21,0.8)',
              }}
            >
              VS
            </div>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-xl border-2 border-forensic-risk bg-graphite-950">
            <img src="/demo-assets/fake.jpg" alt="AI 生成图像" className="h-full w-full object-cover" />
            {compareRegions.map((region) => (
              <div key={region.label} className={`absolute rounded-lg border-2 border-dashed border-forensic-risk bg-forensic-risk/10 ${region.className}`}>
                <span className="absolute -top-7 left-0 rounded-md border border-forensic-risk/30 bg-forensic-risk/15 px-2 py-1 text-xs text-forensic-risk">
                  {region.label}
                </span>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 rounded-lg border border-forensic-risk/30 bg-forensic-risk/15 px-3 py-2 text-sm text-forensic-risk">
              AI 生成 · 高风险 · 置信度 94%
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {['边界异常', '纹理断裂', '反射不一致'].map((tag) => (
            <span key={tag} className="rounded-full border border-forensic-gold/[0.08] bg-graphite-850 px-3 py-1 text-xs text-forensic-stone">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <AnimatedStatCard numericTarget={947} suffix="%" label="AI生成检出率" note="模拟精度指标" values={[3, 5, 4, 7, 6, 8, 7, 9, 8, 10, 9, 11]} />
        <StatCard value="< 2s" label="单图平均分析时间" note="前端演示时长" values={[8, 7, 7, 6, 5, 6, 4, 4, 3, 3, 2, 2]} />
        <AnimatedStatCard numericTarget={6} suffix=" 类" label="证据类型覆盖" note="标注 · 语义 · 专家" values={[2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6]} />
      </section>

      <SectionCard title="处理流程" className="mt-8">
        <PipelineIconFlow nodes={pipelineNodes} activeIndex={2} />
      </SectionCard>

      <SectionCard title="最近任务" className="mt-8">
        <div className="grid gap-3 lg:grid-cols-3">
          {recentTasks.map((task) => (
            <div key={task.id} className="rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-forensic-text">{task.label}</p>
                  <p className="mt-1 text-xs text-forensic-stone">
                    {task.sampleId} · {TYPE_LABEL[task.type]} · {task.completedAt}
                  </p>
                  <p className="mt-1 text-xs text-forensic-stone">{STATUS_LABEL[task.status]}</p>
                </div>
                <StatusBadge tone={toneForRisk(task.riskLevel)}>{RISK_LABEL[task.riskLevel]}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
