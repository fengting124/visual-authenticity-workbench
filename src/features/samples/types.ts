export type SampleType = 'image' | 'video';
export type SampleSource = 'real' | 'generated' | 'unknown';
export type WorkflowStatus = 'pending' | 'running' | 'review' | 'complete';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type FakeRegion = {
  id: string;
  label: string;
  type: string;
  clue: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  semanticStepId: string;
  expertIds: string[];
  reviewStatus: WorkflowStatus;
};

export type VideoSegmentEvidence = {
  id: string;
  label: string;
  start: string;
  end: string;
  riskScore: number;
  clue: string;
  keyframes: string[];
  regions: FakeRegion[];
  semanticStepId: string;
  expertIds: string[];
  reviewStatus: WorkflowStatus;
};

export type EvidenceSample = {
  id: string;
  title: string;
  type: SampleType;
  source: SampleSource;
  generator?: string;
  assetSrc?: string;
  videoSrc?: string;
  category: string;
  prompt: string;
  annotationStatus: WorkflowStatus;
  analysisStatus: WorkflowStatus;
  reportStatus: WorkflowStatus;
  riskLevel: RiskLevel;
  riskScore: number;
  createdAt: string;
  regions: FakeRegion[];
  segments: VideoSegmentEvidence[];
};
