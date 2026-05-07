import type { AnnotationTask, ImageSample, VideoSegment } from './types';

export const imageSample: ImageSample = {
  id: 'IMG-DEMO-014',
  prompt: 'A controlled forensic sample showing an indoor workstation scene with reflected surfaces.',
  source: 'Local benchmark subset',
  category: 'Indoor scene',
  status: 'Expert review pending',
  regions: [
    {
      id: 'R-01',
      label: 'Reflection mismatch',
      clue: 'Desk reflection shape diverges from visible object boundary.',
      confidence: 78,
      x: 58,
      y: 25,
      width: 22,
      height: 18,
    },
    {
      id: 'R-02',
      label: 'Texture discontinuity',
      clue: 'Fine-grain texture changes sharply across adjacent surface.',
      confidence: 64,
      x: 22,
      y: 52,
      width: 24,
      height: 20,
    },
  ],
};

export const videoSegments: VideoSegment[] = [
  {
    id: 'S-01',
    label: 'Temporal boundary shift',
    start: '00:04.20',
    end: '00:07.80',
    clue: 'Object contour remains stable while background perspective changes.',
    confidence: 69,
    status: 'Marked',
  },
  {
    id: 'S-02',
    label: 'Motion consistency gap',
    start: '00:13.10',
    end: '00:16.40',
    clue: 'Hand trajectory has a short acceleration discontinuity.',
    confidence: 74,
    status: 'Needs verification',
  },
  {
    id: 'S-03',
    label: 'Lighting drift',
    start: '00:22.00',
    end: '00:25.30',
    clue: 'Specular highlight moves against the dominant light direction.',
    confidence: 58,
    status: 'Draft',
  },
];

export const annotationTasks: AnnotationTask[] = [
  { id: 'T-1001', title: 'Generated image surface review', type: 'Image', status: 'In Review', progress: 72 },
  { id: 'T-1002', title: 'Synthetic video interval review', type: 'Video', status: 'Open', progress: 46 },
  { id: 'T-1003', title: 'Indoor scene prompt alignment', type: 'Image', status: 'Complete', progress: 100 },
];

export const datasetDistribution = [
  { name: 'Indoor', value: 38 },
  { name: 'Outdoor', value: 22 },
  { name: 'Human subject', value: 19 },
  { name: 'Object close-up', value: 21 },
];
