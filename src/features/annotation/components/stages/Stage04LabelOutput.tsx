import { demoReverseChain } from '../../data/reverseChain';

type Props = { isActive: boolean; isComplete: boolean };

export function Stage04LabelOutput({ isActive, isComplete }: Props) {
  const data = demoReverseChain.stage04_labels;
  const showContent = isActive || isComplete;

  if (!showContent) {
    return <p className="text-xs text-forensic-stone/40">等待启动 · 阶段尚未执行</p>;
  }

  const layers = [
    { id: 'L1', name: '全局语义', color: '#B88A44', items: 4 },
    { id: 'L2', name: '区域级证据', color: '#6F8F72', items: data.L2_local.length },
    {
      id: 'L3',
      name: '语义冲突',
      color: '#D2A64A',
      items: data.L3_semantic.knowledge_graph_conflicts.length + 1,
    },
    { id: 'L4', name: '生成链路', color: '#C95A4A', items: 6 },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="rounded border bg-graphite-900 p-2.5"
            style={{ borderColor: `${layer.color}40` }}
          >
            <p
              className="font-mono text-[10px] font-bold tabular-nums"
              style={{ color: layer.color }}
            >
              {layer.id}
            </p>
            <p className="mt-0.5 text-[10px] text-forensic-stone">{layer.name}</p>
            <p
              className="mt-1 font-mono text-base font-bold tabular-nums"
              style={{ color: layer.color }}
            >
              {layer.items}
              <span className="ml-1 text-[9px] font-normal text-forensic-stone/60">字段</span>
            </p>
          </div>
        ))}
      </div>
      <div className="rounded border border-forensic-gold/15 bg-graphite-950 p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
            EVIDENCE JSON · {data.evidence_id}
          </p>
          <span className="font-mono text-[9px] text-forensic-stone/60">{data.media_type}</span>
        </div>
        <pre className="overflow-x-auto font-mono text-[10px] leading-relaxed text-forensic-stone">
          {JSON.stringify(
            {
              L1_global: data.L1_global,
              L2_local: data.L2_local,
              L3_semantic: {
                ...data.L3_semantic,
                knowledge_graph_conflicts: data.L3_semantic.knowledge_graph_conflicts.slice(0, 1),
              },
              L4_chain: data.L4_chain,
            },
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  );
}
