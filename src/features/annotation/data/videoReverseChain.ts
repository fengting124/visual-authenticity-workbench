// VeriLoop 视频反向生成链路标注 · mock 数据
// 演示场景:政商发言短视频被篡改为"反义陈述"
// 对应 PDF1 第二章造假流程:ASR -> DeepSeek 改写 -> TTS -> MoviePy 替换

export type ASRSegment = {
  id: string;
  startTime: number;
  endTime: number;
  originalText: string;
  isCandidate: boolean;
};

export type RewritePlan = {
  targetSegmentId: string;
  originalText: string;
  rewrittenText: string;
  rewriteType: 'antonym' | 'fact_swap' | 'tone_flip';
  valueLevel: 'low' | 'medium' | 'high';
  valueReason: string;
};

export type SynthesisOutput = {
  pipelineName: string;
  pipelineVersion: string;
  ttsModel: string;
  lipSyncModel: string;
  durationSec: number;
  qualityScore: number;
  fingerprintSummary: string;
};

export type FourLevelVideoLabel = {
  evidence_id: string;
  media_type: 'video';
  video_level: {
    scene: string;
    speaker_identity: string;
    inferred_topic: string;
    is_tampered: boolean;
    overall_confidence: number;
  };
  segment_level: Array<{
    segment_id: string;
    time_range: [number, number];
    region_bbox?: [number, number, number, number];
    anomaly_types: string[];
    confidence: number;
  }>;
  content_level: {
    original_text: string;
    rewritten_text: string;
    rewrite_type: string;
    semantic_distance: number;
  };
  process_level: {
    asr_model: string;
    rewrite_llm: string;
    tts_model: string;
    lip_sync_model: string;
    splice_tool: string;
    difficulty_tier: 'Easy' | 'Hard' | 'Challenge';
    expert_blind_alert: boolean;
  };
};

export type VideoQualityAuditResult = {
  detectorEvaluations: Array<{
    detectorName: string;
    confidence: number;
    verdict: 'easy_catch' | 'uncertain' | 'missed';
  }>;
  bmnPrediction: {
    predictedStart: number;
    predictedEnd: number;
    actualStart: number;
    actualEnd: number;
    iou: number;
  };
  difficultyTier: 'Easy' | 'Hard' | 'Challenge';
  bucket: string;
  triggerEvolution: boolean;
  evolutionMessage: string | null;
};

export const demoVideoReverseChain = {
  sourceVideo: {
    src: '/demo-assets/demo-video.mp4',
    name: 'public_statement_authentic.mp4',
    duration: 8.0,
    resolution: '1280 x 720',
    frameRate: 25,
    sourceType: 'authentic_capture',
  },

  tamperedVideo: {
    src: '/demo-assets/demo-video.mp4',
  },

  stage01_parsing: {
    asrModel: 'Whisper Large-V3',
    asrLatency: '1.2s',
    keyframeSampling: '25fps · 抽样间隔 0.5s',
    detectedSegments: [
      {
        id: 'SEG-01',
        startTime: 0.0,
        endTime: 1.0,
        originalText: '各位听众朋友们大家好',
        isCandidate: false,
      },
      {
        id: 'SEG-02',
        startTime: 1.0,
        endTime: 3.0,
        originalText: '今天我们要谈的是市场前景',
        isCandidate: false,
      },
      {
        id: 'SEG-03',
        startTime: 3.0,
        endTime: 6.0,
        originalText: '我们坚定支持开放合作,反对单边主义',
        isCandidate: true,
      },
      {
        id: 'SEG-04',
        startTime: 6.0,
        endTime: 8.0,
        originalText: '谢谢大家',
        isCandidate: false,
      },
    ] as ASRSegment[],
  },

  stage02_textRewriting: {
    rewriteLLM: 'DeepSeek-V3',
    selectedSegment: 'SEG-03',
    plan: {
      targetSegmentId: 'SEG-03',
      originalText: '我们坚定支持开放合作,反对单边主义',
      rewrittenText: '我们坚决反对开放合作,支持单边主义',
      rewriteType: 'antonym',
      valueLevel: 'high',
      valueReason: '政商发言反义篡改 · 高传播风险 · 训练语义/口型双专家',
    } as RewritePlan,
    valueRanking: [
      { type: '语气微调', level: 'low' as const, reason: '语义近似 · 训练价值低' },
      { type: '事实数字替换', level: 'medium' as const, reason: '局部信息改动 · 中等价值' },
      { type: '反义改写', level: 'high' as const, reason: '语义完全反转 · 高欺骗性' },
    ],
  },

  stage03_synthesis: {
    pipeline: {
      pipelineName: 'TTS + LipSync + Splice',
      pipelineVersion: 'v1.0',
      ttsModel: 'TTSGenerator (zero-shot voice clone)',
      lipSyncModel: 'Sonic-LipSync · 25fps',
      durationSec: 3.0,
      qualityScore: 0.91,
      fingerprintSummary: '音频边界 1-3s/6-7s · 口型微对齐误差 < 40ms · 帧间平滑',
    } as SynthesisOutput,
    spliceTool: 'MoviePy + RIFE-NCNN(过渡帧插值)',
    audioBoundaries: [
      { startTime: 2.95, endTime: 3.05, type: '音频淡入边界' },
      { startTime: 5.95, endTime: 6.05, type: '音频淡出边界' },
    ],
    tamperedSegment: {
      timeRange: [3.0, 6.0] as [number, number],
      regionBbox: [42, 55, 16, 14] as [number, number, number, number],
    },
  },

  stage04_labels: {
    evidence_id: 'EV-VID-2026-0517-001',
    media_type: 'video',

    video_level: {
      scene: '会议室 · 正面发言',
      speaker_identity: '人物 · 中年男性',
      inferred_topic: '政商公开发言',
      is_tampered: true,
      overall_confidence: 0.93,
    },

    segment_level: [
      {
        segment_id: 'R-VID-01',
        time_range: [3.0, 6.0],
        region_bbox: [42, 55, 16, 14],
        anomaly_types: ['lip_sync_mismatch', 'audio_splice_boundary'],
        confidence: 1.0,
      },
    ],

    content_level: {
      original_text: '我们坚定支持开放合作,反对单边主义',
      rewritten_text: '我们坚决反对开放合作,支持单边主义',
      rewrite_type: 'antonym',
      semantic_distance: 0.92,
    },

    process_level: {
      asr_model: 'Whisper Large-V3',
      rewrite_llm: 'DeepSeek-V3',
      tts_model: 'TTSGenerator (zero-shot)',
      lip_sync_model: 'Sonic-LipSync',
      splice_tool: 'MoviePy + RIFE-NCNN',
      difficulty_tier: 'Challenge',
      expert_blind_alert: true,
    },
  } as FourLevelVideoLabel,

  stage05_qualityAudit: {
    detectorEvaluations: [
      {
        detectorName: '时序一致性专家 (Transformer)',
        confidence: 0.88,
        verdict: 'easy_catch' as const,
      },
      { detectorName: '身份/口型一致性专家', confidence: 0.41, verdict: 'uncertain' as const },
      { detectorName: '空域伪影专家', confidence: 0.16, verdict: 'missed' as const },
      { detectorName: '频域异常专家 (音频边界)', confidence: 0.19, verdict: 'missed' as const },
      { detectorName: '语义常识专家 (KG+LLM)', confidence: 0.84, verdict: 'easy_catch' as const },
    ],
    bmnPrediction: {
      predictedStart: 2.8,
      predictedEnd: 6.2,
      actualStart: 3.0,
      actualEnd: 6.0,
      iou: 0.86,
    },
    difficultyTier: 'Challenge',
    bucket: '训练集 · Challenge 桶 · 视频侧',
    triggerEvolution: true,
    evolutionMessage:
      '空域/频域专家 Shapley 均 < 0.2 · 现有专家库对 Sonic-LipSync 系列伪造识别能力不足 · 建议触发 LoRA r=8 视频专家训练',
  } as VideoQualityAuditResult,
};
