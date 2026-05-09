import ReactECharts from 'echarts-for-react';
import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';
import { expertResults } from '../features/analysis/data';
import { SemanticChainPanel } from '../features/analysis/components/SemanticChainPanel';
import { samples } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';

export function AnalysisCenterPage() {
  const expertOption = {
    backgroundColor: 'transparent',
    color: ['#00c4ff'],
    radar: {
      indicator: expertResults.map((expert) => ({ name: expert.name.replace('专家', ''), max: 100 })),
      axisName: { color: '#7a8aa0' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,.08)' } },
      splitArea: { areaStyle: { color: ['rgba(255,255,255,.03)', 'rgba(255,255,255,.01)'] } },
    },
    series: [{ type: 'radar', data: [{ value: expertResults.map((expert) => expert.score) }] }],
  };

  return (
    <PageShell eyebrow="检测中心" title="可解释 AI 检测" description="语义链 × 专家组 × 证据融合">
      <section className="rounded-2xl border border-[#00c4ff]/25 bg-[#00c4ff]/[0.05] p-8">
        <div className="flex items-center justify-between gap-5">
          <div>
            <h2 className="text-4xl font-bold">可解释 AI 检测</h2>
            <p className="mt-3 text-[#7a8aa0]">语义链 × 专家组 × 证据融合</p>
          </div>
          <Link to="/analysis/sample" className="inline-flex items-center gap-2 rounded-xl bg-[#00c4ff] px-6 py-3 text-sm font-semibold text-[#06101a]">
            <Cpu className="h-4 w-4" />
            进入检测工作台
          </Link>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <SectionCard title="语义链">
          <SemanticChainPanel steps={[]} compact />
          <div className="grid grid-cols-4 gap-2">
            {['全局语义', '局部区域', '逻辑一致', '解释输出'].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-5 text-center text-sm text-[#00c4ff]">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="专家组">
          <ReactECharts option={expertOption} style={{ height: 260 }} />
        </SectionCard>
      </div>

      <SectionCard title="最近检测结果" className="mt-5">
        <div className="grid gap-3 lg:grid-cols-4">
          {samples.slice(0, 4).map((sample) => (
            <div key={sample.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{sample.id}</p>
                  <p className="mt-1 text-xs text-[#7a8aa0]">{sample.title}</p>
                </div>
                <StatusBadge tone={sample.riskScore > 70 ? 'risk' : 'warning'}>{sample.riskScore}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
