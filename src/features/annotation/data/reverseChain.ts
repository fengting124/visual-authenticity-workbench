// VeriLoop 反向生成链路标注 · mock 数据

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
    name: 'kitchen_scene_real.jpg',
    resolution: '1024 × 1024',
    sourceType: 'authentic_capture',
  },

  stage01_semanticInversion: {
    blipDescription: 'A woman cooking vegetables in a wok in a modern kitchen',
    blipDescriptionZh: '一位女士在现代化厨房里用炒锅翻炒青菜',
    clipScene: {
      label: '厨房',
      confidence: 0.91,
      candidates: [
        { name: '厨房', score: 0.91, selected: true },
        { name: '餐厅', score: 0.42, selected: false },
        { name: '客厅', score: 0.18, selected: false },
        { name: '花园', score: 0.05, selected: false },
      ],
    },
    detectedEntities: [
      {
        id: 'E-01',
        name: '人物 · 女性',
        bbox: [38, 22, 24, 48],
        semanticDistance: 0.31,
        isCandidate: false,
      },
      {
        id: 'E-02',
        name: '炒锅',
        bbox: [42, 48, 18, 14],
        semanticDistance: 0.18,
        isCandidate: false,
      },
      {
        id: 'E-03',
        name: '青菜',
        bbox: [44, 52, 12, 8],
        semanticDistance: 0.22,
        isCandidate: true,
      },
      {
        id: 'E-04',
        name: '瓷盘',
        bbox: [12, 60, 16, 10],
        semanticDistance: 0.28,
        isCandidate: false,
      },
      { id: 'E-05', name: '刀', bbox: [22, 55, 8, 4], semanticDistance: 0.35, isCandidate: false },
      {
        id: 'E-06',
        name: '灶台',
        bbox: [40, 60, 25, 14],
        semanticDistance: 0.21,
        isCandidate: false,
      },
    ] as DetectedEntity[],
  },

  stage02_targetSelection: {
    selectedTarget: 'E-03',
    plan: {
      targetEntityId: 'E-03',
      originalName: '青菜',
      replacementName: '石头',
      valueLevel: 'high',
      valueReason: '场景外物体 · 产生强语义冲突 · 适合训练语义专家',
    } as TamperingPlan,
    valueRanking: [
      { replacement: '西兰花', level: 'low' as const, reason: '同类替换 · 训练价值低' },
      { replacement: '米饭', level: 'medium' as const, reason: '场景内异类 · 中等价值' },
      { replacement: '石头', level: 'high' as const, reason: '场景外物体 · 强语义冲突' },
    ],
  },

  stage03_tamperingExecution: {
    outputs: [
      {
        generator: 'Stable Diffusion 3.5',
        generatorVersion: 'SD3.5-medium · Inpainting',
        outputImageSrc: '/demo-assets/fake.jpg',
        qualityScore: 0.88,
        fingerprintSummary: '高频残留 · 边界融合典型',
        steps: 28,
        cfgScale: 7.5,
      },
      {
        generator: 'HunyuanImage 3.0',
        generatorVersion: 'Hunyuan-Img-3.0 · Inpainting',
        outputImageSrc: '/demo-assets/fake.jpg',
        qualityScore: 0.91,
        fingerprintSummary: '语义对齐强 · 风格残留中',
        steps: 30,
        cfgScale: 7.0,
      },
      {
        generator: 'Nano Banana Pro',
        generatorVersion: 'NB-Pro · Inpainting',
        outputImageSrc: '/demo-assets/fake.jpg',
        qualityScore: 0.94,
        fingerprintSummary: '极低伪影 · 现有专家可能失效',
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
      scene: '厨房',
      scene_confidence: 0.91,
      inferred_prompt: 'a woman cooking stones in a wok, kitchen scene, photorealistic',
      prompt_visual_alignment: 0.34,
    },
    L2_local: [
      {
        region_id: 'R-01',
        bbox: [44, 52, 12, 8],
        entity: '石头',
        anomaly_type: 'object_replacement',
        confidence: 1.0,
      },
    ],
    L3_semantic: {
      knowledge_graph_conflicts: [
        {
          triplet: ['翻炒', '作用于', '石头'],
          E_KG: 0.89,
          violation: 'ConceptNet 中无此关系 · 违背常识',
        },
        {
          triplet: ['石头', '位于', '炒锅'],
          E_KG: 0.78,
          violation: '场景对象异常组合',
        },
      ],
      llm_reasoning: {
        E_LLM: 0.93,
        explanation: '石头无法作为食材被翻炒,违背基本物理常识和烹饪逻辑',
      },
      P_final: 0.91,
    },
    L4_chain: {
      generator: 'Nano Banana Pro',
      lora: null,
      prompt: 'a stone in a wok, photorealistic, kitchen lighting',
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
      { detectorName: '语义常识专家', confidence: 0.89, verdict: 'easy_catch' as const },
      { detectorName: '提示词一致性专家', confidence: 0.66, verdict: 'uncertain' as const },
    ],
    difficultyTier: 'Challenge',
    bucket: '训练集 · Challenge 桶',
    triggerEvolution: true,
    evolutionMessage:
      '空域 / 频域 / 风格专家 Shapley 均 < 0.2 · 现有专家库对 Nano Banana Pro 识别能力不足 · 建议触发 LoRA r=8 专用专家训练',
  } as QualityAuditResult,
};
