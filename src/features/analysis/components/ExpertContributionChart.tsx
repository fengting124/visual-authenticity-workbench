import ReactECharts from 'echarts-for-react';
import type { ExpertResult } from '../types';
import { darkChartBase } from '../../../shared/utils/chartTheme';

type ExpertContributionChartProps = {
  experts: ExpertResult[];
};

export function ExpertContributionChart({ experts }: ExpertContributionChartProps) {
  const option = {
    ...darkChartBase,
    xAxis: { type: 'category', data: experts.map((expert) => expert.name), axisLabel: { color: '#A8A29A', rotate: 25 } },
    yAxis: { type: 'value', axisLabel: { color: '#A8A29A' }, splitLine: { lineStyle: { color: '#2D3338' } } },
    series: [{ type: 'bar', data: experts.map((expert) => expert.contribution), barWidth: 22 }],
    grid: { ...darkChartBase.grid, left: 32, right: 12, bottom: 70 },
  };

  return <ReactECharts option={option} style={{ height: 240 }} />;
}
