export type ImageRegion = {
  id: string;
  label: string;
  clue: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ImageSample = {
  id: string;
  prompt: string;
  source: string;
  category: string;
  status: string;
  regions: ImageRegion[];
};

export type VideoSegment = {
  id: string;
  label: string;
  start: string;
  end: string;
  clue: string;
  confidence: number;
  status: string;
};

export type AnnotationTask = {
  id: string;
  title: string;
  type: 'Image' | 'Video';
  status: string;
  progress: number;
};
