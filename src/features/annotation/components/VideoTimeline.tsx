import { motion } from 'framer-motion';
import type { VideoSegmentEvidence } from '../../samples/types';

type VideoTimelineProps = {
  segments: VideoSegmentEvidence[];
  selectedId: string;
  onSelect: (id: string) => void;
};

const positions = [
  { left: 14, width: 18 },
  { left: 43, width: 16 },
  { left: 70, width: 13 },
];

export function VideoTimeline({ segments, selectedId, onSelect }: VideoTimelineProps) {
  return (
    <div className="rounded-md border border-graphite-800 bg-[#101213] p-4">
      <div className="mb-3 flex justify-between text-xs text-forensic-stone">
        <span>00:00</span>
        <span>00:10</span>
        <span>00:20</span>
        <span>00:30</span>
      </div>
      <div className="relative h-16 rounded bg-graphite-850">
        <div className="absolute inset-x-0 top-1/2 h-px bg-graphite-800" />
        <div className="absolute bottom-0 left-[37%] top-0 w-px bg-forensic-gold" />
        {segments.map((segment, index) => (
          <motion.button
            type="button"
            key={segment.id}
            whileHover={{ y: -3 }}
            onClick={() => onSelect(segment.id)}
            className={`absolute top-4 h-8 rounded border px-2 text-xs ${
              selectedId === segment.id
                ? 'border-forensic-risk bg-forensic-risk/20 text-forensic-risk'
                : 'border-forensic-warning/50 bg-forensic-warning/20 text-forensic-warning'
            }`}
            style={{ left: `${positions[index % positions.length].left}%`, width: `${positions[index % positions.length].width}%` }}
          >
            <span className="flex h-full items-center truncate">
              {segment.id} · {segment.riskScore}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
