import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ImageIcon, Video } from 'lucide-react';
import { sampleMetrics, samples } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { darkChartBase } from '../shared/utils/chartTheme';
import { statusLabel, toneForStatus, TYPE_LABEL } from '../shared/utils/format';

export function AnnotationCenterPage() {
  const navigate = useNavigate();
  const annotatedPct = sampleMetrics.total > 0 ? Math.round((sampleMetrics.annotated / sampleMetrics.total) * 100) : 0;
  const imageCompleted = samples.filter((sample) => sample.type === 'image' && sample.annotationStatus !== 'pending').length;
  const imagePending = sampleMetrics.images - imageCompleted;
  const videoCompleted = samples.filter((sample) => sample.type === 'video' && sample.annotationStatus !== 'pending').length;
  const videoPending = sampleMetrics.videos - videoCompleted;

  const annotationProgressOption = {
    ...darkChartBase,
    series: [
      {
        type: 'pie',
        radius: ['72%', '88%'],
        silent: true,
        label: { show: true, position: 'center', formatter: `${annotatedPct}%`, color: '#B88A44', fontSize: 34, fontWeight: 700 },
        data: [
          { value: annotatedPct, name: '完成', itemStyle: { color: '#B88A44' } },
          { value: 100 - annotatedPct, name: '剩余', itemStyle: { color: '#2D3338' } },
        ],
      },
    ],
  };

  const evidenceTypeOption = {
    ...darkChartBase,
    xAxis: { type: 'value', axisLabel: { color: '#A8A29A' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.08)' } } },
    yAxis: {
      type: 'category',
      data: ['可疑区域', '视频片段', '关键帧', '提示词线索'],
      axisLabel: { color: '#A8A29A' },
    },
    series: [{ type: 'bar', data: [7, 5, 13, 10], barWidth: 12 }],
    grid: { ...darkChartBase.grid, left: 80 },
  };

  return (
    <PageShell eyebrow="标注中心" title="数据标注" description="">
      <div className="grid gap-5 lg:grid-cols-2">
        <motion.button
          type="button"
          onClick={() => navigate('/annotation/image')}
          className="group relative flex h-[260px] flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 transition-colors hover:border-forensic-gold/40 hover:bg-forensic-gold/[0.04]"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18 }}
        >
          <span className="absolute left-5 top-4 font-mono text-4xl font-bold tabular-nums text-forensic-gold/30">01</span>
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(184,138,68,0.15) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(184,138,68,0.4), transparent)' }}
          />
          <ImageIcon className="h-12 w-12 text-forensic-gold transition-transform duration-300 group-hover:scale-110" />
          <div className="text-center">
            <p className="text-2xl font-semibold">图像标注</p>
            <p className="mt-1 text-sm text-forensic-stone">自动发现可疑区域</p>
            <p className="mt-2 font-mono text-[11px] tabular-nums text-forensic-stone/70">
              已完成 {imageCompleted} · 待处理 {imagePending}
            </p>
          </div>
          <motion.span
            className="absolute bottom-5 right-5 rounded border border-forensic-gold/35 bg-graphite-950/60 px-3 py-1.5 font-mono text-[11px] font-semibold text-forensic-gold"
            whileHover={{ paddingLeft: '24px', paddingRight: '24px' }}
            transition={{ duration: 0.15 }}
          >
            [ ENTER → ]
          </motion.span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => navigate('/annotation/video')}
          className="group relative flex h-[260px] flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-forensic-olive/[0.12] bg-graphite-850 transition-colors hover:border-forensic-olive/40 hover:bg-forensic-olive/[0.04]"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18 }}
        >
          <span className="absolute left-5 top-4 font-mono text-4xl font-bold tabular-nums text-forensic-olive/30">02</span>
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(111,143,114,0.15) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(111,143,114,0.4), transparent)' }}
          />
          <Video className="h-12 w-12 text-forensic-olive transition-transform duration-300 group-hover:scale-110" />
          <div className="text-center">
            <p className="text-2xl font-semibold">视频标注</p>
            <p className="mt-1 text-sm text-forensic-stone">定位可疑片段</p>
            <p className="mt-2 font-mono text-[11px] tabular-nums text-forensic-stone/70">
              已完成 {videoCompleted} · 待处理 {videoPending}
            </p>
          </div>
          <motion.span
            className="absolute bottom-5 right-5 rounded border border-forensic-olive/35 bg-graphite-950/60 px-3 py-1.5 font-mono text-[11px] font-semibold text-forensic-olive"
            whileHover={{ paddingLeft: '24px', paddingRight: '24px' }}
            transition={{ duration: 0.15 }}
          >
            [ ENTER → ]
          </motion.span>
        </motion.button>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[360px_1fr]">
        <SectionCard title="标注进度">
          <ReactECharts option={annotationProgressOption} style={{ height: 260 }} />
        </SectionCard>
        <SectionCard title="证据类型分布">
          <ReactECharts option={evidenceTypeOption} style={{ height: 260 }} />
        </SectionCard>
      </div>

      <SectionCard title="最近标注任务" className="mt-5">
        <div className="grid gap-3 lg:grid-cols-3">
          {samples.slice(0, 6).map((sample) => (
            <div key={sample.id} className="rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{sample.id}</p>
                  <p className="mt-1 text-xs text-forensic-stone">{TYPE_LABEL[sample.type]}</p>
                </div>
                <StatusBadge tone={toneForStatus(sample.annotationStatus)}>{statusLabel(sample.annotationStatus)}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
