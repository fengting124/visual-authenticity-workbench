// VeriLoop 反向生成链路标注 · mock 数据
// 演示场景:电商运动鞋商品图被篡改为"破损版"
// 对应 PDF 案例:电商买家生成虚假商品破损图申请仅退款

export type DetectedEntity = {
  id: string;
  name: string;
  bbox: [number, number, number, number];
  semanticDistance: number;
  isCandidate: boolean;
};

export type TamperingPlan = {
  targetEntityId: string;
  originalName: string;
  replacementName: string;
  valueLevel: 'low' | 'medium' | 'high';
  valueReason: string;
};

export type GeneratorOutput = {
  generator: string;
  generatorVersion: string;
  outputImageSrc: string;
  qualityScore: number;
  fingerprintSummary: string;
  steps: number;
  cfgScale: number;
};

export type FourLayerLabel = {
  evidence_id: string;
  media_type: 'image';
  L1_global: {
    scene: string;
    scene_confidence: number;
    inferred_prompt: string;
    prompt_visual_alignment: number;
  };
  L2_local: Array<{
    region_id: string;
    bbox: [number, number, number, number];
    entity: string;
    anomaly_type: string;
    confidence: number;
  }>;
  L3_semantic: {
    knowledge_graph_conflicts: Array<{
      triplet: [string, string, string];
      E_KG: number;
      violation: string;
    }>;
    llm_reasoning: {
      E_LLM: number;
      explanation: string;
    };
    P_final: number;
  };
  L4_chain: {
    generator: string;
    lora: string | null;
    prompt: string;
    sampling_steps: number;
    cfg_scale: number;
    difficulty_tier: 'Easy' | 'Hard' | 'Challenge';
    expert_blind_alert: boolean;
  };
};

export type QualityAuditResult = {
  detectorEvaluations: Array<{
    detectorName: string;
    confidence: number;
    verdict: 'easy_catch' | 'uncertain' | 'missed';
  }>;
  difficultyTier: 'Easy' | 'Hard' | 'Challenge';
  bucket: string;
  triggerEvolution: boolean;
  evolutionMessage: string | null;
};

export const demoReverseChain = {
  sourceImage: {
    src: '/demo-assets/real.jpg',
    name: 'product_sneaker_authentic.jpg',
    resolution: '1024 × 1024',
    sourceType: 'authentic_capture',
  },
  tamperedImage: {
    src: '/demo-assets/fake.jpg',
  },

  stage01_semanticInversion: {
    blipDescription: 'A pair of white sneakers on a clean studio background, product photography',
    blipDescriptionZh: '白色运动鞋,工作室纯色背景,商品摄影',
    clipScene: {
      label: '电商商品图 · 鞋类',
      confidence: 0.93,
      candidates: [
        { name: '电商商品图 · 鞋类', score: 0.93, selected: true },
        { name: '运动场景', score: 0.31, selected: false },
        { name: '街拍', score: 0.18, selected: false },
        { name: '室内场景', score: 0.09, selected: false },
      ],
    },
    detectedEntities: [
      {
        id: 'E-01',
        name: '运动鞋 · 左',
        bbox: [12, 35, 35, 40],
        semanticDistance: 0.15,
        isCandidate: false,
      },
      {
        id: 'E-02',
        name: '运动鞋 · 右',
        bbox: [52, 32, 38, 42],
        semanticDistance: 0.16,
        isCandidate: false,
      },
      {
        id: 'E-03',
        name: '鞋面 · 右侧',
        bbox: [58, 38, 28, 22],
        semanticDistance: 0.22,
        isCandidate: true,
      },
      {
        id: 'E-04',
        name: '鞋带',
        bbox: [18, 42, 22, 18],
        semanticDistance: 0.18,
        isCandidate: false,
      },
      {
        id: 'E-05',
        name: '背景 · 纯色',
        bbox: [0, 0, 100, 25],
        semanticDistance: 0.12,
        isCandidate: false,
      },
      {
        id: 'E-06',
        name: '阴影 · 地面',
        bbox: [10, 72, 80, 18],
        semanticDistance: 0.2,
        isCandidate: false,
      },
    ] as DetectedEntity[],
  },

  stage02_targetSelection: {
    selectedTarget: 'E-03',
    plan: {
      targetEntityId: 'E-03',
      originalName: '完好鞋面',
      replacementName: '破损鞋面 + 裂痕',
      valueLevel: 'high',
      valueReason: '电商高价值篡改类型 · 对应仅退款欺诈场景 · 训练空域/边界专家',
    } as TamperingPlan,
    valueRanking: [
      { replacement: '轻微污渍', level: 'low' as const, reason: '同区域低强度修改 · 训练价值低' },
      { replacement: '颜色褪色', level: 'medium' as const, reason: '材质局部异常 · 中等价值' },
      {
        replacement: '破损鞋面 + 裂痕',
        level: 'high' as const,
        reason: '电商欺诈核心样态 · 边界生成痕迹明显',
      },
    ],
  },

  stage03_tamperingExecution: {
    outputs: [
      {
        generator: 'Stable Diffusion 3.5',
        generatorVersion: 'SD3.5-medium · Inpainting',
        outputImageSrc: '/demo-assets/fake.jpg',
        qualityScore: 0.82,
        fingerprintSummary: '破损边缘高频残留明显 · 易被空域专家识破',
        steps: 28,
        cfgScale: 7.5,
      },
      {
        generator: 'HunyuanImage 3.0',
        generatorVersion: 'Hunyuan-Img-3.0 · Inpainting',
        outputImageSrc: '/demo-assets/fake.jpg',
        qualityScore: 0.89,
        fingerprintSummary: '语义对齐强 · 材质过渡稍硬',
        steps: 30,
        cfgScale: 7.0,
      },
      {
        generator: 'Nano Banana Pro',
        generatorVersion: 'NB-Pro · Inpainting',
        outputImageSrc: '/demo-assets/fake.jpg',
        qualityScore: 0.95,
        fingerprintSummary: '极低伪影 · 现有通用专家可能失效 · 进入靶向训练池',
        steps: 24,
        cfgScale: 6.5,
      },
    ] as GeneratorOutput[],
    primaryOutput: 'Nano Banana Pro',
  },

  stage04_labels: {
    evidence_id: 'EV-IMG-2026-0517-001',
    media_type: 'image',
    L1_global: {
      scene: '电商商品图 · 鞋类',
      scene_confidence: 0.93,
      inferred_prompt: 'a damaged sneaker with torn surface, product photography, photorealistic',
      prompt_visual_alignment: 0.41,
    },
    L2_local: [
      {
        region_id: 'R-01',
        bbox: [58, 38, 28, 22],
        entity: '破损鞋面',
        anomaly_type: 'inpainting_boundary',
        confidence: 1.0,
      },
    ],
    L3_semantic: {
      knowledge_graph_conflicts: [
        {
          triplet: ['破损边缘', '融合于', '未磨损区域'],
          E_KG: 0.78,
          violation: '物理不连续 · 边界过渡违背常识',
        },
        {
          triplet: ['新鞋', '存在', '深度破损'],
          E_KG: 0.65,
          violation: '商品状态语义冲突',
        },
      ],
      llm_reasoning: {
        E_LLM: 0.87,
        explanation:
          '破损形态符合 inpainting 典型痕迹:边缘锐化突变、纹理与周边材质不连续、缺少磨损过渡',
      },
      P_final: 0.91,
    },
    L4_chain: {
      generator: 'Nano Banana Pro',
      lora: null,
      prompt: 'torn shoe surface, photorealistic damage, e-commerce background',
      sampling_steps: 24,
      cfg_scale: 6.5,
      difficulty_tier: 'Challenge',
      expert_blind_alert: true,
    },
  } as FourLayerLabel,

  stage05_qualityAudit: {
    detectorEvaluations: [
      { detectorName: '空域伪影专家', confidence: 0.18, verdict: 'missed' as const },
      { detectorName: '频域异常专家', confidence: 0.22, verdict: 'missed' as const },
      { detectorName: '风格残留专家', confidence: 0.15, verdict: 'missed' as const },
      { detectorName: '语义常识专家', confidence: 0.87, verdict: 'easy_catch' as const },
      { detectorName: '提示词一致性专家', confidence: 0.66, verdict: 'uncertain' as const },
    ],
    difficultyTier: 'Challenge',
    bucket: '训练集 · Challenge 桶',
    triggerEvolution: true,
    evolutionMessage:
      '空域 / 频域 / 风格专家 Shapley 均 < 0.2 · 现有专家库对 Nano Banana Pro 破损样本识别能力不足 · 已触发 LoRA r=8 专用专家训练',
  } as QualityAuditResult,
};
