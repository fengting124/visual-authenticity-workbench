import { useState } from 'react';
import { activeSample, samples } from '../../samples/data';
import { expertResults, semanticSteps } from '../../analysis/data';
import type { ReportSectionData } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { VideoPlayer } from '../../../shared/components/VideoPlayer';
import { EvidenceList } from './EvidenceList';
import { ReportSection } from './ReportSection';

type ReportPreviewProps = {
  sections: ReportSectionData[];
};

const catalog = [
  '报告摘要',
  '样本信息',
  '自动证据标注',
  '语义链理解',
  '专家组检测',
  '证据融合',
  '最终结论',
  '复核建议',
];

export function ReportPreview({ sections }: ReportPreviewProps) {
  const [selectedSampleId, setSelectedSampleId] = useState(activeSample.id);
  const selectedSample = samples.find((sample) => sample.id === selectedSampleId) ?? activeSample;

  return (
    <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
      <aside className="h-fit rounded-lg border border-white/10 bg-white/[0.04] p-3 lg:sticky lg:top-24">
        <p className="text-xs uppercase tracking-[0.18em] text-forensic-gold">报告目录</p>
        <div className="mt-4 space-y-2">
          {catalog.map((item, index) => (
            <a
              key={item}
              href={`#report-${index}`}
              className="block rounded-md border border-transparent px-3 py-2 text-sm text-forensic-stone hover:border-graphite-800 hover:bg-graphite-850"
            >
              {item}
            </a>
          ))}
        </div>
      </aside>
      <article className="rounded-lg border border-graphite-800 bg-[#16191b]/90 p-8 shadow-workstation backdrop-blur">
        <section id="report-0" className="mb-8 border-b border-graphite-800 pb-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-forensic-gold">结构化证据报告</p>
              <h2 className="mt-2 text-2xl font-semibold">视觉生成内容证据分析</h2>
              <p className="mt-2 text-sm text-forensic-stone">
                候选证据与分析证据分层呈现，便于复核、归档与后续接入真实服务。
              </p>
            </div>
            <StatusBadge tone="warning">待复核</StatusBadge>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-md border border-graphite-800 bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">样本编号</p>
              <select
                value={selectedSampleId}
                onChange={(event) => setSelectedSampleId(event.target.value)}
                className="mt-2 w-full rounded border border-graphite-800 bg-graphite-950 px-2 py-2 text-sm font-semibold outline-none"
              >
                {samples.map((sample) => (
                  <option key={sample.id} value={sample.id}>
                    {sample.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-md border border-graphite-800 bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">样本类型</p>
              <p className="mt-2 font-semibold">{selectedSample.type === 'image' ? '图像' : '视频'}</p>
            </div>
            <div className="rounded-md border border-graphite-800 bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">检测时间</p>
              <p className="mt-2 font-semibold">2026-05-08 12:10</p>
            </div>
            <div className="rounded-md border border-forensic-warning/35 bg-forensic-warning/10 p-4">
              <ScoreBar label="最终风险分数" value={selectedSample.riskScore} tone="warning" />
            </div>
          </div>
        </section>

        <section className="mb-8 border-b border-graphite-800 pb-6">
          <h3 className="mb-4 text-base font-semibold">样本预览</h3>
          {selectedSample.type === 'image' ? (
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#080d14]">
              <img src={selectedSample.assetSrc} alt="报告样本" className="h-72 w-full object-contain" />
              {selectedSample.regions.map((region) => (
                <div
                  key={region.id}
                  className="absolute rounded border-2 border-[#e05353] bg-[#e05353]/10"
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    width: `${region.width}%`,
                    height: `${region.height}%`,
                  }}
                />
              ))}
            </div>
          ) : (
            <VideoPlayer src={selectedSample.videoSrc} />
          )}
        </section>

        {sections.map((section, index) => (
          <div id={`report-${index + 1}`} key={section.title}>
            <ReportSection section={section} />
          </div>
        ))}

        <section className="border-t border-graphite-800 py-5">
          <h3 className="mb-4 text-base font-semibold">
            {selectedSample.type === 'image' ? '可疑图像区域' : '可疑视频片段'}
          </h3>
          <EvidenceList
            items={
              selectedSample.type === 'image'
                ? selectedSample.regions.map((region) => ({
                    label: `${region.id} · ${region.label}`,
                    value: `${region.clue} 置信度 ${region.confidence}。`,
                  }))
                : selectedSample.segments.map((segment) => ({
                    label: `${segment.id} · ${segment.label}`,
                    value: `${segment.start} 至 ${segment.end}，${segment.clue} 风险分数 ${segment.riskScore}。`,
                  }))
            }
          />
        </section>
        <section className="border-t border-graphite-800 py-5">
          <h3 className="mb-4 text-base font-semibold">语义链追踪</h3>
          <EvidenceList items={semanticSteps.map((step) => ({ label: step.name, value: step.result }))} />
        </section>
        <section className="border-t border-graphite-800 py-5">
          <h3 className="mb-4 text-base font-semibold">专家组追踪</h3>
          <EvidenceList items={expertResults.map((expert) => ({ label: expert.name, value: expert.evidence }))} />
        </section>
        <section className="border-t border-graphite-800 py-5">
          <h3 className="mb-4 text-base font-semibold">复核建议</h3>
          <div className="grid gap-3 text-sm md:grid-cols-4">
            {['人工复核高风险区域', '核验原始来源', '比对内容凭证', '补充同源样本'].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
                {item}
              </div>
            ))}
          </div>
        </section>
        <button
          type="button"
          className="mt-2 rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
        >
          导出报告
        </button>
      </article>
    </div>
  );
}
