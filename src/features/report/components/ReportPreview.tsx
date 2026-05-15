import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import { activeSample, samples } from '../../samples/data';
import { getImportedSamples } from '../../samples/importedSamples';
import type { ReportSectionData } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { VideoPlayer } from '../../../shared/components/VideoPlayer';
import { TYPE_LABEL } from '../../../shared/utils/format';
import { ReportSection } from './ReportSection';

type ReportPreviewProps = {
  sections: ReportSectionData[];
  onExport: () => void;
};

const catalog = ['报告摘要', '样本信息', '自动证据标注', '语义链理解', '专家组检测', '证据融合', '最终结论', '复核建议'];

export function ReportPreview({ sections, onExport }: ReportPreviewProps) {
  const reportSamples = [...getImportedSamples(), ...samples];
  const [searchParams] = useSearchParams();
  const initialSampleId = searchParams.get('sampleId') ?? activeSample.id;
  const [selectedSampleId, setSelectedSampleId] = useState(initialSampleId);
  const selectedSample = reportSamples.find((sample) => sample.id === selectedSampleId) ?? activeSample;

  return (
    <div className="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)]">
      <button
        type="button"
        onClick={onExport}
        className="group fixed right-8 top-20 z-30 inline-flex items-center gap-2 rounded-lg border border-forensic-gold/35 bg-graphite-900/90 px-4 py-2 text-sm font-medium text-forensic-gold backdrop-blur transition-all hover:border-forensic-gold/60 hover:bg-forensic-gold/10"
      >
        <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        导出 PDF
      </button>

      <aside className="h-fit rounded-lg border border-forensic-gold/[0.08] bg-graphite-850 p-3 lg:sticky lg:top-24 lg:row-span-2">
        <p className="text-xs uppercase tracking-[0.18em] text-forensic-gold">报告目录</p>
        <div className="mt-4 space-y-2">
          {catalog.map((item, index) => (
            <a
              key={item}
              href={`#report-${index}`}
              className="block rounded-md border border-transparent px-3 py-2 text-sm text-forensic-stone hover:border-forensic-gold/[0.08] hover:bg-graphite-850"
            >
              {item}
            </a>
          ))}
        </div>
      </aside>

      <div className="flex items-center gap-3 lg:col-start-2">
        <span className="text-xs text-forensic-stone">切换样本报告：</span>
        <select
          value={selectedSampleId}
          onChange={(event) => setSelectedSampleId(event.target.value)}
          className="min-w-0 rounded border border-forensic-gold/[0.08] bg-graphite-850 px-3 py-1.5 text-sm text-forensic-text outline-none focus:border-forensic-gold/40"
        >
          {reportSamples.map((sample) => (
            <option key={sample.id} value={sample.id}>
              {sample.id} · {sample.title}
            </option>
          ))}
        </select>
      </div>

      <article className="min-w-0 rounded-lg border border-forensic-gold/[0.08] bg-graphite-900/90 p-8 shadow-workstation backdrop-blur lg:col-start-2">
        <div className="relative mb-8 overflow-hidden rounded-lg border border-forensic-gold/20 bg-gradient-to-br from-graphite-900 to-graphite-950 p-6">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-forensic-gold to-transparent" />

          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
              <span className="rounded border border-forensic-risk/40 bg-forensic-risk/10 px-2 py-0.5 text-forensic-risk">CONFIDENTIAL</span>
              <span className="text-forensic-stone/50">·</span>
              <span className="text-forensic-stone">FORENSIC USE ONLY</span>
            </div>
            <span className="rounded border border-forensic-warning/35 bg-forensic-warning/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-forensic-warning">
              PENDING REVIEW
            </span>
          </div>

          <div className="border-l-2 border-forensic-gold pl-4">
            <h1 className="text-2xl font-semibold text-forensic-text">视觉内容真实性分析报告</h1>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-forensic-stone/60">VISUAL CONTENT AUTHENTICITY FORENSIC REPORT</p>
          </div>

          <div className="mt-5 grid gap-4 border-t border-forensic-gold/15 pt-4 text-xs md:grid-cols-4">
            {[
              { label: 'REPORT ID', value: 'VAW-2026-001' },
              { label: 'ISSUED', value: '2026-05-09 14:32' },
              { label: 'SYSTEM', value: 'v0.9.0-alpha' },
              { label: 'ANALYST', value: 'AUTO-PIPELINE' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-forensic-stone/50">{item.label}</p>
                <p className="mt-1 font-mono text-sm tabular-nums text-forensic-text">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <section id="report-0" className="mb-8 border-b border-forensic-gold/[0.08] pb-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-forensic-gold">结构化证据报告</p>
              <h2 className="mt-2 text-2xl font-semibold">视觉生成内容证据分析</h2>
            </div>
            <StatusBadge tone="warning">待复核</StatusBadge>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">样本编号</p>
              <p className="mt-2 break-words font-mono font-semibold tabular-nums">{selectedSample.id}</p>
            </div>
            <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">样本类型</p>
              <p className="mt-2 font-semibold">{TYPE_LABEL[selectedSample.type]}</p>
            </div>
            <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">检测时间</p>
              <p className="mt-2 font-mono font-semibold tabular-nums">2026-05-09 14:32</p>
            </div>
            <div className="rounded-md border border-forensic-warning/35 bg-forensic-warning/10 p-4 md:col-span-3">
              <ScoreBar label="最终风险分数" value={selectedSample.riskScore} tone="warning" />
            </div>
          </div>
        </section>

        <section className="mb-8 border-b border-forensic-gold/[0.08] pb-6">
          <h3 className="mb-4 text-base font-semibold">样本预览</h3>
          {selectedSample.type === 'image' ? (
            <div className="relative overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-950">
              {selectedSample.assetSrc ? (
                <img src={selectedSample.assetSrc} alt="报告样本" className="h-72 w-full object-contain" />
              ) : (
                <div className="flex h-72 items-center justify-center text-sm text-forensic-stone">
                  暂无图像资产
                </div>
              )}
              {selectedSample.regions.map((region) => (
                <div
                  key={region.id}
                  className="absolute rounded border-2 border-forensic-risk bg-forensic-risk/10"
                  style={{ left: `${region.x}%`, top: `${region.y}%`, width: `${region.width}%`, height: `${region.height}%` }}
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
      </article>
    </div>
  );
}
