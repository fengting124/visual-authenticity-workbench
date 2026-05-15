import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { FolderOpen, Upload, FileImage, FileVideo } from 'lucide-react';
import type { EvidenceSample, FakeRegion, VideoSegmentEvidence } from '../types';

type SampleImportPanelProps = {
  onImport: (samples: EvidenceSample[]) => void;
  imported: boolean;
  importedCount: number;
};

const ACCEPTED_MEDIA = 'image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm,video/quicktime';

function isSupportedMedia(file: File) {
  return file.type.startsWith('image/') || file.type.startsWith('video/');
}

function createRegion(index: number): FakeRegion {
  const confidence = 64 + (index % 4) * 7;
  return {
    id: `R-${String((index % 9) + 1).padStart(2, '0')}`,
    label: '自动候选区域',
    type: confidence >= 78 ? '边界异常' : '纹理异常',
    clue: '导入样本已进入自动标注队列，系统生成候选复核区域。',
    confidence,
    x: 18 + (index % 4) * 13,
    y: 20 + (index % 3) * 14,
    width: 18,
    height: 16,
    semanticStepId: 'local',
    expertIds: ['spatial', 'style'],
    reviewStatus: 'review',
  };
}

function createSegments(index: number): VideoSegmentEvidence[] {
  return [
    {
      id: 'S-01',
      label: '自动候选片段',
      start: '00:03.20',
      end: '00:08.60',
      riskScore: 62 + (index % 4) * 6,
      clue: '导入视频已进入自动标注队列，系统生成候选片段。',
      keyframes: ['KF-01', 'KF-02', 'KF-03'],
      regions: [],
      semanticStepId: 'logic',
      expertIds: ['spatial', 'semantic'],
      reviewStatus: 'review',
    },
  ];
}

function createImportedSample(file: File, index: number): EvidenceSample {
  const type = file.type.startsWith('video/') ? 'video' : 'image';
  const idPrefix = type === 'video' ? 'VID-IMP' : 'IMG-IMP';
  const riskScore = 48 + (index % 6) * 7;
  const objectUrl = URL.createObjectURL(file);

  return {
    id: `${idPrefix}-${String(Date.now()).slice(-5)}-${String(index + 1).padStart(3, '0')}`,
    title: file.name,
    type,
    source: 'unknown',
    generator: '未知',
    assetSrc: type === 'image' ? objectUrl : undefined,
    videoSrc: type === 'video' ? objectUrl : undefined,
    category: type === 'image' ? '导入图像' : '导入视频',
    prompt: '本地导入样本，等待人工补充来源说明。',
    annotationStatus: 'review',
    analysisStatus: 'pending',
    reportStatus: 'pending',
    riskLevel: riskScore >= 75 ? 'high' : riskScore >= 55 ? 'medium' : 'low',
    riskScore,
    createdAt: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).replace(/\//g, '-'),
    regions: type === 'image' ? [createRegion(index)] : [],
    segments: type === 'video' ? createSegments(index) : [],
  };
}

function folderNameFromFiles(files: File[]) {
  const firstPath = files[0]?.webkitRelativePath;
  return firstPath ? firstPath.split('/')[0] : '已选择文件夹';
}

export function SampleImportPanel({ onImport, imported, importedCount }: SampleImportPanelProps) {
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [lastBatchName, setLastBatchName] = useState('未选择');
  const [lastBatchCount, setLastBatchCount] = useState(0);
  const summaryText = useMemo(() => {
    if (!imported) return '等待导入样本。';
    return `已导入 ${importedCount} 个样本，已生成自动标注候选证据。`;
  }, [imported, importedCount]);

  useEffect(() => {
    folderInputRef.current?.setAttribute('webkitdirectory', '');
    folderInputRef.current?.setAttribute('directory', '');
  }, []);

  function importFiles(fileList: FileList | null, sourceName: string) {
    const mediaFiles = Array.from(fileList ?? []).filter(isSupportedMedia);
    if (mediaFiles.length === 0) {
      setLastBatchName('未发现可导入媒体');
      setLastBatchCount(0);
      return;
    }

    const importedSamples = mediaFiles.map(createImportedSample);
    setLastBatchName(sourceName);
    setLastBatchCount(importedSamples.length);
    onImport(importedSamples);
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    importFiles(event.target.files, '手动选择文件');
    event.target.value = '';
  }

  function handleFolder(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    importFiles(event.target.files, folderNameFromFiles(files));
    event.target.value = '';
  }

  return (
    <div className="grid grid-cols-[1fr_280px] gap-4">
      <div className="rounded-md border border-dashed border-forensic-gold/[0.08] bg-black/20 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold">
            <Upload className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold">样本导入入口</p>
            <p className="mt-2 text-sm leading-6 text-forensic-stone">
              支持真实导入图像、视频或整个文件夹。导入后建立样本任务，并自动生成候选标注证据。
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-3">
            <FileImage className="mb-2 h-4 w-4 text-forensic-gold" />
            <p className="text-xs text-forensic-stone">图像输入</p>
            <p className="mt-1 text-sm">PNG / JPG / WEBP</p>
          </div>
          <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-3">
            <FileVideo className="mb-2 h-4 w-4 text-forensic-olive" />
            <p className="text-xs text-forensic-stone">视频输入</p>
            <p className="mt-1 text-sm">MP4 / WEBM / MOV</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-forensic-gold/35 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold transition-colors hover:bg-forensic-gold/15">
            <Upload className="h-4 w-4" />
            导入文件
            <input type="file" multiple accept={ACCEPTED_MEDIA} onChange={handleFiles} className="hidden" />
          </label>
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-forensic-olive/35 bg-forensic-olive/10 px-4 py-2 text-sm font-medium text-forensic-olive transition-colors hover:bg-forensic-olive/15">
            <FolderOpen className="h-4 w-4" />
            导入文件夹
            <input ref={folderInputRef} type="file" multiple accept={ACCEPTED_MEDIA} onChange={handleFolder} className="hidden" />
          </label>
        </div>
      </div>
      <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-forensic-stone">导入输出</p>
        <p className="mt-3 text-sm leading-6">{summaryText}</p>
        <div className="mt-4 rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3 text-xs">
          <div className="flex justify-between gap-3">
            <span className="text-forensic-stone">来源</span>
            <span className="truncate text-forensic-text">{lastBatchName}</span>
          </div>
          <div className="mt-2 flex justify-between gap-3">
            <span className="text-forensic-stone">本批数量</span>
            <span className="font-mono tabular-nums text-forensic-gold">{lastBatchCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
