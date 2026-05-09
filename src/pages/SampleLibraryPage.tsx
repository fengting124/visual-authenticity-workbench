import { useMemo, useState } from 'react';
import { samples } from '../features/samples/data';
import type { EvidenceSample } from '../features/samples/types';
import { SampleCard } from '../features/samples/components/SampleCard';
import { SampleFilters } from '../features/samples/components/SampleFilters';
import { SampleImportPanel } from '../features/samples/components/SampleImportPanel';
import { SampleStatusPanel } from '../features/samples/components/SampleStatusPanel';
import { SampleTable } from '../features/samples/components/SampleTable';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';

export function SampleLibraryPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedSample, setSelectedSample] = useState<EvidenceSample>(samples[0]);
  const [imported, setImported] = useState(false);

  const filteredSamples = useMemo(
    () =>
      samples.filter((sample) => {
        const matchesType = selectedType === 'all' || sample.type === selectedType;
        const keyword = search.trim().toLowerCase();
        const matchesSearch =
          keyword.length === 0 ||
          sample.id.toLowerCase().includes(keyword) ||
          sample.title.toLowerCase().includes(keyword);
        return matchesType && matchesSearch;
      }),
    [selectedType, search],
  );

  return (
    <PageShell
      eyebrow="样本库"
      title="统一样本证据工作区"
      description="样本库连接导入、自动标注、可解释检测、证据融合与最终报告。"
    >
      <SectionCard title="样本导入" eyebrow="输入层">
        <SampleImportPanel imported={imported} onImport={() => setImported(true)} />
      </SectionCard>
      <div className="mt-5 grid grid-cols-[1fr_360px] gap-5">
        <div className="space-y-5">
          <SectionCard title="筛选条件">
            <SampleFilters
              selectedType={selectedType}
              search={search}
              onTypeChange={setSelectedType}
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
