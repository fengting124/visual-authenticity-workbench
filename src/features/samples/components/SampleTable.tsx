import { Link } from 'react-router-dom';
import type { EvidenceSample } from '../types';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { riskLabel, statusLabel, toneForRisk, toneForStatus } from '../../../shared/utils/format';

type SampleTableProps = {
  samples: EvidenceSample[];
  selectedId: string;
  onSelect: (sample: EvidenceSample) => void;
};

export function SampleTable({ samples, selectedId, onSelect }: SampleTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-graphite-800">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-graphite-850 text-xs uppercase tracking-[0.12em] text-forensic-stone">
          <tr>
            <th className="px-4 py-3 text-left">样本</th>
            <th className="px-4 py-3 text-left">类型</th>
            <th className="px-4 py-3 text-left">来源</th>
            <th className="px-4 py-3 text-left">生成器</th>
            <th className="px-4 py-3 text-left">标注</th>
            <th className="px-4 py-3 text-left">分析</th>
            <th className="px-4 py-3 text-left">报告</th>
            <th className="px-4 py-3 text-left">风险</th>
            <th className="px-4 py-3 text-left">创建时间</th>
            <th className="px-4 py-3 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample) => (
            <tr
              key={sample.id}
              className={`border-t border-graphite-800 bg-graphite-900/80 ${
                selectedId === sample.id ? 'outline outline-1 outline-forensic-gold/40' : ''
              }`}
            >
              <td className="px-4 py-3">
                <button type="button" onClick={() => onSelect(sample)} className="text-left">
                  <span className="font-medium text-forensic-text">{sample.id}</span>
                  <span className="mt-1 block text-xs text-forensic-stone">{sample.title}</span>
                </button>
              </td>
              <td className="px-4 py-3 text-forensic-stone">{sample.type === 'image' ? '图像' : '视频'}</td>
              <td className="px-4 py-3 text-forensic-stone">{sample.source === 'generated' ? '生成' : sample.source === 'real' ? '真实' : '未知'}</td>
              <td className="px-4 py-3 text-forensic-stone">{sample.generator ?? '未知'}</td>
              <td className="px-4 py-3">
                <StatusBadge tone={toneForStatus(sample.annotationStatus)}>{statusLabel(sample.annotationStatus)}</StatusBadge>
              </td>
              <td className="px-4 py-3">
                <StatusBadge tone={toneForStatus(sample.analysisStatus)}>{statusLabel(sample.analysisStatus)}</StatusBadge>
              </td>
              <td className="px-4 py-3">
                <StatusBadge tone={toneForStatus(sample.reportStatus)}>{statusLabel(sample.reportStatus)}</StatusBadge>
              </td>
              <td className="px-4 py-3">
                <StatusBadge tone={toneForRisk(sample.riskLevel)}>{riskLabel(sample.riskLevel)}</StatusBadge>
              </td>
              <td className="px-4 py-3 text-forensic-stone">{sample.createdAt}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2 text-xs">
                  <Link to={sample.type === 'image' ? '/annotation/image' : '/annotation/video'} className="text-forensic-gold">标注</Link>
                  <Link to="/analysis/sample" className="text-forensic-olive">分析</Link>
                  <Link to="/report" className="text-forensic-stone">报告</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
