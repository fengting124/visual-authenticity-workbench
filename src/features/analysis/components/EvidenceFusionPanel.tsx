import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { evidenceSummary } from '../data';
import { RiskDecisionCard } from './RiskDecisionCard';

export function EvidenceFusionPanel() {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  function generateReport() {
    setCreating(true);
    window.setTimeout(() => navigate('/report'), 800);
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      <div className="grid flex-1 grid-cols-4 gap-3">
        {evidenceSummary.map((item) => (
          <div key={item.label} className="rounded-md border border-graphite-800 bg-graphite-850 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-forensic-stone">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-forensic-text">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="lg:w-[360px]">
        <RiskDecisionCard creating={creating} onGenerate={generateReport} />
      </div>
    </div>
  );
}
