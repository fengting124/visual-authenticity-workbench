import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { EvidenceSample } from '../types';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import {
  RISK_LABEL,
  SOURCE_LABEL,
  TYPE_LABEL,
  riskLabel,
  statusLabel,
  toneForRisk,
  toneForStatus,
} from '../../../shared/utils/format';

type SampleTableProps = {
  samples: EvidenceSample[];
  selectedId: string;
  onSelect: (sample: EvidenceSample) => void;
};

export function SampleTable({ samples, selectedId, onSelect }: SampleTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-forensic-gold/[0.08]">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-graphite-850 text-xs uppercase tracking-[0.12em] text-forensic-stone">
          <tr>
            <th className="px-4 py-3 text-left">样本</th>
            <th className="px-4 py-3 text-left">类型</th>
            <th className="px-4 py-3 text-left">来源</th>
            <th className="px-4 py-3 text-left">生成器</th>
            <th className="px-4 py-3 text-left">标注</th>
            <th className="px-4 py-3 text-left">检测</th>
            <th className="px-4 py-3 text-left">报告</th>
            <th className="px-4 py-3 text-left">风险</th>
            <th className="px-4 py-3 text-left">创建时间</th>
            <th className="px-4 py-3 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample, index) => (
            <motion.tr
              key={sample.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
              className={`border-t border-forensic-gold/[0.08] bg-graphite-900/80 ${
                selectedId === sample.id ? 'outline outline-1 outline-forensic-gold/40' : ''
              }`}
            >
              <td className="px-4 py-3">
                <button type="button" onClick={() => onSelect(sample)} className="text-left">
                  <span className="font-medium text-forensic-text">{sample.id}</span>
                  <span className="mt-1 block text-xs text-forensic-stone">{sample.title}</span>
                </button>
              </td>
              <td className="px-4 py-3 text-forensic-stone">{TYPE_LABEL[sample.type] ?? sample.type}</td>
              <td className="px-4 py-3 text-forensic-stone">{SOURCE_LABEL[sample.source] ?? sample.source}</td>
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
                <StatusBadge tone={toneForRisk(sample.riskLevel)}>{RISK_LABEL[sample.riskLevel] ?? riskLabel(sample.riskLevel)}</StatusBadge>
              </td>
              <td className="px-4 py-3 text-forensic-stone">{sample.createdAt}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2 text-xs">
                  <Link
                    to={`/${sample.type === 'image' ? 'annotation/image' : 'annotation/video'}?sampleId=${sample.id}`}
                    className="text-forensic-gold"
                  >
                    标注
                  </Link>
                  {sample.type === 'image' && (
                    <Link to={`/analysis/sample?sampleId=${sample.id}`} className="text-forensic-olive">
                      分析
                    </Link>
                  )}
                  <Link to={`/report?sampleId=${sample.id}`} className="text-forensic-stone">
                    报告
                  </Link>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
