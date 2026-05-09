import { Image } from 'lucide-react';

type EmptyAssetPlaceholderProps = {
  label: string;
  detail?: string;
};

export function EmptyAssetPlaceholder({ label, detail }: EmptyAssetPlaceholderProps) {
  return (
    <div className="flex h-full min-h-52 flex-col items-center justify-center rounded-md border border-dashed border-forensic-gold/[0.08] bg-black/20 text-center">
      <Image className="mb-3 h-8 w-8 text-forensic-gold" />
      <p className="text-sm font-medium text-forensic-text">{label}</p>
      {detail && <p className="mt-1 max-w-sm text-xs text-forensic-stone">{detail}</p>}
    </div>
  );
}
