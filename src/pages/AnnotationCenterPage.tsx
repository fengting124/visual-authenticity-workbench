import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
import { ImageIcon, Video } from 'lucide-react';
import { samples } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { statusLabel, toneForStatus } from '../shared/utils/format';

export function AnnotationCenterPage() {
  const navigate = useNavigate();
  const annotationProgressOption = {
    backgroundColor: 'transparent',
    color: ['#00c4ff', '#0d1421'],
    series: [
      {
        type: 'pie',
        radius: ['72%', '88%'],
        silent: true,
        label: { show: true, position: 'center', formatter: '72%', color: '#00c4ff', fontSize: 34, fontWeight: 700 },
        data: [
          { value: 72, name: '完成' },
          { value: 28, name: '剩余' },
        ],
      },
    ],
  };
  const evidenceTypeOption = {
    backgroundColor: 'transparent',
    color: ['#00c4ff'],
    xAxis: { type: 'value', axisLabel: { color: '#7a8aa0' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.08)' } } },
    yAxis: {
      type: 'category',
      data: ['伪造区域', '视频片段', '关键帧', '提示词线索'],
      axisLabel: { color: '#7a8aa0' },
    },
    series: [{ type: 'bar', data: [7, 5, 13, 10], barWidth: 12 }],
    grid: { top: 20, bottom: 20, left: 80, right: 20 },
  };

  return (
    <PageShell eyebrow="标注中心" title="数据标注" description="">
      <div className="grid gap-5 lg:grid-cols-2">
        <button
          type="button"
          onClick={() => navigate('/annotation/image')}
          className="flex h-60 flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-0.5 hover:border-[#00c4ff]/40 hover:bg-[#00c4ff]/[0.06]"
        >
          <ImageIcon className="h-12 w-12 text-[#00c4ff]" />
          <p className="text-2xl font-semibold">图像标注</p>
          <p className="text-sm text-[#7a8aa0]">自动发现可疑区域</p>
          <span className="rounded-lg bg-[#00c4ff] px-5 py-2 text-sm font-semibold text-[#06101a]">进入</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/annotation/video')}
          className="flex h-60 flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-0.5 hover:border-[#7c5bdb]/40 hover:bg-[#7c5bdb]/[0.08]"
        >
          <Video className="h-12 w-12 text-[#7c5bdb]" />
          <p className="text-2xl font-semibold">视频标注</p>
          <p className="text-sm text-[#7a8aa0]">定位可疑片段</p>
          <span className="rounded-lg bg-[#7c5bdb] px-5 py-2 text-sm font-semibold text-white">进入</span>
        </button>
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
            <div key={sample.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{sample.id}</p>
                  <p className="mt-1 text-xs text-[#7a8aa0]">{sample.type === 'image' ? '图像' : '视频'}</p>
                </div>
                <StatusBadge tone={toneForStatus(sample.annotationStatus)}>
                  {statusLabel(sample.annotationStatus)}
                </StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
