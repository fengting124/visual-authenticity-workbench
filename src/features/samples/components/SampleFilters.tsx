type SampleFiltersProps = {
  selectedType: string;
  search: string;
  onTypeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
};

const riskTags = ['高风险', '中风险', '低风险'];
const statusTags = ['未标注', '已标注', '已检测', '已报告'];

export function SampleFilters({
  selectedType,
  search,
  onTypeChange,
  onSearchChange,
}: SampleFiltersProps) {
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
        {riskTags.map((tag) => (
          <span key={tag} className="rounded-full border border-forensic-gold/[0.08] bg-graphite-850 px-3 py-1 text-forensic-stone">
            {tag}
          </span>
        ))}
        <span className="ml-3 text-forensic-stone">状态</span>
        {statusTags.map((tag) => (
          <span key={tag} className="rounded-full border border-forensic-gold/[0.08] bg-graphite-850 px-3 py-1 text-forensic-stone">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
