import type { Metric } from '../../shared/types/common';

export type WorkflowNode = {
  id: string;
  label: string;
  detail: string;
};

export type RecentAnalysis = {
  id: string;
  sample: string;
  type: string;
  decision: string;
  score: number;
};

export type TaskEntrance = {
  title: string;
  description: string;
  to: string;
  accent: 'gold' | 'olive' | 'stone';
};

export type OverviewData = {
  metrics: Metric[];
  workflow: WorkflowNode[];
  recent: RecentAnalysis[];
  tasks: TaskEntrance[];
};
