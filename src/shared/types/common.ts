export type StatusTone = 'neutral' | 'success' | 'warning' | 'risk';

export type Metric = {
  label: string;
  value: string;
  detail: string;
  tone: StatusTone;
};
