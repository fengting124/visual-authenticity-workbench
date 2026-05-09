import type { ReportSectionData } from './types';

export const reportSections: ReportSectionData[] = [
  {
    title: '1. 样本信息',
    rows: [
      { label: '样本编号', value: 'IMG-DFD-014' },
      { label: '来源', value: '生成' },
      { label: '生成器', value: '基准生成器 A' },
      { label: '类别', value: '室内场景' },
    ],
  },
  {
    title: '2. 自动证据标注',
    rows: [
      { label: '候选区域 R-01', value: '反射不一致，置信度 78。' },
      { label: '候选区域 R-02', value: '纹理断裂，置信度 64。' },
      { label: '提示词证据', value: '保留生成提示词或推断提示词，用于图像内容对齐检查。' },
    ],
  },
  {
    title: '3. 语义链理解',
    rows: [
      { label: '全局理解', value: '包含反射表面的室内工作台场景。' },
      { label: '局部解析', value: '候选区域集中在材质过渡位置。' },
      { label: '逻辑核验', value: '反射方向与可见几何关系冲突。' },
      { label: '解释输出', value: '候选证据支持中高复核优先级。' },
    ],
  },
  {
    title: '4. 专家组检测',
    rows: [
      { label: '空间专家', value: '几何不一致贡献最强。' },
      { label: '频域专家', value: '纹理带状规律支持标注结果。' },
      { label: '风格专家', value: '轻微渲染风格边界作为低权重信号保留。' },
      { label: '语义专家', value: '提示词对齐基本成立，局部物理线索降低可信度。' },
    ],
  },
  {
    title: '5. 证据融合',
    rows: [
      { label: '融合方式', value: '融合空间、频域、风格与语义信号的多证据贡献。' },
      { label: '最终风险分数', value: '72' },
    ],
  },
  {
    title: '6. 最终结论',
    rows: [{ label: '判断', value: '中高真实性风险，需要人工专家复核。' }],
  },
  {
    title: '7. 复核建议',
    rows: [{ label: '建议操作', value: '核验标记区域，并在最终提交前比对来源元数据。' }],
  },
];
