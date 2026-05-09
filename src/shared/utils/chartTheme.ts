export const darkChartBase = {
  backgroundColor: 'transparent',
  textStyle: {
    color: '#A8A29A',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    fontSize: 11,
  },
  color: ['#B88A44', '#6F8F72', '#D2A64A', '#C95A4A', '#A8A29A'],
  legend: {
    textStyle: { color: '#A8A29A' },
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
  },
  grid: {
    top: 24,
    bottom: 28,
    left: 44,
    right: 16,
    containLabel: true,
  },
  axisLine: { lineStyle: { color: 'rgba(184,138,68,0.15)' } },
  splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
  axisTick: { show: false },
  axisLabel: { color: '#A8A29A', fontSize: 11 },
};
