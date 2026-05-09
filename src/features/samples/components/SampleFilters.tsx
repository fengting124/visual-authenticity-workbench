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
          className="h-10 w-80 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-[#00c4ff]/40"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-[#7a8aa0]">类型</span>
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
                ? 'border-[#00c4ff]/40 bg-[#00c4ff]/10 text-[#00c4ff]'
                : 'border-white/10 bg-white/[0.04] text-[#7a8aa0]'
            }`}
          >
            {item.label}
          </button>
        ))}
        <span className="ml-3 text-[#7a8aa0]">风险</span>
        {riskTags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[#7a8aa0]">
            {tag}
          </span>
        ))}
        <span className="ml-3 text-[#7a8aa0]">状态</span>
        {statusTags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[#7a8aa0]">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
