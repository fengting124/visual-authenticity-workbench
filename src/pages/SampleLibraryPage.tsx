import { useMemo, useState } from 'react';
import { samples } from '../features/samples/data';
import type { EvidenceSample } from '../features/samples/types';
import { addImportedSamples, getImportedSamples } from '../features/samples/importedSamples';
import { SampleCard } from '../features/samples/components/SampleCard';
import { SampleFilters } from '../features/samples/components/SampleFilters';
import { SampleImportPanel } from '../features/samples/components/SampleImportPanel';
import { SampleStatusPanel } from '../features/samples/components/SampleStatusPanel';
import { SampleTable } from '../features/samples/components/SampleTable';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';

export function SampleLibraryPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedSample, setSelectedSample] = useState<EvidenceSample>(samples[0]);
  const [importedSamples, setImportedSamples] = useState<EvidenceSample[]>(() => getImportedSamples());
  const allSamples = useMemo(() => [...importedSamples, ...samples], [importedSamples]);
  const visibleMetrics = useMemo(
    () => ({
      total: allSamples.length,
      annotated: allSamples.filter((sample) => sample.annotationStatus !== 'pending').length,
      analyzed: allSamples.filter((sample) => sample.analysisStatus !== 'pending').length,
      highRisk: allSamples.filter((sample) => sample.riskLevel === 'high' || sample.riskLevel === 'critical').length,
    }),
    [allSamples],
  );

  const filteredSamples = useMemo(
    () =>
      allSamples.filter((sample) => {
        const matchesType = selectedType === 'all' || sample.type === selectedType;
        const matchesRisk = selectedRisk === 'all' || sample.riskLevel === selectedRisk;
        const matchesStatus =
          selectedStatus === 'all' || sample.annotationStatus === selectedStatus;
        const keyword = search.trim().toLowerCase();
        const matchesSearch =
          keyword.length === 0 ||
          sample.id.toLowerCase().includes(keyword) ||
          sample.title.toLowerCase().includes(keyword);
        return matchesType && matchesRisk && matchesStatus && matchesSearch;
      }),
    [allSamples, selectedType, selectedRisk, selectedStatus, search],
  );

  function handleImport(nextSamples: EvidenceSample[]) {
    addImportedSamples(nextSamples);
    setImportedSamples((current) => [...nextSamples, ...current]);
    setSelectedSample(nextSamples[0] ?? selectedSample);
  }

  return (
    <PageShell
      eyebrow="样本库"
      title="统一样本证据工作区"
      description="样本库连接导入、自动标注、可解释检测、证据融合与最终报告。"
    >
      <div className="mb-5 grid gap-3 md:grid-cols-4">
        {[
          { label: '总样本', value: visibleMetrics.total },
          { label: '待标注', value: visibleMetrics.total - visibleMetrics.annotated },
          { label: '已完成', value: visibleMetrics.analyzed },
          { label: '高风险', value: visibleMetrics.highRisk },
        ].map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 px-5 py-4 shadow-workstation"
          >
            <span className="font-mono text-3xl font-semibold tabular-nums text-forensic-gold">{metric.value}</span>
            <span className="text-right text-xs leading-5 text-forensic-stone">{metric.label}</span>
          </div>
        ))}
      </div>
      <SectionCard title="样本导入" eyebrow="输入层">
        <SampleImportPanel imported={importedSamples.length > 0} importedCount={importedSamples.length} onImport={handleImport} />
      </SectionCard>
      <div className="mt-5 grid grid-cols-[1fr_360px] gap-5">
        <div className="space-y-5">
          <SectionCard title="筛选条件">
            <SampleFilters
              selectedType={selectedType}
              selectedRisk={selectedRisk}
              selectedStatus={selectedStatus}
              search={search}
              onTypeChange={setSelectedType}
              onRiskChange={setSelectedRisk}
              onStatusChange={setSelectedStatus}
              onSearchChange={setSearch}
            />
          </SectionCard>
          <SectionCard title="样本表" eyebrow="共享证据上下文">
            <SampleTable
              samples={filteredSamples}
              selectedId={selectedSample.id}
              onSelect={setSelectedSample}
            />
          </SectionCard>
        </div>
        <div className="space-y-5">
          <SectionCard title="当前样本" eyebrow="上下文">
            <SampleStatusPanel sample={selectedSample} />
          </SectionCard>
          <SectionCard title="样本卡片" eyebrow="快速选择">
            <div className="space-y-3">
              {filteredSamples.slice(0, 3).map((sample) => (
                <SampleCard
                  key={sample.id}
                  sample={sample}
                  selected={sample.id === selectedSample.id}
                  onSelect={setSelectedSample}
                />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </PageShell>
  );
}
