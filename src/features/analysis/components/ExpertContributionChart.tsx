import ReactECharts from 'echarts-for-react';
import type { ExpertResult } from '../types';

type ExpertContributionChartProps = {
  experts: ExpertResult[];
};

export function ExpertContributionChart({ experts }: ExpertContributionChartProps) {
  const option = {
    backgroundColor: 'transparent',
    color: ['#B88A44'],
    xAxis: { type: 'category', data: experts.map((expert) => expert.name), axisLabel: { color: '#A8A29A', rotate: 25 } },
    yAxis: { type: 'value', axisLabel: { color: '#A8A29A' }, splitLine: { lineStyle: { color: '#2D3338' } } },
    series: [{ type: 'bar', data: experts.map((expert) => expert.contribution), barWidth: 22 }],
    grid: { left: 32, right: 12, top: 20, bottom: 70 },
  };

  return <ReactECharts option={option} style={{ height: 240 }} />;
}
