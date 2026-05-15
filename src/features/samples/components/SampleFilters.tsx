type SampleFiltersProps = {
  selectedType: string;
  selectedRisk: string;
  selectedStatus: string;
  search: string;
  onTypeChange: (value: string) => void;
  onRiskChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
};

export function SampleFilters({
  selectedType,
  selectedRisk,
  selectedStatus,
  search,
  onTypeChange,
  onRiskChange,
  onStatusChange,
  onSearchChange,
}: SampleFiltersProps) {
  const hasActiveFilters = selectedRisk !== 'all' || selectedStatus !== 'all' || selectedType !== 'all' || search.trim().length > 0;
  const activeCount = [selectedType !== 'all', selectedRisk !== 'all', selectedStatus !== 'all', search.trim().length > 0].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="搜索样本编号、来源..."
          className="h-10 w-80 rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 px-4 text-sm outline-none focus:border-forensic-gold/40"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-forensic-stone">类型</span>
        {[
          { value: 'all', label: '全部' },
          { value: 'image', label: '图像' },
          { value: 'video', label: '视频' },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onTypeChange(item.value)}
            className={`rounded-full border px-3 py-1 ${
              selectedType === item.value
                ? 'border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold'
                : 'border-forensic-gold/[0.08] bg-graphite-850 text-forensic-stone'
            }`}
          >
            {item.label}
          </button>
        ))}
        <span className="ml-3 text-forensic-stone">风险</span>
        {[
          { value: 'all', label: '全部' },
          { value: 'high', label: '高风险' },
          { value: 'critical', label: '关键风险' },
          { value: 'medium', label: '中风险' },
          { value: 'low', label: '低风险' },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onRiskChange(item.value)}
            className={`rounded-full border px-3 py-1 text-sm ${
              selectedRisk === item.value
                ? 'border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold'
                : 'border-forensic-gold/[0.08] bg-graphite-850 text-forensic-stone'
            }`}
          >
            {item.label}
          </button>
        ))}
        <span className="ml-3 text-forensic-stone">状态</span>
        {[
          { value: 'all', label: '全部' },
          { value: 'pending', label: '未标注' },
          { value: 'complete', label: '已标注' },
          { value: 'review', label: '待复核' },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onStatusChange(item.value)}
            className={`rounded-full border px-3 py-1 text-sm ${
              selectedStatus === item.value
                ? 'border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold'
                : 'border-forensic-gold/[0.08] bg-graphite-850 text-forensic-stone'
            }`}
          >
            {item.label}
          </button>
        ))}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              onTypeChange('all');
              onRiskChange('all');
              onStatusChange('all');
              onSearchChange('');
            }}
            className="ml-auto flex items-center gap-1.5 rounded-full border border-forensic-risk/25 bg-forensic-risk/[0.08] px-3 py-1 text-xs text-forensic-risk transition-colors hover:border-forensic-risk/40 hover:bg-forensic-risk/[0.12]"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-forensic-risk/20 font-mono text-[10px] font-bold">
              {activeCount}
            </span>
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
}
