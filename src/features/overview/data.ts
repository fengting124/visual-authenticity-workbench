import type { OverviewData } from './types';

export const overviewData: OverviewData = {
  metrics: [
    { label: 'Dataset Samples', value: '1,248', detail: 'Image and video records', tone: 'neutral' },
    { label: 'Annotated Items', value: '824', detail: 'Reviewed by mock operators', tone: 'success' },
    { label: 'Pending Segments', value: '136', detail: 'Video intervals awaiting review', tone: 'warning' },
    { label: 'High Risk Findings', value: '42', detail: 'Synthetic demonstration cases', tone: 'risk' },
  ],
  workflow: [
    { id: 'dataset', label: 'Dataset Annotation', detail: 'Region and segment evidence foundation' },
    { id: 'understanding', label: 'Content Understanding', detail: 'Semantic-chain parsing and logic checks' },
    { id: 'experts', label: 'Expert Detection', detail: 'Spatial, frequency, style, semantic evidence' },
    { id: 'report', label: 'Evidence Report', detail: 'Structured review output for demonstration' },
  ],
  recent: [
    { id: 'IA-2048', sample: 'Image sample A-17', type: 'Image', decision: 'Needs Review', score: 0.72 },
    { id: 'VA-1182', sample: 'Video sample V-09', type: 'Video', decision: 'Moderate Risk', score: 0.61 },
    { id: 'IA-2071', sample: 'Image sample A-22', type: 'Image', decision: 'Low Risk', score: 0.28 },
  ],
  tasks: [
    {
      title: 'Image Annotation',
      description: 'Mark localized visual artifacts and attach clue descriptions.',
      to: '/annotation/image',
      accent: 'gold',
    },
    {
      title: 'Video Annotation',
      description: 'Review suspicious intervals, keyframes, and temporal clues.',
      to: '/annotation/video',
      accent: 'olive',
    },
    {
      title: 'Sample Analysis',
      description: 'Run the full semantic-chain and expert-group evidence view.',
      to: '/analysis/sample',
      accent: 'stone',
    },
  ],
};
