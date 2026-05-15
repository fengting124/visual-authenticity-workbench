import { motion, useReducedMotion } from 'framer-motion';

export function HeroDemoCard() {
  const prefersReduced = useReducedMotion();
  const regions = [
    { id: 'R-01', x: 57, y: 24, w: 24, h: 19, confidence: 82, delay: 0 },
    { id: 'R-02', x: 22, y: 53, w: 26, h: 20, confidence: 74, delay: 1.5 },
    { id: 'R-03', x: 39, y: 31, w: 18, h: 28, confidence: 68, delay: 3 },
  ];

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-forensic-gold/25 bg-graphite-950 shadow-workstation">
      <div className="absolute left-3 top-3 z-30 h-4 w-4 border-l-2 border-t-2 border-forensic-gold" />
      <div className="absolute right-3 top-3 z-30 h-4 w-4 border-r-2 border-t-2 border-forensic-gold" />
      <div className="absolute bottom-3 left-3 z-30 h-4 w-4 border-b-2 border-l-2 border-forensic-gold" />
      <div className="absolute bottom-3 right-3 z-30 h-4 w-4 border-b-2 border-r-2 border-forensic-gold" />

      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-2 border-b border-forensic-gold/15 bg-graphite-950/80 px-4 py-2 backdrop-blur">
        <div className="flex items-center gap-2 font-mono text-[10px] tabular-nums text-forensic-stone">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-forensic-risk" />
          SAMPLE · IMG-DEMO-FAKE
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">ANALYZING</span>
      </div>

      <img src="/demo-assets/fake.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />

      {!prefersReduced && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #B88A44, rgba(184,138,68,0.6), #B88A44, transparent)',
            boxShadow: '0 0 16px 4px rgba(184,138,68,0.5)',
            animation: 'hero-scan 4s linear infinite',
          }}
        />
      )}

      {regions.map((region) => (
        <motion.div
          key={region.id}
          className="absolute z-20"
          style={{ left: `${region.x}%`, top: `${region.y}%`, width: `${region.w}%`, height: `${region.h}%` }}
          animate={prefersReduced ? undefined : { opacity: [0, 1, 1, 0] }}
          transition={prefersReduced ? undefined : { duration: 4.5, repeat: Infinity, delay: region.delay, times: [0, 0.15, 0.85, 1] }}
        >
          <div className="absolute inset-0 rounded border border-forensic-risk/80 bg-forensic-risk/10" />
          <div className="absolute -left-px -top-px h-2 w-2 border-l-2 border-t-2 border-forensic-risk" />
          <div className="absolute -right-px -top-px h-2 w-2 border-r-2 border-t-2 border-forensic-risk" />
          <div className="absolute -bottom-px -left-px h-2 w-2 border-b-2 border-l-2 border-forensic-risk" />
          <div className="absolute -bottom-px -right-px h-2 w-2 border-b-2 border-r-2 border-forensic-risk" />
          <div className="absolute -top-5 left-0 rounded bg-graphite-950/95 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-forensic-risk">
            {region.id} · {region.confidence}%
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-12 right-4 z-30 rounded-md border border-forensic-risk/60 bg-graphite-950/90 px-3 py-2 backdrop-blur">
        <div className="font-mono text-[9px] uppercase tracking-widest text-forensic-stone">VERDICT</div>
        <div className="mt-0.5 font-mono text-sm font-bold text-forensic-risk">AI-GENERATED</div>
        <div className="font-mono text-[10px] tabular-nums text-forensic-risk/80">CONFIDENCE 82%</div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-4 gap-2 border-t border-forensic-gold/15 bg-graphite-950/85 px-3 py-2 backdrop-blur">
        {[
          { label: '空间', value: '82' },
          { label: '频域', value: '76' },
          { label: '风格', value: '68' },
          { label: '语义', value: '89' },
        ].map((metric) => (
          <div key={metric.label} className="text-center">
            <div className="font-mono text-[9px] uppercase tracking-wider text-forensic-stone/60">{metric.label}</div>
            <div className="font-mono text-xs tabular-nums text-forensic-gold">{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
