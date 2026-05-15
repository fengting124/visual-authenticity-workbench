import ReactECharts from 'echarts-for-react';
import { Link } from 'react-router-dom';
import { Cpu, Video as VideoIcon } from 'lucide-react';
import { expertResults } from '../features/analysis/data';
import { samples } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { darkChartBase } from '../shared/utils/chartTheme';
import { RISK_LABEL, toneForRisk } from '../shared/utils/format';

const semanticNodes = ['全局语义', '局部区域', '逻辑一致性', '解释输出'];

export function AnalysisCenterPage() {
  const expertOption = {
    ...darkChartBase,
    radar: {
      indicator: [
        { name: '空间', max: 100 },
        { name: '频域', max: 100 },
        { name: '风格', max: 100 },
        { name: '语义', max: 100 },
      ],
      axisName: { color: '#A8A29A' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,.08)' } },
      splitArea: { areaStyle: { color: ['rgba(255,255,255,.03)', 'rgba(255,255,255,.01)'] } },
    },
    series: [{ type: 'radar', data: [{ value: expertResults.map((expert) => expert.score) }] }],
  };

  return (
    <PageShell eyebrow="检测中心" title="可解释 AI 检测" description="语义链 × 专家组 × 证据融合">
      <section className="rounded-2xl border border-forensic-gold/25 bg-forensic-gold/[0.05] p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-4xl font-bold">可解释 AI 检测</h2>
            <p className="mt-3 text-forensic-stone">语义链 × 专家组 × 证据融合</p>
          </div>
          <Link to="/analysis/sample" className="inline-flex items-center gap-2 rounded-xl bg-forensic-gold px-6 py-3 text-sm font-semibold text-graphite-950">
            <Cpu className="h-4 w-4" />
            进入检测工作台
          </Link>
        </div>
      </section>

      <div className="mt-5 opacity-40 cursor-not-allowed rounded-xl border border-forensic-gold/[0.08] p-6 flex items-center gap-4">
        <VideoIcon size={32} className="text-forensic-stone/60" />
        <div>
          <p className="text-sm font-medium text-forensic-stone">视频片段检测</p>
          <p className="text-xs text-forensic-stone/60">时序分析模块开发中，敬请期待</p>
        </div>
        <span className="ml-auto text-xs px-2 py-0.5 rounded bg-graphite-800 text-forensic-stone">规划中</span>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <SectionCard title="语义链">
          <div className="grid grid-cols-4 gap-2">
            {semanticNodes.map((item, index) => (
              <div key={item} className="relative flex h-10 items-center justify-center rounded-lg border border-forensic-gold/[0.08] bg-graphite-850 text-center text-sm text-forensic-gold">
                {item}
                {index < semanticNodes.length - 1 && <span className="absolute -right-2 top-1/2 h-px w-2 bg-forensic-gold/40" />}
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="专家贡献">
          <ReactECharts option={expertOption} style={{ height: 260 }} />
        </SectionCard>
      </div>

      <SectionCard title="最近检测结果" className="mt-5">
        <div className="grid gap-3 lg:grid-cols-4">
          {samples.slice(0, 4).map((sample) => (
            <div key={sample.id} className="rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{sample.id}</p>
                  <p className="mt-1 text-xs text-forensic-stone">{sample.title}</p>
                </div>
                <StatusBadge tone={toneForRisk(sample.riskLevel)}>{RISK_LABEL[sample.riskLevel] ?? sample.riskLevel}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
