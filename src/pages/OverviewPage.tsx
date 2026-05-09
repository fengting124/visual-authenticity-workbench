import { useNavigate } from 'react-router-dom';
import { Cpu, FileText, GitMerge, Tag, Upload } from 'lucide-react';
import { recentTasks } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { PipelineIconFlow } from '../shared/components/PipelineIconFlow';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { RISK_LABEL, STATUS_LABEL, TYPE_LABEL, toneForRisk } from '../shared/utils/format';

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

export function OverviewPage() {
  const navigate = useNavigate();

  return (
    <PageShell eyebrow="系统总览" title="发现 AI 生成内容的隐藏证据" description="自动标注 · 语义链检测 · 结构化报告">
      <section className="flex min-h-[40vh] flex-col justify-center">
        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-[-1px] text-[#e8edf5]">
          发现 <span className="text-cyan-400">AI 生成内容</span> 的隐藏证据
        </h1>
        <p className="mt-5 text-lg text-[#7a8aa0]">自动标注 · 语义链检测 · 结构化报告</p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/analysis/sample')}
            className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#06101a]"
          >
            开始检测
          </button>
          <button
            type="button"
            onClick={() => navigate('/samples')}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-[#e8edf5]"
          >
            查看样本库
          </button>
        </div>
      </section>

      <section className="mt-2">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="relative h-[280px] overflow-hidden rounded-xl border-2 border-green-500 bg-[#080d14]">
            <img src="/demo-assets/real.jpg" alt="真实图像" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 rounded-lg border border-green-500/30 bg-green-500/15 px-3 py-2 text-sm text-green-400">
              ✓ 真实图像 · 置信度 96%
            </div>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-xl border-2 border-red-500 bg-[#080d14]">
            <img src="/demo-assets/fake.jpg" alt="AI 生成图像" className="h-full w-full object-cover" />
            {compareRegions.map((region) => (
              <div
                key={region.label}
                className={`absolute rounded-lg border-2 border-dashed border-red-500 bg-red-500/10 ${region.className}`}
              >
                <span className="absolute -top-7 left-0 rounded-md border border-red-500/30 bg-red-500/15 px-2 py-1 text-xs text-red-300">
                  {region.label}
                </span>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 rounded-lg border border-red-500/30 bg-red-500/15 px-3 py-2 text-sm text-red-300">
              ⚠ AI 生成 · 高风险 · 置信度 94%
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {['边界异常', '纹理断裂', '反射不一致'].map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#7a8aa0]">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          ['94.7%', 'AI生成检出率'],
          ['< 2s', '单图平均分析时间'],
          ['6 类', '证据类型覆盖'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-5xl font-bold text-cyan-400">{value}</p>
            <p className="mt-3 text-sm text-[#7a8aa0]">{label}</p>
          </div>
        ))}
      </section>

      <SectionCard title="处理流程" className="mt-8">
        <PipelineIconFlow nodes={pipelineNodes} />
      </SectionCard>

      <SectionCard title="最近任务" className="mt-8">
        <div className="grid gap-3 lg:grid-cols-3">
          {recentTasks.map((task) => (
            <div key={task.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#e8edf5]">{task.label}</p>
                  <p className="mt-1 text-xs text-[#7a8aa0]">
                    {task.sampleId} · {TYPE_LABEL[task.type]} · {task.completedAt}
                  </p>
                  <p className="mt-1 text-xs text-[#7a8aa0]">{STATUS_LABEL[task.status]}</p>
                </div>
                <StatusBadge tone={toneForRisk(task.riskLevel)}>{RISK_LABEL[task.riskLevel]}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
