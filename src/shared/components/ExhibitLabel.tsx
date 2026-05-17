import { cn } from '../utils/cn';

type ExhibitLabelProps = {
  code: string;
  className?: string;
};

export function ExhibitLabel({ code, className }: ExhibitLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[1px] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]',
        className,
      )}
      style={{
        background: '#C9A66B',
        color: '#1C1E20',
        boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: '#1C1E20', opacity: 0.5 }}
      />
      {code}
    </span>
  );
}
