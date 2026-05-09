import type { ReportSectionData } from './types';

export const reportSections: ReportSectionData[] = [
  {
    title: '1. 样本信息',
    rows: [
      { label: '样本编号', value: 'IMG-DEMO-FAKE' },
      { label: '来源', value: '生成' },
      { label: '生成器', value: '未知生成来源' },
      { label: '类别', value: '演示图像' },
    ],
  },
  {
    title: '2. 自动证据标注',
    rows: [
      { label: '候选区域 R-01', value: '反射不一致，置信度 82%。' },
      { label: '候选区域 R-02', value: '纹理断裂，置信度 74%。' },
      { label: '候选区域 R-03', value: '边界异常，置信度 68%。' },
    ],
  },
  {
    title: '3. 语义链理解',
    rows: [
      { label: '全局语义', value: '场景主体、空间结构和光照关系被归纳为统一语义上下文。' },
      { label: '局部解析', value: '反射、纹理和边界线索集中在局部过渡区域。' },
      { label: '逻辑一致性', value: '部分区域的反射方向与可见几何关系存在冲突。' },
      { label: '解释输出', value: '样本进入高风险复核队列。' },
    ],
  },
  {
    title: '4. 专家组检测',
    rows: [
      { label: '空间专家', value: '几何、透视和边界证据贡献最高。' },
      { label: '频域专家', value: '纹理突变和高频残留支撑候选证据。' },
      { label: '风格专家', value: '局部光照和材质边界存在弱异常。' },
      { label: '语义专家', value: '局部物理线索降低内容可信度。' },
    ],
  },
  {
    title: '5. 证据融合',
    rows: [
      { label: '融合方式', value: '融合自动标注、语义链和专家组证据贡献。' },
      { label: '最终风险分数', value: '82' },
    ],
  },
  {
    title: '6. 最终结论',
    rows: [{ label: '判断', value: '高风险，建议人工复核关键区域。' }],
  },
  {
    title: '7. 复核建议',
    rows: [{ label: '建议操作', value: '复核高风险区域，核验原始来源，比对内容凭证，补充同源样本。' }],
  },
];
