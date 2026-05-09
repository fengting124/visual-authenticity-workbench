import type { EvidenceItem, ExpertMeterConfig, ExpertResult, SemanticStep } from './types';

export const semanticSteps: SemanticStep[] = [
  {
    id: 'global',
    name: '全局语义理解',
    lockedUntilPhase: 'semantic-chain',
    status: 'complete',
    input: '原始图像、样本来源、推断生成提示词',
    result: '场景主体、空间结构和光照关系被归纳为统一语义上下文。',
    explanation: '全局阶段建立检测基线，后续区域证据会与该上下文进行一致性核验。',
  },
  {
    id: 'local',
    name: '局部区域解析',
    lockedUntilPhase: 'expert-spatial',
    status: 'complete',
    input: '自动标注输出的候选区域 R-01、R-02、R-03',
    result: '反射、纹理和边界线索集中在局部过渡区域。',
    explanation: '候选证据被转换为区域级视觉线索，供专家组按不同证据维度分析。',
  },
  {
    id: 'logic',
    name: '逻辑一致性',
    lockedUntilPhase: 'expert-semantic',
    status: 'review',
    input: '空间关系、光照方向、物体边界和候选证据',
    result: '部分区域的反射方向与可见几何关系存在冲突。',
    explanation: '该阶段把自动标注层发现的视觉线索接入语义和物理关系核验。',
  },
  {
    id: 'explain',
    name: '解释输出',
    lockedUntilPhase: 'complete',
    status: 'complete',
    input: '语义链结果、专家组分数、候选证据置信度',
    result: '样本进入高风险复核队列，建议生成结构化报告。',
    explanation: '解释链保留从候选证据到最终判断的可追踪路径。',
  },
];

export const expertMeterConfigs: ExpertMeterConfig[] = [
  { phaseId: 'expert-spatial', label: '空间专家', icon: 'SP', riskScore: 82, findings: ['透视异常', '几何畸变'] },
  { phaseId: 'expert-frequency', label: '频域专家', icon: 'FQ', riskScore: 76, findings: ['高频噪声', '频谱异常'] },
  { phaseId: 'expert-style', label: '风格专家', icon: 'ST', riskScore: 68, findings: ['材质偏移', '风格断裂'] },
  { phaseId: 'expert-semantic', label: '语义专家', icon: 'SM', riskScore: 89, findings: ['逻辑矛盾', '语义断裂'] },
];

export const fusionEvidenceChips = ['边界异常', '透视畸变', '纹理断裂', '语义矛盾'];

export const expertResults: ExpertResult[] = [
  {
    id: 'spatial',
    name: '空间专家',
    focus: '几何、透视、边界',
    score: 76,
    contribution: 32,
    evidence: '候选区域的反射几何与主体边界对齐关系存在偏差。',
    keyFindings: ['反射偏移', '边界错位', '透视冲突'],
    status: '证据保留',
  },
  {
    id: 'frequency',
    name: '频域专家',
    focus: '纹理、压缩、高频异常',
    score: 63,
    contribution: 22,
    evidence: '局部材质边界附近出现纹理密度突变和高频残留。',
    keyFindings: ['纹理突变', '高频残留', '压缩不连续'],
    status: '辅助信号',
  },
  {
    id: 'style',
    name: '风格专家',
    focus: '光照、材质、生成风格残留',
    score: 58,
    contribution: 18,
    evidence: '材质渲染整体稳定，局部光照过渡和风格边界存在弱异常。',
    keyFindings: ['光照漂移', '材质断层', '风格残留'],
    status: '低权重信号',
  },
  {
    id: 'semantic',
    name: '语义专家',
    focus: '场景逻辑、提示词对齐、物体关系',
    score: 71,
    contribution: 28,
    evidence: '推断提示词与场景基本对齐，局部物理线索降低可信度。',
    keyFindings: ['物理冲突', '语义弱偏差', '关系不稳'],
    status: '证据保留',
  },
];

export const evidenceSummary: EvidenceItem[] = [
  { label: '发现层', value: '自动标注发现候选区域 R-01、R-02、R-03。' },
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
    output: '形成统一样本上下文 IMG-DEMO-FAKE',
    status: '已完成',
  },
  {
    name: '自动标注读取',
    input: '图像画布与区域候选证据',
    output: '读取 R-01 反射不一致、R-02 纹理断裂、R-03 边界异常',
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
    output: '输出最终风险分数和复核建议',
    status: '待生成报告',
  },
];
