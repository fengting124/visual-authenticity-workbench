import type { StatusTone } from '../types/common';

export const STATUS_LABEL: Record<string, string> = {
  pending: '待处理',
  processing: '处理中',
  running: '处理中',
  done: '已完成',
  complete: '已完成',
  error: '错误',
  reviewed: '已复核',
  review: '待复核',
};

export const TYPE_LABEL: Record<string, string> = {
  image: '图像',
  video: '视频',
};

export const SOURCE_LABEL: Record<string, string> = {
  generated: '生成',
  real: '真实',
  unknown: '未知',
};

export const RISK_LABEL: Record<string, string> = {
  high: '高风险',
  medium: '中风险',
  low: '低风险',
  unknown: '未知',
  critical: '关键风险',
};

export const ANNOTATION_STATUS_LABEL: Record<string, string> = {
  unannotated: '未标注',
  annotated: '已标注',
  reviewed: '已复核',
  pending: '未标注',
  running: '处理中',
  review: '待复核',
  complete: '已标注',
};

export const DETECTION_STATUS_LABEL: Record<string, string> = {
  unanalyzed: '未检测',
  analyzing: '检测中',
  analyzed: '已检测',
  pending: '未检测',
  running: '检测中',
  review: '待复核',
  complete: '已检测',
};

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatScore(value: number) {
  return value.toFixed(2);
}

export function statusLabel(value: string) {
  return STATUS_LABEL[value] ?? value;
}

export function riskLabel(value: string) {
  return RISK_LABEL[value] ?? value;
}

export function toneForStatus(value: string): StatusTone {
  if (value === 'complete' || value === 'done' || value === 'reviewed') return 'success';
  if (value === 'review' || value === 'running' || value === 'processing') return 'warning';
  if (value === 'error') return 'risk';
  return 'neutral';
}

export function toneForRisk(value: string): StatusTone {
  if (value === 'high' || value === 'critical') return 'risk';
  if (value === 'medium') return 'warning';
  if (value === 'low') return 'success';
  return 'neutral';
}
