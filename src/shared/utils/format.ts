import type { StatusTone } from '../types/common';

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatScore(value: number) {
  return value.toFixed(2);
}

export function statusLabel(value: string) {
  const labels: Record<string, string> = {
    pending: '待处理',
    running: '运行中',
    review: '待复核',
    complete: '已完成',
  };
  return labels[value] ?? value;
}

export function riskLabel(value: string) {
  const labels: Record<string, string> = {
    low: '低风险',
    medium: '中风险',
    high: '高风险',
    critical: '关键风险',
  };
  return labels[value] ?? value;
}

export function toneForStatus(value: string): StatusTone {
  if (value === 'complete') return 'success';
  if (value === 'review' || value === 'running') return 'warning';
  return 'neutral';
}

export function toneForRisk(value: string): StatusTone {
  if (value === 'high' || value === 'critical') return 'risk';
  if (value === 'medium') return 'warning';
  if (value === 'low') return 'success';
  return 'neutral';
}
