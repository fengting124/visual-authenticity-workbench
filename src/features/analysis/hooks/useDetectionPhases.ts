import { useCallback, useEffect, useState } from 'react';

export type PhaseId =
  | 'idle'
  | 'parsing'
  | 'evidence-reading'
  | 'scan-sweep'
  | 'semantic-chain'
  | 'expert-spatial'
  | 'expert-frequency'
  | 'expert-style'
  | 'expert-semantic'
  | 'fusion'
  | 'complete';

export interface PhaseConfig {
  id: PhaseId;
  label: string;
  durationMs: number;
  logLines: string[];
}

export const PHASE_CONFIGS: PhaseConfig[] = [
  {
    id: 'parsing',
    label: '解析图像输入',
    durationMs: 800,
    logLines: ['[INIT] 图像解码器就绪', '[INFO] 分辨率读取完成', '[INFO] 色彩空间转换: sRGB → Linear'],
  },
  {
    id: 'evidence-reading',
    label: '加载候选证据',
    durationMs: 600,
    logLines: ['[LOAD] 读取标注数据库', '[INFO] 发现候选证据 4 条', '[OK]   证据上下文绑定完成'],
  },
  {
    id: 'scan-sweep',
    label: '全图扫描',
    durationMs: 1800,
    logLines: [
      '[SCAN] 启动多尺度区域扫描',
      '[SCAN] 层级 1/3 完成: 低频异常检测',
      '[SCAN] 层级 2/3 完成: 纹理一致性核查',
      '[SCAN] 层级 3/3 完成: 边界语义分析',
      '[WARN] 检测到 3 个可疑区域',
    ],
  },
  {
    id: 'semantic-chain',
    label: '语义链推理',
    durationMs: 1200,
    logLines: [
      '[SEM]  全局语义锚点提取',
      '[SEM]  局部区域语义向量计算',
      '[SEM]  逻辑一致性比对: 发现矛盾节点',
      '[SEM]  解释路径生成完成',
    ],
  },
  {
    id: 'expert-spatial',
    label: '空间专家分析',
    durationMs: 700,
    logLines: ['[EXP1] 空间几何一致性检验', '[EXP1] 透视矩阵异常 @ 区域 R-02', '[EXP1] 风险分数: 82%'],
  },
  {
    id: 'expert-frequency',
    label: '频域专家分析',
    durationMs: 700,
    logLines: ['[EXP2] FFT 频谱分析启动', '[EXP2] 高频噪声分布异常', '[EXP2] 风险分数: 76%'],
  },
  {
    id: 'expert-style',
    label: '风格专家分析',
    durationMs: 700,
    logLines: ['[EXP3] 风格一致性神经核计算', '[EXP3] 局部材质特征偏移', '[EXP3] 风险分数: 68%'],
  },
  {
    id: 'expert-semantic',
    label: '语义专家分析',
    durationMs: 700,
    logLines: ['[EXP4] 跨区域语义关系图构建', '[EXP4] 发现逻辑断裂节点 2 处', '[EXP4] 风险分数: 89%'],
  },
  {
    id: 'fusion',
    label: '证据融合判断',
    durationMs: 1000,
    logLines: [
      '[GATE] 计算专用专家门控亲和度',
      '[GATE] Nano Banana Pro · 亲和度 0.82 → 激活',
      '[GATE] HunyuanImage 3.0 · 亲和度 0.64 → 激活',
      '[GATE] 其余靶向专家 · 亲和度 < 0.5 → 休眠',
      '[FUSE] 贝叶斯证据融合启动',
      '[FUSE] 专家权重归一化完成',
      '[FUSE] 最终置信度计算中...',
      '[DONE] 判断完成: 综合风险: 高风险',
    ],
  },
  {
    id: 'complete',
    label: '完成',
    durationMs: 0,
    logLines: [],
  },
];

export function useDetectionPhases() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [visibleLogLines, setVisibleLogLines] = useState<string[]>([]);

  const activePhase: PhaseId = currentPhaseIndex < 0 ? 'idle' : (PHASE_CONFIGS[currentPhaseIndex]?.id ?? 'complete');

  const startDetection = useCallback(() => {
    setCurrentPhaseIndex(0);
    setIsRunning(true);
    setVisibleLogLines([]);
  }, []);

  const resetDetection = useCallback(() => {
    setCurrentPhaseIndex(-1);
    setIsRunning(false);
    setVisibleLogLines([]);
  }, []);

  useEffect(() => {
    if (!isRunning || currentPhaseIndex < 0) return undefined;
    const config = PHASE_CONFIGS[currentPhaseIndex];
    if (!config || config.id === 'complete') {
      setIsRunning(false);
      return undefined;
    }

    const lineInterval = config.durationMs / (config.logLines.length + 1);
    const lineTimers = config.logLines.map((line, index) =>
      window.setTimeout(() => setVisibleLogLines((previous) => [...previous, line]), lineInterval * (index + 1)),
    );

    const phaseTimer = window.setTimeout(() => {
      setCurrentPhaseIndex((previous) => previous + 1);
    }, config.durationMs);

    return () => {
      lineTimers.forEach(window.clearTimeout);
      window.clearTimeout(phaseTimer);
    };
  }, [currentPhaseIndex, isRunning]);

  const isPhaseComplete = useCallback(
    (phaseId: PhaseId) => {
      const phaseIndex = PHASE_CONFIGS.findIndex((phase) => phase.id === phaseId);
      return currentPhaseIndex > phaseIndex;
    },
    [currentPhaseIndex],
  );

  const isPhaseActive = useCallback(
    (phaseId: PhaseId) => PHASE_CONFIGS[currentPhaseIndex]?.id === phaseId,
    [currentPhaseIndex],
  );

  return {
    activePhase,
    isRunning,
    isComplete: activePhase === 'complete',
    visibleLogLines,
    startDetection,
    resetDetection,
    isPhaseComplete,
    isPhaseActive,
    progress: currentPhaseIndex < 0 ? 0 : Math.round((currentPhaseIndex / (PHASE_CONFIGS.length - 1)) * 100),
  };
}
