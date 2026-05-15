import type { EvidenceItem, ExpertMeterConfig, ExpertResult, SemanticStep } from './types';

export const semanticSteps: SemanticStep[] = [
  {
    id: 'global',
    name: '全局语义浓缩',
    method: 'CLIP 零样本场景分类',
    lockedUntilPhase: 'semantic-chain',
    status: 'complete',
    input: '原始图像 I',
    result: 'Q_global = 厨房 (置信度 0.87)',
    explanation: 'CLIP 将图像编码为视觉特征,与预定义场景提示词集 T = {厨房, 客厅, 森林, ...} 计算余弦相似度,选取最高分作为全局场景基准。',
    sceneCandidates: [
      { name: '厨房', score: 0.87, selected: true },
      { name: '餐厅', score: 0.42 },
      { name: '客厅', score: 0.18 },
      { name: '花园', score: 0.05 },
      { name: '森林', score: 0.02 },
    ],
  },
  {
    id: 'local',
    name: '全局-局部一致性校验',
    method: 'Grounding DINO 开放词汇检测',
    lockedUntilPhase: 'expert-spatial',
    status: 'complete',
    input: 'I + Q_global',
    result: '发现 5 个实体,2 个语义离群点',
    explanation: '通过开放词汇目标检测提取所有显著实体,计算每个实体与全局场景向量的语义距离,超过阈值 τ=0.65 的标记为语义离群候选点。',
    entities: [
      { name: '锅', distance: 0.18, outlier: false },
      { name: '青菜', distance: 0.22, outlier: false },
      { name: '人', distance: 0.31, outlier: false },
      { name: '塑料盆', distance: 0.78, outlier: true },
      { name: '石头', distance: 0.84, outlier: true },
    ],
  },
  {
    id: 'logic',
    name: '双分支逻辑校验',
    method: '知识图谱 + LLM 协同推理',
    lockedUntilPhase: 'expert-semantic',
    status: 'complete',
    input: '视觉三元组 ⟨h, r, t⟩',
    result: 'P_final = Sigmoid(α · E_KG + β · E_LLM) = 0.93',
    explanation: '一支将视觉三元组映射到 ConceptNet,计算 E_KG = ||h + r - t||²;另一支构建结构化提示词送入 LLM,输出逻辑违和度 E_LLM。可学习权重 α 和 β 加权融合。',
    triplets: [
      { h: '塑料盆', r: '位于上方', t: '火', kgEnergy: 0.81, llmScore: 0.92 },
      { h: '翻炒', r: '作用于', t: '石头', kgEnergy: 0.89, llmScore: 0.95 },
    ],
    alpha: 0.6,
    beta: 0.4,
    eKG: 0.85,
    eLLM: 0.93,
  },
];

export const genericExpertConfigs: ExpertMeterConfig[] = [
  { phaseId: 'expert-spatial', label: '空域专家', method: '多尺度 CNN', icon: 'SP', riskScore: 82, findings: ['几何畸变', '透视异常'], shapley: 0.28 },
  { phaseId: 'expert-frequency', label: '频域专家', method: 'FFT 频谱分析', icon: 'FQ', riskScore: 76, findings: ['高频残留', '频谱异常'], shapley: 0.19 },
  { phaseId: 'expert-style', label: '风格专家', method: '可学习风格矩阵', icon: 'ST', riskScore: 68, findings: ['材质偏移', '风格断裂'], shapley: 0.14 },
  { phaseId: 'expert-semantic', label: '语义专家', method: 'CLIP 语义对齐', icon: 'SM', riskScore: 89, findings: ['逻辑矛盾', '语义断裂'], shapley: 0.22 },
];

export const targetedExpertConfigs = [
  { id: 'nano-banana-pro', label: 'Nano Banana Pro', adapter: 'LoRA · r=8', activated: true, gateScore: 0.82, shapley: 0.11, year: 2025 },
  { id: 'hunyuan-image', label: 'HunyuanImage 3.0', adapter: 'LoRA · r=8', activated: true, gateScore: 0.64, shapley: 0.06, year: 2025 },
  { id: 'sd-35', label: 'Stable Diffusion 3.5', adapter: 'LoRA · r=4', activated: false, gateScore: 0.21, shapley: 0, year: 2025 },
  { id: 'gpt-image-15', label: 'GPT Image 1.5', adapter: 'LoRA · r=4', activated: false, gateScore: 0.18, shapley: 0, year: 2025 },
  { id: 'imagen3', label: 'Imagen 3', adapter: 'LoRA · r=4', activated: false, gateScore: 0.12, shapley: 0, year: 2024 },
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
