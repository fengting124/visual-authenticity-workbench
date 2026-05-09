import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileImage, FileText, FileVideo, GitMerge, Tag, Upload, Cpu } from 'lucide-react';
import { fakeImageSample, realImageSample, sampleMetrics, samples } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { MetricStat } from '../shared/components/MetricStat';
import { PipelineIconFlow } from '../shared/components/PipelineIconFlow';
import { StatusBadge } from '../shared/components/StatusBadge';
import { readFileAsDataUrl, saveLocalAsset } from '../shared/utils/localSample';
import { riskLabel } from '../shared/utils/format';

const pipelineNodes = [
  { icon: Upload, label: '导入' },
  { icon: Tag, label: '标注' },
  { icon: Cpu, label: '检测' },
  { icon: GitMerge, label: '融合' },
  { icon: FileText, label: '报告' },
];

export function OverviewPage() {
  const navigate = useNavigate();
  const [imageName, setImageName] = useState('未选择图像');
  const [videoName, setVideoName] = useState('未选择视频');

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageName(file.name);
    readFileAsDataUrl(file, (dataUrl) => saveLocalAsset('image', dataUrl, file.name));
  }

  function handleVideo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setVideoName(file.name);
    readFileAsDataUrl(file, (dataUrl) => saveLocalAsset('video', dataUrl, file.name));
  }

  return (
    <PageShell
      eyebrow="系统总览"
      title="发现 AI 生成视觉内容的隐藏证据"
      description="自动标注 · 可解释检测 · 结构化报告"
    >
      <section className="grid min-h-[40vh] items-center gap-8 lg:grid-cols-[1fr_460px]">
        <div>
          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-[-1px] text-[#e8edf5]">
            发现 <span className="text-[#00c4ff]">AI 生成</span> 视觉内容的隐藏证据
          </h1>
          <p className="mt-5 text-lg text-[#7a8aa0]">自动标注 · 可解释检测 · 结构化报告</p>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/analysis/sample')}
              className="rounded-xl bg-[#00c4ff] px-6 py-3 text-sm font-semibold text-[#06101a]"
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
        </div>
        <SectionCard title="样本输入" eyebrow="主操作">
          <div className="grid gap-3">
            <label className="rounded-xl border border-white/10 bg-white/[0.04] p-4 hover:border-[#00c4ff]/40">
              <div className="flex items-center gap-3">
                <FileImage className="h-5 w-5 text-[#00c4ff]" />
                <div>
                  <p className="text-sm font-medium">导入图像</p>
                  <p className="text-xs text-[#7a8aa0]">{imageName}</p>
                </div>
              </div>
              <input type="file" accept="image/*" onChange={handleImage} className="mt-4 block w-full text-xs text-[#7a8aa0] file:mr-3 file:rounded-lg file:border-0 file:bg-[#00c4ff]/10 file:px-3 file:py-2 file:text-[#00c4ff]" />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => navigate('/annotation/image')} className="rounded-lg border border-[#00c4ff]/30 px-3 py-2 text-xs text-[#00c4ff]">图像标注</button>
                <button type="button" onClick={() => navigate('/analysis/sample')} className="rounded-lg border border-[#7c5bdb]/40 px-3 py-2 text-xs text-[#b8a8ff]">可解释检测</button>
              </div>
            </label>
            <label className="rounded-xl border border-white/10 bg-white/[0.04] p-4 hover:border-[#7c5bdb]/40">
              <div className="flex items-center gap-3">
                <FileVideo className="h-5 w-5 text-[#7c5bdb]" />
                <div>
                  <p className="text-sm font-medium">导入视频</p>
                  <p className="text-xs text-[#7a8aa0]">{videoName}</p>
                </div>
              </div>
              <input type="file" accept="video/*" onChange={handleVideo} className="mt-4 block w-full text-xs text-[#7a8aa0] file:mr-3 file:rounded-lg file:border-0 file:bg-[#7c5bdb]/10 file:px-3 file:py-2 file:text-[#b8a8ff]" />
              <button type="button" onClick={() => navigate('/annotation/video')} className="mt-3 w-full rounded-lg border border-[#7c5bdb]/40 px-3 py-2 text-xs text-[#b8a8ff]">视频标注</button>
            </label>
          </div>
        </SectionCard>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-center gap-4 text-sm">
          <span className="rounded-full border border-[#3ecf8e]/30 bg-[#3ecf8e]/10 px-3 py-1 text-[#3ecf8e]">真实图像</span>
          <span className="text-[#7a8aa0]">VS</span>
          <span className="rounded-full border border-[#e05353]/30 bg-[#e05353]/10 px-3 py-1 text-[#e05353]">AI 生成图像</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-xl border-2 border-[#3ecf8e]/70 bg-[#0d1421]">
            <img src={realImageSample.assetSrc} alt="真实图像样本" className="h-full w-full object-contain bg-[#080d14]" />
            <div className="absolute bottom-4 left-4 rounded-lg border border-[#3ecf8e]/30 bg-[#3ecf8e]/10 px-3 py-2 text-sm text-[#3ecf8e]">
              真实 · 置信度 96%
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl border-2 border-[#e05353]/70 bg-[#0d1421]">
            <img src={fakeImageSample.assetSrc} alt="AI 生成图像样本" className="h-full w-full object-contain bg-[#080d14]" />
            <div className="absolute left-[56%] top-[24%] h-20 w-32 rounded border-2 border-[#e05353] bg-[#e05353]/10" />
            <div className="absolute left-[22%] top-[58%] h-16 w-40 rounded border-2 border-[#d4a843] bg-[#d4a843]/10" />
            <div className="absolute bottom-4 left-4 rounded-lg border border-[#e05353]/30 bg-[#e05353]/10 px-3 py-2 text-sm text-[#e05353]">
              高风险 · AI 生成 · 置信度 94%
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {['反射不一致', '边界异常', '纹理断裂'].map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#7a8aa0]">{tag}</span>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <MetricStat number="94.7%" label="AI 生成检出率" color="cyan" />
        <MetricStat number="<2s" label="单图平均检测时间" color="purple" />
        <MetricStat number="6类" label="证据类型覆盖" color="gold" />
      </section>

      <SectionCard title="处理流程" className="mt-8">
        <PipelineIconFlow nodes={pipelineNodes} />
      </SectionCard>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
        <SectionCard title="最近任务">
          <div className="grid gap-3 md:grid-cols-2">
            {samples.slice(0, 4).map((sample) => (
              <div key={sample.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{sample.id}</p>
                    <p className="mt-1 text-xs text-[#7a8aa0]">{sample.title}</p>
                  </div>
                  <StatusBadge tone={sample.riskScore > 65 ? 'risk' : 'warning'}>
                    {riskLabel(sample.riskLevel)}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="样本统计">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-white/[0.04] p-3"><p className="text-2xl font-bold text-[#00c4ff]">{sampleMetrics.total}</p><p className="text-[#7a8aa0]">样本</p></div>
            <div className="rounded-lg bg-white/[0.04] p-3"><p className="text-2xl font-bold text-[#e05353]">{sampleMetrics.highRisk}</p><p className="text-[#7a8aa0]">高风险</p></div>
            <div className="rounded-lg bg-white/[0.04] p-3"><p className="text-2xl font-bold text-[#d4a843]">{sampleMetrics.reviewRequired}</p><p className="text-[#7a8aa0]">待复核</p></div>
            <div className="rounded-lg bg-white/[0.04] p-3"><p className="text-2xl font-bold text-[#3ecf8e]">{sampleMetrics.reports}</p><p className="text-[#7a8aa0]">报告</p></div>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
