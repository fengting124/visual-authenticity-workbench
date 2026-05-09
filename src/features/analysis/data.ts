import type { EvidenceItem, ExpertResult, SemanticStep } from './types';

export const semanticSteps: SemanticStep[] = [
  {
    id: 'global',
    name: '全局语义理解',
    status: 'complete',
    input: '原始样本、推断生成提示词、来源元数据',
    result: '室内工作台场景，包含反射表面与紧凑物体。',
    explanation: '场景整体结构连贯，后续重点检查局部材质行为。',
  },
  {
    id: 'local',
    name: '局部区域解析',
    status: 'complete',
    input: '自动标注输出的候选伪造区域 R-01 与 R-02',
    result: '反射线索与纹理线索集中在表面过渡区域。',
    explanation: '候选证据被结构化为区域级视觉线索，供专家组分析。',
  },
  {
    id: 'logic',
    name: '逻辑一致性核验',
    status: 'review',
    input: '空间关系、光照方向、时序连续性、候选证据',
    result: 'R-01 区域的反射方向与可见几何关系冲突。',
    explanation: '该不一致将自动标注层与语义物理推理连接起来。',
  },
  {
    id: 'explain',
    name: '解释结果输出',
    status: 'complete',
    input: '已核验的语义证据与专家信号',
    result: '样本被分配为中高真实性风险，进入复核队列。',
    explanation: '解释链保留从候选证据到最终判断的完整路径。',
  },
];

export const expertResults: ExpertResult[] = [
  {
    id: 'spatial',
    name: '空间专家',
    focus: '伪造区域、物体几何、透视关系、边界一致性',
    score: 76,
    contribution: 32,
    evidence: 'R-01 区域的反射几何与物体对齐关系存在偏差。',
    status: '证据保留',
  },
  {
    id: 'frequency',
    name: '频域专家',
    focus: '频域异常、压缩痕迹、高频纹理规律',
    score: 63,
    contribution: 22,
    evidence: 'R-02 区域在材质边界附近出现局部纹理带状规律。',
    status: '辅助信号',
  },
  {
    id: 'style',
    name: '风格专家',
    focus: '纹理、光照、材质渲染、生成风格残留',
    score: 58,
    contribution: 18,
    evidence: '材质渲染整体稳定，但存在轻微光照与风格边界。',
    status: '低权重信号',
  },
  {
    id: 'semantic',
    name: '语义专家',
    focus: '场景逻辑、提示词对齐、物体关系、语义不一致',
    score: 71,
    contribution: 28,
    evidence: '提示词对齐关系基本成立，但局部物理线索降低可信度。',
    status: '证据保留',
  },
];

export const evidenceSummary: EvidenceItem[] = [
  { label: '发现层', value: '自动标注发现候选区域 R-01 与 R-02。' },
  { label: '分析层', value: '语义链与专家组基于同一批候选证据进行分析。' },
  { label: '融合结果', value: '空间证据与语义证据贡献最高。' },
  { label: '交付层', value: '结构化报告区分候选证据与分析证据。' },
];

export const riskDistribution = [
  { name: '低风险', value: 32 },
  { name: '中风险', value: 41 },
  { name: '高风险', value: 21 },
  { name: '关键风险', value: 6 },
];

export const liveAnalysisStages = [
  {
    name: '输入接收',
    input: '样本文件、样本来源、生成器信息、候选标注证据',
    output: '形成统一样本上下文 IMG-DFD-014',
    status: '已完成',
  },
  {
    name: '自动标注',
    input: '图像画布与样本元数据',
    output: '输出 R-01 反射不一致、R-02 纹理断裂',
    status: '已完成',
  },
  {
    name: '语义链分析',
    input: '候选区域、提示词、场景结构',
    output: '输出全局理解、局部解析、逻辑核验、解释结果',
    status: '运行中',
  },
  {
    name: '专家组检测',
    input: '候选区域与语义链中间结果',
    output: '输出空间、频域、风格、语义专家证据',
    status: '等待融合',
  },
  {
    name: '证据融合',
    input: '专家贡献值、风险分数、复核状态',
    output: '输出最终风险分数 72 与中高风险判断',
    status: '待生成报告',
  },
];
