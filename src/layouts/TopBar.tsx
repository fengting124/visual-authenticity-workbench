import { activeSample } from '../features/samples/data';

export function TopBar() {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-white/10 bg-[#080d14]/80 px-8 backdrop-blur-xl">
      <div>
        <p className="text-sm font-medium">视觉真实性证据工作台</p>
        <p className="text-xs text-forensic-stone">证据发现 · 可解释检测 · 结构化报告</p>
      </div>
      <div className="flex items-center gap-4 text-xs text-forensic-stone">
        <span className="rounded border border-forensic-olive/40 bg-forensic-olive/10 px-2 py-1 text-forensic-olive">
          系统就绪
        </span>
        <span className="rounded border border-forensic-gold/35 bg-forensic-gold/10 px-2 py-1 text-forensic-gold">
          当前样本：{activeSample.id}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-forensic-olive" />
          系统正常
        </span>
      </div>
    </header>
  );
}
