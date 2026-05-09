# Claude Code Context: visual-authenticity-workbench

This file exists because some tools can read GitHub root-level blob pages but cannot traverse /tree or /raw URLs. It packs the key source files into one root-level Markdown document.

## Product Positioning

visual-authenticity-workbench is a frontend-only forensic-style workbench for visual generated-content evidence analysis.

Core workflow:

Sample Import -> Data Annotation -> Explainable Detection -> Evidence Fusion -> Structured Report

There is no backend, no real AI inference, and no live detection API. Annotation outputs, detection phases, risk scores, and report content are mock data plus deterministic frontend simulation.

## Tech Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Framer Motion 11
- echarts-for-react / ECharts
- @xyflow/react
- lucide-react
- pnpm

## Visual System

Tailwind custom palette:

- graphite-950: #111315
- graphite-900: #1A1D20
- graphite-850: #202428
- graphite-800: #2D3338
- forensic.gold: #B88A44
- forensic.olive: #6F8F72
- forensic.stone: #A8A29A
- forensic.risk: #C95A4A
- forensic.warning: #D2A64A
- forensic.text: #F3F0EA

## Routes

- / overview
- /samples sample library
- /annotation annotation center
- /annotation/image image annotation
- /annotation/video video annotation
- /analysis analysis center
- /analysis/sample detection workbench
- /report structured report

## File Index

- README.md
- package.json
- tailwind.config.ts
- src/app/App.tsx
- src/app/router.tsx
- src/layouts/AppLayout.tsx
- src/layouts/Sidebar.tsx
- src/layouts/TopBar.tsx
- src/features/analysis/types.ts
- src/features/analysis/data.ts
- src/features/analysis/hooks/useDetectionPhases.ts
- src/pages/SampleAnalysisPage.tsx
- src/features/analysis/components/ImageScanCanvas.tsx
- src/features/analysis/components/DetectionLogStream.tsx
- src/features/analysis/components/ExpertMeterPanel.tsx
- src/features/analysis/components/FusionVerdictPanel.tsx
- src/features/analysis/components/SemanticChainPanel.tsx
- src/features/analysis/components/SemanticStepCard.tsx
- src/features/analysis/components/ExpertContributionChart.tsx
- src/features/analysis/components/CandidateEvidencePanel.tsx
- src/features/samples/types.ts
- src/features/samples/data.ts
- src/pages/OverviewPage.tsx
- src/pages/SampleLibraryPage.tsx
- src/pages/AnnotationCenterPage.tsx
- src/pages/ImageAnnotationPage.tsx
- src/pages/VideoAnnotationPage.tsx
- src/pages/AnalysisCenterPage.tsx
- src/pages/ReportPage.tsx
- src/features/report/data.ts
- src/features/report/components/ReportPreview.tsx
- src/shared/utils/format.ts
- src/shared/utils/localSample.ts
- src/shared/utils/chartTheme.ts
- src/styles/globals.css

## README.md

```md
# visual-authenticity-workbench

This project provides a frontend-only prototype for a visual generative content authenticity analysis platform. It demonstrates dataset annotation, semantic-chain content understanding, expert-group detection, and structured evidence reporting for future integration with real model inference and backend services.

## Scope

Frontend-only prototype with mock data and local placeholder assets.

## Tech Stack

Vite, React, TypeScript, Tailwind CSS, React Router, Framer Motion, ECharts, ReactFlow, lucide-react, pnpm.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm preview
```
```

## package.json

```json
{
  "name": "visual-authenticity-workbench",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "packageManager": "pnpm@9.15.4",
  "engines": {
    "node": ">=20 <21"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@xyflow/react": "^12.4.4",
    "echarts": "^5.6.0",
    "echarts-for-react": "^3.0.2",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@vitejs/plugin-react": "^4.3.4",
    "@types/node": "^22.10.2",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.17.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "postcss": "^8.4.49",
    "prettier": "^3.4.2",
    "tailwindcss": "^3.4.17",
    "typescript": "~5.6.3",
    "typescript-eslint": "^8.18.2",
    "vite": "^6.0.5"
  }
}
```

## tailwind.config.ts

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#111315',
          900: '#1A1D20',
          850: '#202428',
          800: '#2D3338',
        },
        forensic: {
          gold: '#B88A44',
          olive: '#6F8F72',
          stone: '#A8A29A',
          risk: '#C95A4A',
          warning: '#D2A64A',
          text: '#F3F0EA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        workstation: '0 18px 50px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

## src/app/App.tsx

```tsx
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';

export function App() {
  const location = useLocation();

  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="h-full"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  );
}
```

## src/app/router.tsx

```tsx
import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AnalysisCenterPage } from '../pages/AnalysisCenterPage';
import { AnnotationCenterPage } from '../pages/AnnotationCenterPage';
import { ImageAnnotationPage } from '../pages/ImageAnnotationPage';
import { OverviewPage } from '../pages/OverviewPage';
import { ReportPage } from '../pages/ReportPage';
import { SampleAnalysisPage } from '../pages/SampleAnalysisPage';
import { SampleLibraryPage } from '../pages/SampleLibraryPage';
import { VideoAnnotationPage } from '../pages/VideoAnnotationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'samples', element: <SampleLibraryPage /> },
      { path: 'annotation', element: <AnnotationCenterPage /> },
      { path: 'annotation/image', element: <ImageAnnotationPage /> },
      { path: 'annotation/video', element: <VideoAnnotationPage /> },
      { path: 'analysis', element: <AnalysisCenterPage /> },
      { path: 'analysis/sample', element: <SampleAnalysisPage /> },
      { path: 'report', element: <ReportPage /> },
    ],
  },
]);
```

## src/layouts/AppLayout.tsx

```tsx
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-graphite-950 text-forensic-text">
      <Sidebar />
      <div className="ml-[220px] flex min-h-screen flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-8 py-7">{children}</main>
      </div>
    </div>
  );
}
```

## src/layouts/Sidebar.tsx

```tsx
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Cpu,
  Database,
  FileText,
  FlaskConical,
  Image as ImageIcon,
  LayoutDashboard,
  Tag,
  Video,
} from 'lucide-react';
import { cn } from '../shared/utils/cn';
import { sampleMetrics } from '../features/samples/data';

type NavigationItem =
  | { divider: true; id: string }
  | { icon: typeof LayoutDashboard; label: string; path: string; sub?: boolean };

const navItems: NavigationItem[] = [
  { icon: LayoutDashboard, label: '总览', path: '/' },
  { icon: Database, label: '样本库', path: '/samples' },
  { divider: true, id: 'sample-divider' },
  { icon: Tag, label: '标注中心', path: '/annotation' },
  { icon: ImageIcon, label: '图像标注', path: '/annotation/image', sub: true },
  { icon: Video, label: '视频标注', path: '/annotation/video', sub: true },
  { divider: true, id: 'annotation-divider' },
  { icon: Cpu, label: '检测中心', path: '/analysis' },
  { icon: FlaskConical, label: '检测工作台', path: '/analysis/sample', sub: true },
  { divider: true, id: 'analysis-divider' },
  { icon: FileText, label: '证据报告', path: '/report' },
];

const navVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[220px] flex-col border-r border-forensic-gold/[0.08] bg-graphite-900">
      <div className="border-b border-forensic-gold/[0.08] px-5 py-5">
        <p className="text-xs uppercase tracking-[0.22em] text-forensic-gold">Evidence</p>
        <h1 className="mt-2 text-lg font-semibold leading-tight text-forensic-text">视觉证据工作台</h1>
      </div>

      <motion.nav className="flex-1 space-y-1 p-3" variants={navVariants} initial="hidden" animate="visible">
          {navItems.map((item) => {
            if ('divider' in item) {
              return <div key={item.id} className="my-3 h-px bg-forensic-gold/10" />;
            }

            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div key={item.path} variants={itemVariants}>
                <Link
                  to={item.path}
                  className={cn(
                    'relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150',
                    item.sub ? 'ml-4 text-[13px]' : undefined,
                    isActive
                      ? 'bg-forensic-gold/[0.08] text-forensic-gold'
                      : 'text-forensic-stone hover:bg-forensic-gold/[0.06] hover:text-forensic-text',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-forensic-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
      </motion.nav>

      <div className="border-t border-forensic-gold/[0.08] p-4 text-sm">
        <p className="flex items-center gap-2 text-forensic-olive">
          <span className="h-2 w-2 rounded-full bg-forensic-olive" />
          系统就绪
        </p>
        <p className="mt-2 text-forensic-stone">
          <span className="font-semibold text-forensic-gold tabular-nums">{sampleMetrics.reviewRequired}</span> 待处理
        </p>
      </div>
    </aside>
  );
}
```

## src/layouts/TopBar.tsx

```tsx
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { activeSample, samples } from '../features/samples/data';

function LiveClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('zh-CN', { hour12: false }));

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(new Date().toLocaleTimeString('zh-CN', { hour12: false }));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="font-mono text-xs tabular-nums text-forensic-stone">{time}</span>;
}

export function TopBar() {
  const prefersReduced = useReducedMotion();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId');
  const currentSample = samples.find((sample) => sample.id === sampleId) ?? activeSample;

  return (
    <header
      className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-forensic-gold/[0.08] px-6"
      style={{
        background: 'rgba(17,19,21,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div>
        <p className="text-sm font-medium text-forensic-text">视觉真实性证据工作台</p>
        <p className="text-xs text-forensic-stone">证据发现 · 可解释检测 · 结构化报告</p>
      </div>
      <div className="flex items-center gap-4 text-xs text-forensic-stone">
        <span className="rounded border border-forensic-gold/35 bg-forensic-gold/10 px-2 py-1 text-forensic-gold">
          当前样本：{currentSample.id}
        </span>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-forensic-olive"
            animate={prefersReduced ? undefined : { opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <span className="text-xs text-forensic-stone">系统就绪</span>
        </div>
        <LiveClock />
      </div>
    </header>
  );
}
```

## src/features/analysis/types.ts

```ts
export type SemanticStep = {
  id: string;
  name: string;
  status: string;
  input: string;
  result: string;
  explanation: string;
  lockedUntilPhase?: string;
};

export type ExpertResult = {
  id: string;
  name: string;
  focus: string;
  score: number;
  contribution: number;
  evidence: string;
  keyFindings: string[];
  status: string;
};

export type EvidenceItem = {
  label: string;
  value: string;
};

export type ExpertMeterConfig = {
  phaseId: string;
  label: string;
  icon: string;
  riskScore: number;
  findings: string[];
};
```

## src/features/analysis/data.ts

```ts
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
```

## src/features/analysis/hooks/useDetectionPhases.ts

```ts
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
```

## src/pages/SampleAnalysisPage.tsx

```tsx
import { ChangeEvent, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InfoIcon } from 'lucide-react';
import { CandidateEvidencePanel } from '../features/analysis/components/CandidateEvidencePanel';
import { DetectionLogStream } from '../features/analysis/components/DetectionLogStream';
import { ExpertMeterPanel } from '../features/analysis/components/ExpertMeterPanel';
import { FusionVerdictPanel } from '../features/analysis/components/FusionVerdictPanel';
import { ImageScanCanvas, type ScanRegion } from '../features/analysis/components/ImageScanCanvas';
import { SemanticChainPanel } from '../features/analysis/components/SemanticChainPanel';
import { semanticSteps } from '../features/analysis/data';
import { PHASE_CONFIGS, type PhaseId, useDetectionPhases } from '../features/analysis/hooks/useDetectionPhases';
import { activeSample, samples } from '../features/samples/data';
import type { FakeRegion } from '../features/samples/types';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { loadAnnotationFromSession, readFileAsDataUrl, readLocalAsset, saveLocalAsset } from '../shared/utils/localSample';

function isFakeRegionList(value: unknown[] | null): value is FakeRegion[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'object' && item !== null && 'id' in item && 'clue' in item);
}

function phaseStepId(activePhase: PhaseId, selectedEvidence?: FakeRegion) {
  if (activePhase === 'semantic-chain') return 'global';
  if (activePhase === 'expert-spatial' || activePhase === 'expert-frequency' || activePhase === 'expert-style') return 'local';
  if (activePhase === 'expert-semantic' || activePhase === 'fusion') return 'logic';
  if (activePhase === 'complete') return 'explain';
  return selectedEvidence?.semanticStepId ?? 'global';
}

export function SampleAnalysisPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeSample.id;
  const selectedSample = samples.find((sample) => sample.id === sampleId && sample.type === 'image') ?? activeSample;
  const storedEvidence = loadAnnotationFromSession(selectedSample.id);
  const candidateEvidence = isFakeRegionList(storedEvidence) ? storedEvidence : selectedSample.regions;
  const analysisSample = { ...selectedSample, regions: candidateEvidence };

  const {
    activePhase,
    isRunning,
    isComplete,
    visibleLogLines,
    startDetection,
    resetDetection,
    isPhaseComplete,
    isPhaseActive,
    progress,
  } = useDetectionPhases();

  const [selectedEvidenceId, setSelectedEvidenceId] = useState(candidateEvidence[0]?.id ?? '');
  const [selectedExpert, setSelectedExpert] = useState<PhaseId | null>(null);
  const [localImage, setLocalImage] = useState(() => {
    const stored = readLocalAsset('image');
    return {
      dataUrl: stored.dataUrl ?? selectedSample.assetSrc ?? null,
      name: stored.name ?? 'fake.jpg',
    };
  });

  const selectedEvidence = useMemo(
    () => candidateEvidence.find((region) => region.id === selectedEvidenceId) ?? candidateEvidence[0],
    [candidateEvidence, selectedEvidenceId],
  );

  const scanRegions: ScanRegion[] = useMemo(
    () =>
      candidateEvidence.map((region) => ({
        id: region.id,
        x: region.x,
        y: region.y,
        width: region.width,
        height: region.height,
        type: region.type,
        riskScore: region.confidence,
      })),
    [candidateEvidence],
  );

  const activeStepId = phaseStepId(activePhase, selectedEvidence);
  const activePhaseLabel = PHASE_CONFIGS.find((phase) => phase.id === activePhase)?.label ?? '';
  const resolvedImageSrc = localImage.dataUrl ?? selectedSample.assetSrc ?? '/demo-assets/fake.jpg';

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (dataUrl) => {
      saveLocalAsset('image', dataUrl, file.name);
      setLocalImage({ dataUrl, name: file.name });
      resetDetection();
    });
  }

  function handleStart() {
    setSelectedExpert(null);
    startDetection();
  }

  function handleReset() {
    setSelectedExpert(null);
    resetDetection();
  }

  function handleGenerateReport() {
    navigate(`/report?sampleId=${selectedSample.id}`);
  }

  return (
    <PageShell eyebrow="检测工作台" title="图像证据可解释检测" description="">
      <div className="mb-4 rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-forensic-text">{selectedSample.id}</p>
            <p className="mt-1 text-xs text-forensic-stone">输入文件：{localImage.name}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer rounded-md border border-forensic-gold/[0.08] bg-graphite-800 px-3 py-2 text-xs text-forensic-stone transition hover:border-forensic-gold/30">
              导入图像
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
            <button
              type="button"
              onClick={handleStart}
              disabled={isRunning}
              className="rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-xs font-medium text-forensic-gold disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRunning ? '检测运行中' : '开始检测'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-md border border-forensic-gold/[0.08] bg-graphite-800 px-4 py-2 text-xs font-medium text-forensic-stone"
            >
              重置
            </button>
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-forensic-stone">
              {isRunning ? `正在执行：${activePhaseLabel}` : isComplete ? '检测完成' : '就绪'}
            </span>
            <span className="font-mono text-xs tabular-nums text-forensic-gold">{progress}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-graphite-800">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #B88A44, #D2A64A)',
                boxShadow: isRunning ? '0 0 8px rgba(184,138,68,0.5)' : 'none',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {isComplete && (
          <div className="mt-3 flex items-center gap-2 rounded border border-forensic-gold/10 bg-graphite-800/50 px-3 py-1.5 text-xs text-forensic-stone">
            <InfoIcon size={12} />
            演示模式 · 检测结果由预置证据驱动，不代表真实模型输出
          </div>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)_360px]">
        <SectionCard title="样本扫描" eyebrow="输入与候选证据">
          <div className="space-y-4">
            <ImageScanCanvas
              imageSrc={resolvedImageSrc}
              regions={scanRegions}
              activePhase={activePhase}
              selectedRegionId={selectedEvidenceId}
              riskScore={selectedSample.riskScore}
              onRegionClick={setSelectedEvidenceId}
            />
            <DetectionLogStream lines={visibleLogLines} isRunning={isRunning} />
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.14em] text-forensic-stone">候选证据</p>
              <CandidateEvidencePanel sample={analysisSample} selectedId={selectedEvidenceId} onSelect={setSelectedEvidenceId} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="语义链推理" eyebrow="逐步解锁">
          <SemanticChainPanel
            steps={semanticSteps}
            compact
            activePhase={activePhase}
            isPhaseComplete={isPhaseComplete}
            activeStepId={activeStepId}
            onSelectStep={() => undefined}
          />
        </SectionCard>

        <SectionCard title="专家组检测" eyebrow="多证据计量">
          <ExpertMeterPanel
            isPhaseComplete={isPhaseComplete}
            isPhaseActive={isPhaseActive}
            selectedExpert={selectedExpert}
            onExpertClick={setSelectedExpert}
          />
          <FusionVerdictPanel
            isVisible={isComplete}
            riskScore={selectedSample.riskScore}
            onGenerateReport={handleGenerateReport}
            onViewReport={handleGenerateReport}
          />
        </SectionCard>
      </div>
    </PageShell>
  );
}
```

## src/features/analysis/components/ImageScanCanvas.tsx

```tsx
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { PhaseId } from '../hooks/useDetectionPhases';

export interface ScanRegion {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  riskScore: number;
}

type ImageScanCanvasProps = {
  imageSrc: string;
  regions: ScanRegion[];
  activePhase: PhaseId;
  selectedRegionId: string | null;
  riskScore: number;
  onRegionClick: (id: string) => void;
};

function riskColorFor(score: number) {
  if (score >= 75) return '#C95A4A';
  if (score >= 50) return '#D2A64A';
  return '#6F8F72';
}

export function ImageScanCanvas({
  imageSrc,
  regions,
  activePhase,
  selectedRegionId,
  riskScore,
  onRegionClick,
}: ImageScanCanvasProps) {
  const prefersReduced = useReducedMotion();
  const isSweeping = activePhase === 'scan-sweep';
  const showRegions = ['expert-spatial', 'expert-frequency', 'expert-style', 'expert-semantic', 'fusion', 'complete'].includes(activePhase);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-forensic-gold/15 bg-graphite-900">
      <img
        src={imageSrc}
        alt="待检测样本"
        className="block h-auto w-full"
        style={{ filter: isSweeping ? 'brightness(0.85)' : 'brightness(1)', transition: 'filter 0.5s' }}
      />

      <AnimatePresence>
        {isSweeping && (
          <motion.div
            key="scan-line"
            className="pointer-events-none absolute left-0 right-0 z-20"
            style={{ height: '2px' }}
            initial={{ top: '0%' }}
            animate={prefersReduced ? undefined : { top: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
          >
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #B88A44, rgba(184,138,68,0.6), #B88A44, transparent)',
                boxShadow: '0 0 12px 4px rgba(184,138,68,0.4)',
              }}
            />
            <div
              className="absolute w-full"
              style={{
                height: '40px',
                top: '-40px',
                background: 'linear-gradient(to top, rgba(184,138,68,0.08), transparent)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isSweeping && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(184,138,68,0.03) 4px)',
          }}
        />
      )}

      <AnimatePresence>
        {showRegions &&
          regions.map((region, index) => {
            const isSelected = selectedRegionId === region.id;
            const riskColor = riskColorFor(region.riskScore);

            return (
              <motion.button
                type="button"
                key={region.id}
                className="absolute z-30 cursor-pointer"
                style={{
                  left: `${region.x}%`,
                  top: `${region.y}%`,
                  width: `${region.width}%`,
                  height: `${region.height}%`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.15, duration: 0.3 }}
                onClick={() => onRegionClick(region.id)}
              >
                <motion.div
                  className="absolute inset-0 rounded"
                  style={{
                    border: `1.5px solid ${riskColor}`,
                    backgroundColor: isSelected ? `${riskColor}22` : `${riskColor}0d`,
                  }}
                  animate={
                    !isSelected && !prefersReduced
                      ? {
                          borderColor: [`${riskColor}99`, `${riskColor}33`, `${riskColor}99`],
                        }
                      : undefined
                  }
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <div className="absolute left-0 top-0 h-2.5 w-2.5" style={{ borderTop: `2px solid ${riskColor}`, borderLeft: `2px solid ${riskColor}` }} />
                <div className="absolute right-0 top-0 h-2.5 w-2.5" style={{ borderTop: `2px solid ${riskColor}`, borderRight: `2px solid ${riskColor}` }} />
                <div className="absolute bottom-0 left-0 h-2.5 w-2.5" style={{ borderBottom: `2px solid ${riskColor}`, borderLeft: `2px solid ${riskColor}` }} />
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5" style={{ borderBottom: `2px solid ${riskColor}`, borderRight: `2px solid ${riskColor}` }} />

                <motion.div
                  className="absolute -top-5 left-0 flex items-center gap-1 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: 'rgba(17,19,21,0.9)',
                    color: riskColor,
                    border: `1px solid ${riskColor}40`,
                  }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: riskColor }} />
                  {region.type}
                </motion.div>
              </motion.button>
            );
          })}
      </AnimatePresence>

      <AnimatePresence>
        {activePhase === 'complete' && (
          <motion.div
            key="verdict-stamp"
            className="absolute right-3 top-3 z-40 flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{
              background: 'rgba(201,90,74,0.15)',
              border: '1.5px solid rgba(201,90,74,0.6)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-forensic-risk">高风险</span>
            <span className="text-sm font-bold tabular-nums text-forensic-risk">{riskScore}%</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

## src/features/analysis/components/DetectionLogStream.tsx

```tsx
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type DetectionLogStreamProps = {
  lines: string[];
  isRunning: boolean;
};

function lineColorClass(line: string) {
  if (line.startsWith('[WARN]') || line.startsWith('[ERR]')) return 'text-forensic-warning';
  if (line.startsWith('[DONE]') || line.startsWith('[OK]')) return 'text-forensic-olive';
  if (line.startsWith('[EXP') || line.startsWith('[FUSE]')) return 'text-forensic-gold';
  return 'text-forensic-stone';
}

export function DetectionLogStream({ lines, isRunning }: DetectionLogStreamProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div
      className="overflow-y-auto rounded-lg border border-forensic-gold/10 bg-graphite-950 p-3 font-mono text-[11px] leading-relaxed"
      style={{ height: '160px', scrollbarWidth: 'thin' }}
    >
      <div className="mb-2 flex items-center gap-2 border-b border-forensic-gold/10 pb-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-forensic-risk/70" />
          <span className="h-2 w-2 rounded-full bg-forensic-warning/70" />
          <span className="h-2 w-2 rounded-full bg-forensic-olive/70" />
        </div>
        <span className="text-forensic-stone/50">vaw-detect.log</span>
        {isRunning && (
          <motion.span
            className="ml-auto text-forensic-gold"
            animate={prefersReduced ? undefined : { opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          >
            ●
          </motion.span>
        )}
      </div>

      {lines.length === 0 && <span className="text-forensic-stone/30">等待检测启动...</span>}
      <AnimatePresence initial={false}>
        {lines.map((line, index) => (
          <motion.div
            key={`${line}-${index}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`${lineColorClass(line)} block`}
          >
            <span className="mr-2 select-none text-forensic-stone/30">{String(index + 1).padStart(2, '0')}</span>
            {line}
          </motion.div>
        ))}
      </AnimatePresence>

      {isRunning && (
        <motion.span
          className="inline-block text-forensic-gold"
          animate={prefersReduced ? undefined : { opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        >
          █
        </motion.span>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
```

## src/features/analysis/components/ExpertMeterPanel.tsx

```tsx
import { motion, useReducedMotion } from 'framer-motion';
import { expertMeterConfigs } from '../data';
import type { PhaseId } from '../hooks/useDetectionPhases';

type ExpertMeterPanelProps = {
  isPhaseComplete: (id: PhaseId) => boolean;
  isPhaseActive: (id: PhaseId) => boolean;
  onExpertClick: (phaseId: PhaseId) => void;
  selectedExpert: PhaseId | null;
};

function getRiskColor(score: number) {
  if (score >= 75) return { bar: '#C95A4A', glow: 'rgba(201,90,74,0.3)', text: 'text-forensic-risk' };
  if (score >= 50) return { bar: '#D2A64A', glow: 'rgba(210,166,74,0.3)', text: 'text-forensic-warning' };
  return { bar: '#6F8F72', glow: 'rgba(111,143,114,0.3)', text: 'text-forensic-olive' };
}

export function ExpertMeterPanel({
  isPhaseComplete,
  isPhaseActive,
  onExpertClick,
  selectedExpert,
}: ExpertMeterPanelProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="space-y-3">
      {expertMeterConfigs.map((expert) => {
        const phaseId = expert.phaseId as PhaseId;
        const isDone = isPhaseComplete(phaseId);
        const isActive = isPhaseActive(phaseId);
        const isPending = !isDone && !isActive;
        const colors = getRiskColor(expert.riskScore);
        const isSelected = selectedExpert === phaseId;

        return (
          <motion.button
            type="button"
            key={expert.phaseId}
            className={`w-full cursor-pointer rounded-lg border p-3 text-left transition-colors duration-200 ${
              isSelected
                ? 'border-forensic-gold/40 bg-forensic-gold/5'
                : 'border-forensic-gold/10 bg-graphite-850 hover:border-forensic-gold/20'
            }`}
            animate={
              isActive && !prefersReduced
                ? {
                    borderColor: ['rgba(184,138,68,0.15)', 'rgba(184,138,68,0.4)', 'rgba(184,138,68,0.15)'],
                  }
                : undefined
            }
            transition={{ duration: 1.2, repeat: Infinity }}
            onClick={() => isDone && onExpertClick(phaseId)}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative flex h-4 w-4 items-center justify-center">
                  {isDone && (
                    <motion.div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: colors.bar, boxShadow: `0 0 6px ${colors.glow}` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      className="h-2 w-2 rounded-full bg-forensic-gold"
                      animate={prefersReduced ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                  {isPending && <div className="h-2 w-2 rounded-full border border-forensic-stone/20 bg-graphite-800" />}
                </div>
                <span className="font-mono text-[11px] text-forensic-stone/60">{expert.icon}</span>
                <span className={`text-xs font-medium ${isPending ? 'text-forensic-stone/40' : 'text-forensic-text'}`}>
                  {expert.label}
                </span>
              </div>

              {isDone && (
                <motion.span
                  className={`text-sm font-bold tabular-nums ${colors.text}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {expert.riskScore}%
                </motion.span>
              )}
              {isActive && <span className="text-xs text-forensic-gold">分析中...</span>}
              {isPending && <span className="text-xs text-forensic-stone/30">待机</span>}
            </div>

            <div className="h-1 overflow-hidden rounded-full bg-graphite-800">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: isDone
                    ? `linear-gradient(90deg, ${colors.bar}99, ${colors.bar})`
                    : isActive
                      ? 'linear-gradient(90deg, #B88A44, #D2A64A)'
                      : 'transparent',
                  boxShadow: isDone ? `0 0 8px ${colors.glow}` : 'none',
                }}
                initial={{ width: '0%' }}
                animate={{
                  width: isDone ? `${expert.riskScore}%` : isActive ? '40%' : '0%',
                }}
                transition={{
                  duration: isDone ? 0.8 : 0.4,
                  ease: 'easeOut',
                }}
              />
            </div>

            {isDone && (
              <motion.div className="mt-2 flex flex-wrap gap-1" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                {expert.findings.map((finding) => (
                  <span
                    key={finding}
                    className="rounded px-1.5 py-0.5 text-[10px]"
                    style={{
                      background: `${colors.bar}18`,
                      color: colors.bar,
                      border: `1px solid ${colors.bar}30`,
                    }}
                  >
                    {finding}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
```

## src/features/analysis/components/FusionVerdictPanel.tsx

```tsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fusionEvidenceChips } from '../data';

type FusionVerdictPanelProps = {
  isVisible: boolean;
  riskScore: number;
  onGenerateReport: () => void;
  onViewReport: () => void;
};

function AnimatedScore({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1000;
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <span className="tabular-nums">{display}</span>;
}

export function FusionVerdictPanel({ isVisible, riskScore, onGenerateReport, onViewReport }: FusionVerdictPanelProps) {
  const riskLabel = riskScore >= 75 ? '高风险' : riskScore >= 50 ? '中风险' : '低风险';
  const riskColor = riskScore >= 75 ? '#C95A4A' : riskScore >= 50 ? '#D2A64A' : '#6F8F72';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="mt-4 rounded-xl border p-5"
          style={{
            borderColor: `${riskColor}40`,
            background: `linear-gradient(135deg, rgba(17,19,21,0.95) 0%, ${riskColor}08 100%)`,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs text-forensic-stone">综合判断</p>
              <motion.p
                className="text-2xl font-bold"
                style={{ color: riskColor }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              >
                {riskLabel}
              </motion.p>
            </div>
            <div className="relative h-20 w-20">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke={riskColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - riskScore / 100) }}
                  transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                  style={{ filter: `drop-shadow(0 0 6px ${riskColor}60)` }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold tabular-nums" style={{ color: riskColor }}>
                  <AnimatedScore target={riskScore} />
                  <span className="text-xs">%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-1 flex justify-between text-[10px] text-forensic-stone">
              <span>真实</span>
              <span>AI生成</span>
            </div>
            <div
              className="relative h-2 overflow-hidden rounded-full"
              style={{
                background: 'linear-gradient(90deg, #6F8F72 0%, #D2A64A 50%, #C95A4A 100%)',
                opacity: 0.8,
              }}
            >
              <motion.div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-forensic-text/80 bg-graphite-950"
                style={{ boxShadow: `0 0 8px ${riskColor}` }}
                initial={{ left: '0%' }}
                animate={{ left: `calc(${riskScore}% - 6px)` }}
                transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {fusionEvidenceChips.map((evidence, index) => (
              <motion.span
                key={evidence}
                className="rounded-full px-2 py-0.5 text-[10px]"
                style={{
                  background: 'rgba(201,90,74,0.12)',
                  color: '#C95A4A',
                  border: '1px solid rgba(201,90,74,0.25)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.08 }}
              >
                {evidence}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-3">
            <motion.button
              type="button"
              className="flex-1 rounded-lg py-2.5 text-sm font-medium text-graphite-950"
              style={{ background: 'linear-gradient(135deg, #B88A44, #D2A64A)' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGenerateReport}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              生成取证报告
            </motion.button>
            <motion.button
              type="button"
              className="rounded-lg border border-forensic-gold/15 px-4 py-2.5 text-sm text-forensic-stone transition-colors hover:border-forensic-gold/30"
              whileTap={{ scale: 0.98 }}
              onClick={onViewReport}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              查看报告
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## src/features/analysis/components/SemanticChainPanel.tsx

```tsx
import { CheckCircle2, Lock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SemanticStep } from '../types';
import type { PhaseId } from '../hooks/useDetectionPhases';
import { SemanticStepCard } from './SemanticStepCard';

type SemanticChainPanelProps = {
  steps: SemanticStep[];
  compact?: boolean;
  activeStepId?: string;
  activePhase?: PhaseId;
  isPhaseComplete?: (id: PhaseId) => boolean;
  onSelectStep?: (id: string) => void;
};

const stepVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.18, duration: 0.35, ease: 'easeOut' },
  }),
};

function fallbackLockedPhase(stepId: string): PhaseId {
  const map: Record<string, PhaseId> = {
    global: 'semantic-chain',
    local: 'expert-spatial',
    logic: 'expert-semantic',
    explain: 'complete',
  };
  return map[stepId] ?? 'semantic-chain';
}

export function SemanticChainPanel({
  steps,
  activeStepId,
  activePhase = 'complete',
  isPhaseComplete,
  onSelectStep,
}: SemanticChainPanelProps) {
  const prefersReduced = useReducedMotion();
  const isUnlocked = (phaseId: PhaseId) => (phaseId === 'complete' ? activePhase === 'complete' : (isPhaseComplete?.(phaseId) ?? true));

  return (
    <div className="space-y-4">
      {steps.length > 0 && (
        <div className="space-y-3">
          {steps.map((step, index) => {
            const lockedUntilPhase = (step.lockedUntilPhase as PhaseId | undefined) ?? fallbackLockedPhase(step.id);
            const locked = !isUnlocked(lockedUntilPhase);
            const processing = activePhase === lockedUntilPhase && !locked;

            return locked ? (
              <div
                key={step.id}
                className="flex items-center gap-2 rounded-lg border border-forensic-stone/10 bg-graphite-900/50 p-3"
              >
                <Lock size={12} className="text-forensic-stone/30" />
                <span className="text-xs text-forensic-stone/30">{step.name}</span>
              </div>
            ) : (
              <motion.div
                key={step.id}
                variants={stepVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                className={processing ? 'rounded-md' : undefined}
              >
                <motion.div
                  className="rounded-md"
                  animate={
                    processing && !prefersReduced
                      ? { boxShadow: ['0 0 0 rgba(184,138,68,0)', '0 0 18px rgba(184,138,68,0.18)', '0 0 0 rgba(184,138,68,0)'] }
                      : undefined
                  }
                  transition={{ duration: 1.1, repeat: Infinity }}
                >
                  <div className="mb-2 flex items-center gap-2 text-xs text-forensic-olive">
                    <CheckCircle2 size={12} />
                    阶段已解锁
                  </div>
                  <SemanticStepCard step={step} index={index} active={step.id === activeStepId || processing} onSelect={onSelectStep} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

## src/features/analysis/components/SemanticStepCard.tsx

```tsx
import { motion } from 'framer-motion';
import type { SemanticStep } from '../types';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, toneForStatus } from '../../../shared/utils/format';

type SemanticStepCardProps = {
  step: SemanticStep;
  index: number;
  active: boolean;
  onSelect?: (id: string) => void;
};

export function SemanticStepCard({ step, index, active, onSelect }: SemanticStepCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(step.id)}
      whileHover={{ borderColor: '#B88A44' }}
      className={`w-full rounded-md border p-4 text-left ${
        active ? 'border-forensic-warning bg-forensic-warning/10' : 'border-forensic-gold/[0.08] bg-graphite-850'
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-forensic-gold/40 bg-forensic-gold/10 text-xs text-forensic-gold">
            {index + 1}
          </span>
          <h3 className="font-semibold">{step.name}</h3>
        </div>
        <StatusBadge tone={toneForStatus(step.status)}>{statusLabel(step.status)}</StatusBadge>
      </div>
      <div className="grid gap-3 text-sm text-forensic-stone">
        <p>
          <span className="text-forensic-text">输入证据：</span>
          {step.input}
        </p>
        <p>
          <span className="text-forensic-text">中间结果：</span>
          {step.result}
        </p>
        <p>
          <span className="text-forensic-text">解释文本：</span>
          {step.explanation}
        </p>
      </div>
    </motion.button>
  );
}
```

## src/features/analysis/components/ExpertContributionChart.tsx

```tsx
import ReactECharts from 'echarts-for-react';
import type { ExpertResult } from '../types';
import { darkChartBase } from '../../../shared/utils/chartTheme';

type ExpertContributionChartProps = {
  experts: ExpertResult[];
};

export function ExpertContributionChart({ experts }: ExpertContributionChartProps) {
  const option = {
    ...darkChartBase,
    xAxis: { type: 'category', data: experts.map((expert) => expert.name), axisLabel: { color: '#A8A29A', rotate: 25 } },
    yAxis: { type: 'value', axisLabel: { color: '#A8A29A' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } } },
    series: [{ type: 'bar', data: experts.map((expert) => expert.contribution), barWidth: 22 }],
    grid: { ...darkChartBase.grid, left: 32, right: 12, bottom: 70 },
  };

  return <ReactECharts option={option} style={{ height: 240 }} />;
}
```

## src/features/analysis/components/CandidateEvidencePanel.tsx

```tsx
import type { EvidenceSample } from '../../samples/types';
import { StatusBadge } from '../../../shared/components/StatusBadge';

type CandidateEvidencePanelProps = {
  sample: EvidenceSample;
  selectedId: string;
  onSelect: (id: string) => void;
};

export function CandidateEvidencePanel({ sample, selectedId, onSelect }: CandidateEvidencePanelProps) {
  const candidates = sample.type === 'image' ? sample.regions : sample.segments;

  return (
    <div className="space-y-3">
      {candidates.map((candidate) => (
        <button
          type="button"
          key={candidate.id}
          onClick={() => onSelect(candidate.id)}
          className={`w-full rounded-md border p-3 text-left ${
            selectedId === candidate.id
              ? 'border-forensic-warning bg-forensic-warning/10'
              : 'border-forensic-gold/[0.08] bg-graphite-850'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{candidate.id} · {candidate.label}</p>
              <p className="mt-1 text-xs leading-5 text-forensic-stone">{candidate.clue}</p>
            </div>
            <StatusBadge tone="warning">{`${'riskScore' in candidate ? candidate.riskScore : candidate.confidence}%`}</StatusBadge>
          </div>
        </button>
      ))}
    </div>
  );
}
```

## src/features/samples/types.ts

```ts
export type SampleType = 'image' | 'video';
export type SampleSource = 'real' | 'generated' | 'unknown';
export type WorkflowStatus = 'pending' | 'running' | 'review' | 'complete';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type FakeRegion = {
  id: string;
  label: string;
  type: string;
  clue: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  semanticStepId: string;
  expertIds: string[];
  reviewStatus: WorkflowStatus;
};

export type VideoSegmentEvidence = {
  id: string;
  label: string;
  start: string;
  end: string;
  riskScore: number;
  clue: string;
  keyframes: string[];
  regions: FakeRegion[];
  semanticStepId: string;
  expertIds: string[];
  reviewStatus: WorkflowStatus;
};

export type EvidenceSample = {
  id: string;
  title: string;
  type: SampleType;
  source: SampleSource;
  generator?: string;
  assetSrc?: string;
  videoSrc?: string;
  category: string;
  prompt: string;
  annotationStatus: WorkflowStatus;
  analysisStatus: WorkflowStatus;
  reportStatus: WorkflowStatus;
  riskLevel: RiskLevel;
  riskScore: number;
  createdAt: string;
  regions: FakeRegion[];
  segments: VideoSegmentEvidence[];
};
```

## src/features/samples/data.ts

```ts
import type { EvidenceSample } from './types';

const imageRegions = [
  {
    id: 'R-01',
    label: '反射不一致',
    type: '反射异常',
    clue: '桌面反射区域与可见物体边界、光照方向存在偏差。',
    confidence: 82,
    x: 57,
    y: 24,
    width: 24,
    height: 19,
    semanticStepId: 'logic',
    expertIds: ['spatial', 'semantic'],
    reviewStatus: 'review' as const,
  },
  {
    id: 'R-02',
    label: '纹理断裂',
    type: '纹理异常',
    clue: '局部表面纹理连续性弱，邻接区域细节颗粒发生突变。',
    confidence: 74,
    x: 22,
    y: 53,
    width: 26,
    height: 20,
    semanticStepId: 'local',
    expertIds: ['frequency', 'style'],
    reviewStatus: 'pending' as const,
  },
  {
    id: 'R-03',
    label: '边界异常',
    type: '边界异常',
    clue: '主体边缘存在轻微晕影，局部锐化程度与背景不一致。',
    confidence: 68,
    x: 39,
    y: 31,
    width: 18,
    height: 28,
    semanticStepId: 'local',
    expertIds: ['spatial', 'style'],
    reviewStatus: 'complete' as const,
  },
];

const videoSegments = [
  {
    id: 'S-01',
    label: '时序边界漂移',
    start: '00:04.20',
    end: '00:07.80',
    riskScore: 72,
    clue: '片段内主体轮廓保持稳定，背景透视关系出现短时漂移。',
    keyframes: ['KF-01', 'KF-02', 'KF-03'],
    semanticStepId: 'logic',
    expertIds: ['spatial', 'semantic'],
    reviewStatus: 'review' as const,
    regions: [],
  },
  {
    id: 'S-02',
    label: '运动一致性缺口',
    start: '00:11.40',
    end: '00:15.30',
    riskScore: 79,
    clue: '运动轨迹在连续帧之间出现短时断裂，压缩痕迹同步性不足。',
    keyframes: ['KF-04', 'KF-05', 'KF-06'],
    semanticStepId: 'local',
    expertIds: ['frequency', 'style'],
    reviewStatus: 'pending' as const,
    regions: [],
  },
];

export const samples: EvidenceSample[] = [
  {
    id: 'IMG-DEMO-FAKE',
    title: '导入图像样本：疑似生成内容',
    type: 'image',
    source: 'generated',
    generator: '未知生成来源',
    assetSrc: '/demo-assets/fake.jpg',
    category: '演示图像',
    prompt: '推断提示词：室内视觉样本，包含反射表面、局部纹理和复杂边界关系。',
    annotationStatus: 'review',
    analysisStatus: 'complete',
    reportStatus: 'complete',
    riskLevel: 'high',
    riskScore: 82,
    createdAt: '2026-05-09 11:10',
    regions: imageRegions,
    segments: [],
  },
  {
    id: 'IMG-DEMO-REAL',
    title: '导入图像样本：真实对照内容',
    type: 'image',
    source: 'real',
    generator: '无',
    assetSrc: '/demo-assets/real.jpg',
    category: '对照图像',
    prompt: '无生成提示词。该样本用于真实图像对照展示。',
    annotationStatus: 'complete',
    analysisStatus: 'complete',
    reportStatus: 'pending',
    riskLevel: 'low',
    riskScore: 18,
    createdAt: '2026-05-09 11:10',
    regions: [
      {
        id: 'R-04',
        label: '正常结构',
        type: '对照区域',
        clue: '纹理、边界和光照关系保持稳定。',
        confidence: 22,
        x: 18,
        y: 24,
        width: 20,
        height: 24,
        semanticStepId: 'global',
        expertIds: ['spatial'],
        reviewStatus: 'complete',
      },
    ],
    segments: [],
  },
  {
    id: 'IMG-LIB-003',
    title: '商品材质图像样本',
    type: 'image',
    source: 'unknown',
    generator: '未知',
    assetSrc: '/demo-assets/fake.jpg',
    category: '商品图像',
    prompt: '推断提示词：金属材质主体，暗色背景，侧向柔光。',
    annotationStatus: 'complete',
    analysisStatus: 'review',
    reportStatus: 'pending',
    riskLevel: 'medium',
    riskScore: 58,
    createdAt: '2026-05-09 11:16',
    regions: imageRegions.slice(1),
    segments: [],
  },
  {
    id: 'IMG-LIB-004',
    title: '建筑立面对照样本',
    type: 'image',
    source: 'real',
    generator: '无',
    assetSrc: '/demo-assets/real.jpg',
    category: '建筑图像',
    prompt: '无生成提示词。用于对照复核。',
    annotationStatus: 'pending',
    analysisStatus: 'pending',
    reportStatus: 'pending',
    riskLevel: 'low',
    riskScore: 24,
    createdAt: '2026-05-09 11:18',
    regions: [],
    segments: [],
  },
  {
    id: 'IMG-LIB-005',
    title: '人像光照图像样本',
    type: 'image',
    source: 'generated',
    generator: '未知生成来源',
    assetSrc: '/demo-assets/fake.jpg',
    category: '人物图像',
    prompt: '推断提示词：室内人物主体，浅景深，柔和背景。',
    annotationStatus: 'running',
    analysisStatus: 'pending',
    reportStatus: 'pending',
    riskLevel: 'medium',
    riskScore: 61,
    createdAt: '2026-05-09 11:22',
    regions: imageRegions.slice(0, 2),
    segments: [],
  },
  {
    id: 'IMG-LIB-006',
    title: '街景反射图像样本',
    type: 'image',
    source: 'unknown',
    generator: '未知',
    assetSrc: '/demo-assets/fake.jpg',
    category: '街景图像',
    prompt: '推断提示词：夜间街道橱窗反射，行人经过玻璃表面。',
    annotationStatus: 'complete',
    analysisStatus: 'complete',
    reportStatus: 'complete',
    riskLevel: 'critical',
    riskScore: 88,
    createdAt: '2026-05-09 11:25',
    regions: imageRegions,
    segments: [],
  },
  {
    id: 'VID-DEMO-001',
    title: '导入视频样本：片段伪造视频',
    type: 'video',
    source: 'generated',
    generator: '未知视频生成来源',
    videoSrc: '/demo-assets/demo-video.mp4',
    category: '演示视频',
    prompt: '短视频样本，包含局部时序异常、关键帧漂移和片段风险线索。',
    annotationStatus: 'review',
    analysisStatus: 'complete',
    reportStatus: 'complete',
    riskLevel: 'high',
    riskScore: 79,
    createdAt: '2026-05-09 11:09',
    regions: [],
    segments: videoSegments,
  },
  {
    id: 'VID-LIB-002',
    title: '室内交互视频样本',
    type: 'video',
    source: 'unknown',
    generator: '未知',
    videoSrc: '/demo-assets/demo-video.mp4',
    category: '室内视频',
    prompt: '短时室内交互视频，包含手部运动和反射物体。',
    annotationStatus: 'complete',
    analysisStatus: 'pending',
    reportStatus: 'pending',
    riskLevel: 'medium',
    riskScore: 57,
    createdAt: '2026-05-09 11:31',
    regions: [],
    segments: videoSegments.slice(0, 1),
  },
  {
    id: 'VID-LIB-003',
    title: '会议发言视频样本',
    type: 'video',
    source: 'generated',
    generator: '未知视频生成来源',
    videoSrc: '/demo-assets/demo-video.mp4',
    category: '人物视频',
    prompt: '会议室人物发言片段，背景稳定，正面镜头。',
    annotationStatus: 'running',
    analysisStatus: 'pending',
    reportStatus: 'pending',
    riskLevel: 'critical',
    riskScore: 84,
    createdAt: '2026-05-09 11:34',
    regions: [],
    segments: videoSegments,
  },
  {
    id: 'VID-LIB-004',
    title: '产品转台视频样本',
    type: 'video',
    source: 'real',
    generator: '无',
    videoSrc: '/demo-assets/demo-video.mp4',
    category: '商品视频',
    prompt: '无生成提示词。用于视频标注流程对照展示。',
    annotationStatus: 'pending',
    analysisStatus: 'pending',
    reportStatus: 'pending',
    riskLevel: 'low',
    riskScore: 28,
    createdAt: '2026-05-09 11:37',
    regions: [],
    segments: videoSegments.slice(1),
  },
];

export const activeSample = samples[0];
export const activeVideoSample = samples.find((sample) => sample.type === 'video') ?? samples[0];
export const realImageSample = samples[1];
export const fakeImageSample = samples[0];

export const sampleMetrics = {
  total: samples.length,
  images: samples.filter((sample) => sample.type === 'image').length,
  videos: samples.filter((sample) => sample.type === 'video').length,
  annotated: samples.filter((sample) => sample.annotationStatus !== 'pending').length,
  analyzed: samples.filter((sample) => sample.analysisStatus !== 'pending').length,
  highRisk: samples.filter((sample) => sample.riskLevel === 'high' || sample.riskLevel === 'critical').length,
  reviewRequired: samples.filter((sample) => sample.annotationStatus === 'review').length,
  reports: samples.filter((sample) => sample.reportStatus === 'complete').length,
};

export const recentTasks = [
  {
    id: 'task-001',
    sampleId: 'IMG-LIB-006',
    type: 'image',
    status: 'done',
    riskLevel: 'high',
    completedAt: '2026-05-09 14:32',
    label: '面部合成检测',
  },
  {
    id: 'task-002',
    sampleId: 'IMG-DEMO-REAL',
    type: 'image',
    status: 'done',
    riskLevel: 'low',
    completedAt: '2026-05-09 13:15',
    label: '场景一致性验证',
  },
  {
    id: 'task-003',
    sampleId: 'VID-LIB-002',
    type: 'video',
    status: 'done',
    riskLevel: 'medium',
    completedAt: '2026-05-09 11:48',
    label: '时序边界检测',
  },
];
```

## src/pages/OverviewPage.tsx

```tsx
import { useNavigate } from 'react-router-dom';
import { Cpu, FileText, GitMerge, Tag, Upload } from 'lucide-react';
import { recentTasks } from '../features/samples/data';
import { PipelineIconFlow } from '../shared/components/PipelineIconFlow';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { RISK_LABEL, STATUS_LABEL, TYPE_LABEL, toneForRisk } from '../shared/utils/format';

const pipelineNodes = [
  { icon: Upload, label: '导入' },
  { icon: Tag, label: '标注' },
  { icon: Cpu, label: '检测' },
  { icon: GitMerge, label: '融合' },
  { icon: FileText, label: '报告' },
];

const compareRegions = [
  { label: '边界异常', className: 'right-[12%] top-[16%] h-20 w-32' },
  { label: '纹理断裂', className: 'left-[42%] top-[43%] h-20 w-36' },
  { label: '反射不一致', className: 'bottom-[14%] left-[12%] h-16 w-40' },
];

export function OverviewPage() {
  const navigate = useNavigate();

  return (
    <>
      <section
        className="relative flex min-h-[40vh] flex-col justify-center overflow-hidden rounded-2xl"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,138,68,0.12) 0%, transparent 70%), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(184,138,68,0.03) 40px)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10" />
        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-[-1px] text-forensic-text">
          发现 <span className="text-forensic-gold">AI 生成内容</span> 的隐藏证据
        </h1>
        <p className="mt-5 text-lg text-forensic-stone">自动标注 · 语义链检测 · 结构化报告</p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/analysis/sample')}
            className="rounded-xl bg-forensic-gold px-6 py-3 text-sm font-semibold text-graphite-950"
          >
            开始检测
          </button>
          <button
            type="button"
            onClick={() => navigate('/samples')}
            className="rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 px-6 py-3 text-sm font-semibold text-forensic-text"
          >
            查看样本库
          </button>
        </div>
      </section>

      <section className="mt-2">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="relative h-[280px] overflow-hidden rounded-xl border-2 border-forensic-olive bg-graphite-950">
            <img src="/demo-assets/real.jpg" alt="真实图像" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 rounded-lg border border-forensic-olive/30 bg-forensic-olive/15 px-3 py-2 text-sm text-forensic-olive">
              ✓ 真实图像 · 置信度 96%
            </div>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-xl border-2 border-forensic-risk bg-graphite-950">
            <img src="/demo-assets/fake.jpg" alt="AI 生成图像" className="h-full w-full object-cover" />
            {compareRegions.map((region) => (
              <div
                key={region.label}
                className={`absolute rounded-lg border-2 border-dashed border-forensic-risk bg-forensic-risk/10 ${region.className}`}
              >
                <span className="absolute -top-7 left-0 rounded-md border border-forensic-risk/30 bg-forensic-risk/15 px-2 py-1 text-xs text-forensic-risk">
                  {region.label}
                </span>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 rounded-lg border border-forensic-risk/30 bg-forensic-risk/15 px-3 py-2 text-sm text-forensic-risk">
              ⚠ AI 生成 · 高风险 · 置信度 94%
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {['边界异常', '纹理断裂', '反射不一致'].map((tag) => (
            <span key={tag} className="rounded-full border border-forensic-gold/[0.08] bg-graphite-850 px-3 py-1 text-xs text-forensic-stone">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          ['94.7%', 'AI生成检出率'],
          ['< 2s', '单图平均分析时间'],
          ['6 类', '证据类型覆盖'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-6">
            <p className="text-5xl font-bold text-forensic-gold">{value}</p>
            <p className="mt-3 text-sm text-forensic-stone">{label}</p>
          </div>
        ))}
      </section>

      <SectionCard title="处理流程" className="mt-8">
        <PipelineIconFlow nodes={pipelineNodes} />
      </SectionCard>

      <SectionCard title="最近任务" className="mt-8">
        <div className="grid gap-3 lg:grid-cols-3">
          {recentTasks.map((task) => (
            <div key={task.id} className="rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-forensic-text">{task.label}</p>
                  <p className="mt-1 text-xs text-forensic-stone">
                    {task.sampleId} · {TYPE_LABEL[task.type]} · {task.completedAt}
                  </p>
                  <p className="mt-1 text-xs text-forensic-stone">{STATUS_LABEL[task.status]}</p>
                </div>
                <StatusBadge tone={toneForRisk(task.riskLevel)}>{RISK_LABEL[task.riskLevel]}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
```

## src/pages/SampleLibraryPage.tsx

```tsx
import { useMemo, useState } from 'react';
import { samples } from '../features/samples/data';
import type { EvidenceSample } from '../features/samples/types';
import { SampleCard } from '../features/samples/components/SampleCard';
import { SampleFilters } from '../features/samples/components/SampleFilters';
import { SampleImportPanel } from '../features/samples/components/SampleImportPanel';
import { SampleStatusPanel } from '../features/samples/components/SampleStatusPanel';
import { SampleTable } from '../features/samples/components/SampleTable';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';

export function SampleLibraryPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedSample, setSelectedSample] = useState<EvidenceSample>(samples[0]);
  const [imported, setImported] = useState(false);

  const filteredSamples = useMemo(
    () =>
      samples.filter((sample) => {
        const matchesType = selectedType === 'all' || sample.type === selectedType;
        const keyword = search.trim().toLowerCase();
        const matchesSearch =
          keyword.length === 0 ||
          sample.id.toLowerCase().includes(keyword) ||
          sample.title.toLowerCase().includes(keyword);
        return matchesType && matchesSearch;
      }),
    [selectedType, search],
  );

  return (
    <PageShell
      eyebrow="样本库"
      title="统一样本证据工作区"
      description="样本库连接导入、自动标注、可解释检测、证据融合与最终报告。"
    >
      <SectionCard title="样本导入" eyebrow="输入层">
        <SampleImportPanel imported={imported} onImport={() => setImported(true)} />
      </SectionCard>
      <div className="mt-5 grid grid-cols-[1fr_360px] gap-5">
        <div className="space-y-5">
          <SectionCard title="筛选条件">
            <SampleFilters
              selectedType={selectedType}
              search={search}
              onTypeChange={setSelectedType}
              onSearchChange={setSearch}
            />
          </SectionCard>
          <SectionCard title="样本表" eyebrow="共享证据上下文">
            <SampleTable
              samples={filteredSamples}
              selectedId={selectedSample.id}
              onSelect={setSelectedSample}
            />
          </SectionCard>
        </div>
        <div className="space-y-5">
          <SectionCard title="当前样本" eyebrow="上下文">
            <SampleStatusPanel sample={selectedSample} />
          </SectionCard>
          <SectionCard title="样本卡片" eyebrow="快速选择">
            <div className="space-y-3">
              {filteredSamples.slice(0, 3).map((sample) => (
                <SampleCard
                  key={sample.id}
                  sample={sample}
                  selected={sample.id === selectedSample.id}
                  onSelect={setSelectedSample}
                />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </PageShell>
  );
}
```

## src/pages/AnnotationCenterPage.tsx

```tsx
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
import { ImageIcon, Video } from 'lucide-react';
import { samples } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { darkChartBase } from '../shared/utils/chartTheme';
import { statusLabel, toneForStatus, TYPE_LABEL } from '../shared/utils/format';

export function AnnotationCenterPage() {
  const navigate = useNavigate();

  const annotationProgressOption = {
    ...darkChartBase,
    series: [
      {
        type: 'pie',
        radius: ['72%', '88%'],
        silent: true,
        label: { show: true, position: 'center', formatter: '72%', color: '#B88A44', fontSize: 34, fontWeight: 700 },
        data: [
          { value: 72, name: '完成' },
          { value: 28, name: '剩余' },
        ],
      },
    ],
  };

  const evidenceTypeOption = {
    ...darkChartBase,
    xAxis: { type: 'value', axisLabel: { color: '#A8A29A' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.08)' } } },
    yAxis: {
      type: 'category',
      data: ['可疑区域', '视频片段', '关键帧', '提示词线索'],
      axisLabel: { color: '#A8A29A' },
    },
    series: [{ type: 'bar', data: [7, 5, 13, 10], barWidth: 12 }],
    grid: { ...darkChartBase.grid, left: 80 },
  };

  return (
    <PageShell eyebrow="标注中心" title="数据标注" description="">
      <div className="grid gap-5 lg:grid-cols-2">
        <button
          type="button"
          onClick={() => navigate('/annotation/image')}
          className="flex h-[220px] flex-col items-center justify-center gap-4 rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 transition hover:-translate-y-0.5 hover:border-forensic-gold/50 hover:bg-forensic-gold/5"
        >
          <ImageIcon className="h-12 w-12 text-forensic-gold" />
          <p className="text-2xl font-semibold">图像标注</p>
          <p className="text-sm text-forensic-stone">自动发现可疑区域</p>
          <span className="rounded-lg bg-forensic-gold px-5 py-2 text-sm font-semibold text-graphite-950">进入</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/annotation/video')}
          className="flex h-[220px] flex-col items-center justify-center gap-4 rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 transition hover:-translate-y-0.5 hover:border-forensic-gold/50 hover:bg-forensic-gold/5"
        >
          <Video className="h-12 w-12 text-forensic-gold" />
          <p className="text-2xl font-semibold">视频标注</p>
          <p className="text-sm text-forensic-stone">定位可疑片段</p>
          <span className="rounded-lg bg-forensic-gold px-5 py-2 text-sm font-semibold text-graphite-950">进入</span>
        </button>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[360px_1fr]">
        <SectionCard title="标注进度">
          <ReactECharts option={annotationProgressOption} style={{ height: 260 }} />
        </SectionCard>
        <SectionCard title="证据类型分布">
          <ReactECharts option={evidenceTypeOption} style={{ height: 260 }} />
        </SectionCard>
      </div>

      <SectionCard title="最近标注任务" className="mt-5">
        <div className="grid gap-3 lg:grid-cols-3">
          {samples.slice(0, 6).map((sample) => (
            <div key={sample.id} className="rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{sample.id}</p>
                  <p className="mt-1 text-xs text-forensic-stone">{TYPE_LABEL[sample.type]}</p>
                </div>
                <StatusBadge tone={toneForStatus(sample.annotationStatus)}>
                  {statusLabel(sample.annotationStatus)}
                </StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
```

## src/pages/ImageAnnotationPage.tsx

```tsx
import { ChangeEvent, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { activeSample, samples } from '../features/samples/data';
import { AnnotationResultPanel } from '../features/annotation/components/AnnotationResultPanel';
import { ImageAnnotationCanvas } from '../features/annotation/components/ImageAnnotationCanvas';
import { RegionClueList } from '../features/annotation/components/RegionClueList';
import { PageShell } from '../layouts/PageShell';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { readFileAsDataUrl, readLocalAsset, saveAnnotationToSession, saveLocalAsset } from '../shared/utils/localSample';

const imageStages = [
  { title: '图像读取', output: '建立图像任务上下文' },
  { title: '区域扫描', output: '发现候选可疑区域' },
  { title: '线索生成', output: '输出反射、纹理、边界线索' },
  { title: '结果固化', output: '写入候选证据队列' },
];

export function ImageAnnotationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeSample.id;
  const sample = samples.find((item) => item.id === sampleId && item.type === 'image') ?? activeSample;

  const [selectedRegionId, setSelectedRegionId] = useState(sample.regions[0]?.id ?? '');
  const [running, setRunning] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [localImage, setLocalImage] = useState(() => {
    const stored = readLocalAsset('image');
    return {
      dataUrl: stored.dataUrl ?? sample.assetSrc ?? null,
      name: stored.name ?? 'fake.jpg',
    };
  });

  const selectedRegion = useMemo(
    () => sample.regions.find((region) => region.id === selectedRegionId) ?? sample.regions[0],
    [sample.regions, selectedRegionId],
  );

  function runAnnotation() {
    setRunning(true);
    setComplete(false);
    setActiveIndex(0);
    imageStages.forEach((_, index) => {
      window.setTimeout(() => {
        setActiveIndex(index);
        if (index === imageStages.length - 1) {
          window.setTimeout(() => {
            setRunning(false);
            setComplete(true);
          }, 450);
        }
      }, index * 550);
    });
  }

  function sendToAnalysis() {
    saveAnnotationToSession(sample.id, sample.regions);
    navigate(`/analysis/sample?sampleId=${sample.id}`);
  }

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (dataUrl) => {
      saveLocalAsset('image', dataUrl, file.name);
      setLocalImage({ dataUrl, name: file.name });
    });
  }

  return (
    <PageShell eyebrow="图像标注" title="图像证据发现" description="">
      <PipelineStatusBar steps={['读取', '扫描', '生成', '固化']} currentStep={activeIndex} complete={complete} />

      <SectionCard title="图像输入" eyebrow={sample.id} className="mt-5">
        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <label className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-4">
            <p className="text-sm font-semibold">选择图像文件</p>
            <p className="mt-2 text-xs text-forensic-stone">{localImage.name}</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mt-4 block w-full text-xs text-forensic-stone file:mr-3 file:rounded file:border-0 file:bg-forensic-gold/10 file:px-3 file:py-2 file:text-forensic-gold"
            />
            <button
              type="button"
              onClick={runAnnotation}
              className="mt-4 w-full rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
            >
              {running ? '正在标注' : '开始标注'}
            </button>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {imageStages.map((stage) => (
              <div key={stage.title} className="rounded-lg border border-forensic-gold/[0.08] bg-graphite-850 p-3">
                <p className="text-sm font-semibold">{stage.title}</p>
                <p className="mt-2 text-xs text-forensic-stone">{stage.output}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-[55fr_45fr]">
        <SectionCard title="图像画布" eyebrow="候选区域">
          <ImageAnnotationCanvas
            sample={sample}
            selectedRegionId={selectedRegionId}
            onSelectRegion={setSelectedRegionId}
            imageSrc={localImage.dataUrl}
          />
        </SectionCard>
        <SectionCard title="标注结果面板" eyebrow="结构化输出">
          <AnnotationResultPanel
            sample={sample}
            selectedRegion={selectedRegion}
            running={running}
            reviewed={reviewed}
            onRun={runAnnotation}
            onReview={() => setReviewed(true)}
            onSendToAnalysis={sendToAnalysis}
          />
        </SectionCard>
      </div>

      <SectionCard title="候选证据列表" className="mt-5">
        <RegionClueList regions={sample.regions} selectedId={selectedRegionId} onSelect={setSelectedRegionId} />
      </SectionCard>
    </PageShell>
  );
}
```

## src/pages/VideoAnnotationPage.tsx

```tsx
import { ChangeEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { activeVideoSample, samples } from '../features/samples/data';
import { KeyframeStrip } from '../features/annotation/components/KeyframeStrip';
import { SegmentPanel } from '../features/annotation/components/SegmentPanel';
import { VideoTimeline } from '../features/annotation/components/VideoTimeline';
import { PageShell } from '../layouts/PageShell';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { VideoPlayer } from '../shared/components/VideoPlayer';
import { readFileAsDataUrl, readLocalAsset, saveLocalAsset } from '../shared/utils/localSample';

const videoStages = [
  { title: '视频读取', output: '抽取帧序列与时间轴' },
  { title: '片段扫描', output: '发现可疑时间片段' },
  { title: '关键帧定位', output: '输出关键帧 KF-01 至 KF-06' },
  { title: '片段证据生成', output: '生成风险分数与复核状态' },
];

export function VideoAnnotationPage() {
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeVideoSample.id;
  const videoSample = samples.find((sample) => sample.id === sampleId && sample.type === 'video') ?? activeVideoSample;

  const [selectedSegmentId, setSelectedSegmentId] = useState(videoSample.segments[0]?.id ?? '');
  const selectedSegment = useMemo(
    () => videoSample.segments.find((segment) => segment.id === selectedSegmentId) ?? videoSample.segments[0],
    [selectedSegmentId, videoSample.segments],
  );
  const [selectedFrame, setSelectedFrame] = useState(selectedSegment?.keyframes[0] ?? '');
  const [running, setRunning] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [localVideo, setLocalVideo] = useState(() => {
    const stored = readLocalAsset('video');
    return {
      dataUrl: stored.dataUrl ?? videoSample.videoSrc ?? null,
      name: stored.name ?? '片段伪造视频.mp4',
    };
  });

  function runAnnotation() {
    setRunning(true);
    setComplete(false);
    setActiveIndex(0);
    videoStages.forEach((_, index) => {
      window.setTimeout(() => {
        setActiveIndex(index);
        if (index === videoStages.length - 1) {
          window.setTimeout(() => {
            setRunning(false);
            setComplete(true);
          }, 450);
        }
      }, index * 550);
    });
  }

  function handleVideo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (dataUrl) => {
      saveLocalAsset('video', dataUrl, file.name);
      setLocalVideo({ dataUrl, name: file.name });
    });
  }

  return (
    <PageShell eyebrow="视频标注" title="视频片段证据发现" description="">
      <PipelineStatusBar steps={['读取', '扫描', '定位', '生成']} currentStep={activeIndex} complete={complete} />

      <SectionCard title="视频输入与处理过程" eyebrow={videoSample.id} className="mt-5">
        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <label className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-4">
            <p className="text-sm font-semibold">选择视频文件</p>
            <p className="mt-2 text-xs text-forensic-stone">{localVideo.name}</p>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideo}
              className="mt-4 block w-full text-xs text-forensic-stone file:mr-3 file:rounded file:border-0 file:bg-forensic-olive/10 file:px-3 file:py-2 file:text-forensic-olive"
            />
            <button
              type="button"
              onClick={runAnnotation}
              className="mt-4 w-full rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
            >
              {running ? '正在处理' : '开始处理'}
            </button>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {videoStages.map((stage) => (
              <div key={stage.title} className="rounded-lg border border-forensic-gold/[0.08] bg-graphite-850 p-3">
                <p className="text-sm font-semibold">{stage.title}</p>
                <p className="mt-2 text-xs text-forensic-stone">{stage.output}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-[1.6fr_430px]">
        <div className="space-y-5">
          <SectionCard title="视频播放器" eyebrow="本地样本">
            <VideoPlayer src={localVideo.dataUrl ?? videoSample.videoSrc} />
          </SectionCard>
          <SectionCard title="取证时间线" eyebrow="可疑片段">
            <VideoTimeline
              segments={videoSample.segments}
              selectedId={selectedSegment.id}
              onSelect={(id) => {
                setSelectedSegmentId(id);
                const nextSegment = videoSample.segments.find((segment) => segment.id === id);
                setSelectedFrame(nextSegment?.keyframes[0] ?? '');
              }}
            />
          </SectionCard>
        </div>
        <SectionCard title="片段标注面板" eyebrow="选中片段">
          <SegmentPanel
            segment={selectedSegment}
            running={running}
            reviewed={reviewed}
            onRun={runAnnotation}
            onReview={() => setReviewed(true)}
          />
        </SectionCard>
      </div>

      <SectionCard title="关键帧条" eyebrow={`选中帧：${selectedFrame}`} className="mt-5">
        <KeyframeStrip frames={selectedSegment.keyframes} selectedFrame={selectedFrame} onSelect={setSelectedFrame} />
      </SectionCard>
    </PageShell>
  );
}
```

## src/pages/AnalysisCenterPage.tsx

```tsx
import ReactECharts from 'echarts-for-react';
import { Link } from 'react-router-dom';
import { Cpu, Video as VideoIcon } from 'lucide-react';
import { expertResults } from '../features/analysis/data';
import { samples } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { darkChartBase } from '../shared/utils/chartTheme';

const semanticNodes = ['全局语义', '局部区域', '逻辑一致性', '解释输出'];

export function AnalysisCenterPage() {
  const expertOption = {
    ...darkChartBase,
    radar: {
      indicator: [
        { name: '空间', max: 100 },
        { name: '频域', max: 100 },
        { name: '风格', max: 100 },
        { name: '语义', max: 100 },
      ],
      axisName: { color: '#A8A29A' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,.08)' } },
      splitArea: { areaStyle: { color: ['rgba(255,255,255,.03)', 'rgba(255,255,255,.01)'] } },
    },
    series: [{ type: 'radar', data: [{ value: expertResults.map((expert) => expert.score) }] }],
  };

  return (
    <PageShell eyebrow="检测中心" title="可解释 AI 检测" description="语义链 × 专家组 × 证据融合">
      <section className="rounded-2xl border border-forensic-gold/25 bg-forensic-gold/[0.05] p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-4xl font-bold">可解释 AI 检测</h2>
            <p className="mt-3 text-forensic-stone">语义链 × 专家组 × 证据融合</p>
          </div>
          <Link to="/analysis/sample" className="inline-flex items-center gap-2 rounded-xl bg-forensic-gold px-6 py-3 text-sm font-semibold text-graphite-950">
            <Cpu className="h-4 w-4" />
            进入检测工作台
          </Link>
        </div>
      </section>

      <div className="mt-5 opacity-40 cursor-not-allowed rounded-xl border border-forensic-gold/[0.08] p-6 flex items-center gap-4">
        <VideoIcon size={32} className="text-forensic-stone/60" />
        <div>
          <p className="text-sm font-medium text-forensic-stone">视频片段检测</p>
          <p className="text-xs text-forensic-stone/60">时序分析模块开发中，敬请期待</p>
        </div>
        <span className="ml-auto text-xs px-2 py-0.5 rounded bg-graphite-800 text-forensic-stone">规划中</span>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <SectionCard title="语义链">
          <div className="grid grid-cols-4 gap-2">
            {semanticNodes.map((item, index) => (
              <div key={item} className="relative flex h-10 items-center justify-center rounded-lg border border-forensic-gold/[0.08] bg-graphite-850 text-center text-sm text-forensic-gold">
                {item}
                {index < semanticNodes.length - 1 && <span className="absolute -right-2 top-1/2 h-px w-2 bg-forensic-gold/40" />}
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="专家贡献">
          <ReactECharts option={expertOption} style={{ height: 260 }} />
        </SectionCard>
      </div>

      <SectionCard title="最近检测结果" className="mt-5">
        <div className="grid gap-3 lg:grid-cols-4">
          {samples.slice(0, 4).map((sample) => (
            <div key={sample.id} className="rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{sample.id}</p>
                  <p className="mt-1 text-xs text-forensic-stone">{sample.title}</p>
                </div>
                <StatusBadge tone={sample.riskScore > 70 ? 'risk' : 'warning'}>{sample.riskScore}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
```

## src/pages/ReportPage.tsx

```tsx
import { useEffect, useState } from 'react';
import { reportSections } from '../features/report/data';
import { ReportPreview } from '../features/report/components/ReportPreview';
import { PageShell } from '../layouts/PageShell';

export function ReportPage() {
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(false), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function exportReport() {
    setNotice(true);
    window.print();
  }

  return (
    <div
      className="min-h-full"
      style={{
        backgroundImage: `
          linear-gradient(rgba(184,138,68,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(184,138,68,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        backgroundColor: '#111315',
      }}
    >
      <PageShell eyebrow="证据报告" title="结构化证据报告" description="">
      {notice && (
        <div className="fixed right-6 top-16 z-50 rounded-lg border border-forensic-gold/30 bg-forensic-gold/10 px-4 py-3 text-sm text-forensic-gold shadow-lg backdrop-blur">
          报告已发送至打印队列
        </div>
      )}
        <ReportPreview sections={reportSections} onExport={exportReport} />
      </PageShell>
    </div>
  );
}
```

## src/features/report/data.ts

```ts
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
```

## src/features/report/components/ReportPreview.tsx

```tsx
import { useState } from 'react';
import { activeSample, samples } from '../../samples/data';
import type { ReportSectionData } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { VideoPlayer } from '../../../shared/components/VideoPlayer';
import { TYPE_LABEL } from '../../../shared/utils/format';
import { ReportSection } from './ReportSection';

type ReportPreviewProps = {
  sections: ReportSectionData[];
  onExport: () => void;
};

const catalog = ['报告摘要', '样本信息', '自动证据标注', '语义链理解', '专家组检测', '证据融合', '最终结论', '复核建议'];

export function ReportPreview({ sections, onExport }: ReportPreviewProps) {
  const [selectedSampleId, setSelectedSampleId] = useState(activeSample.id);
  const selectedSample = samples.find((sample) => sample.id === selectedSampleId) ?? activeSample;

  return (
    <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
      <aside className="h-fit rounded-lg border border-forensic-gold/[0.08] bg-graphite-850 p-3 lg:sticky lg:top-24">
        <p className="text-xs uppercase tracking-[0.18em] text-forensic-gold">报告目录</p>
        <div className="mt-4 space-y-2">
          {catalog.map((item, index) => (
            <a
              key={item}
              href={`#report-${index}`}
              className="block rounded-md border border-transparent px-3 py-2 text-sm text-forensic-stone hover:border-forensic-gold/[0.08] hover:bg-graphite-850"
            >
              {item}
            </a>
          ))}
        </div>
      </aside>

      <article className="rounded-lg border border-forensic-gold/[0.08] bg-graphite-900/90 p-8 shadow-workstation backdrop-blur">
        <div className="border-b border-forensic-gold/[0.08] pb-4 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-lg font-semibold text-forensic-text">视觉内容真实性分析报告</h1>
              <p className="text-xs text-forensic-stone mt-1">Visual Content Authenticity Analysis Report</p>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-forensic-warning/15 text-forensic-warning border border-forensic-warning/30">
              内部取证文档
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 text-xs text-forensic-stone">
            <div>
              <span className="text-forensic-stone/60">报告编号</span>
              <br />
              <span className="text-forensic-text">VAW-2026001</span>
            </div>
            <div>
              <span className="text-forensic-stone/60">生成时间</span>
              <br />
              <span className="text-forensic-text">2026-05-09 14:32:01</span>
            </div>
            <div>
              <span className="text-forensic-stone/60">系统版本</span>
              <br />
              <span className="text-forensic-text">v0.9.0-alpha</span>
            </div>
          </div>
        </div>

        <section id="report-0" className="mb-8 border-b border-forensic-gold/[0.08] pb-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-forensic-gold">结构化证据报告</p>
              <h2 className="mt-2 text-2xl font-semibold">视觉生成内容证据分析</h2>
            </div>
            <StatusBadge tone="warning">待复核</StatusBadge>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">样本编号</p>
              <select
                value={selectedSampleId}
                onChange={(event) => setSelectedSampleId(event.target.value)}
                className="mt-2 w-full rounded border border-forensic-gold/[0.08] bg-graphite-950 px-2 py-2 text-sm font-semibold outline-none"
              >
                {samples.map((sample) => (
                  <option key={sample.id} value={sample.id}>
                    {sample.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">样本类型</p>
              <p className="mt-2 font-semibold">{TYPE_LABEL[selectedSample.type]}</p>
            </div>
            <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">检测时间</p>
              <p className="mt-2 font-semibold">2026-05-09 14:32</p>
            </div>
            <div className="rounded-md border border-forensic-warning/35 bg-forensic-warning/10 p-4">
              <ScoreBar label="最终风险分数" value={selectedSample.riskScore} tone="warning" />
            </div>
          </div>
        </section>

        <section className="mb-8 border-b border-forensic-gold/[0.08] pb-6">
          <h3 className="mb-4 text-base font-semibold">样本预览</h3>
          {selectedSample.type === 'image' ? (
            <div className="relative overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-950">
              <img src={selectedSample.assetSrc} alt="报告样本" className="h-72 w-full object-contain" />
              {selectedSample.regions.map((region) => (
                <div
                  key={region.id}
                  className="absolute rounded border-2 border-forensic-risk bg-forensic-risk/10"
                  style={{ left: `${region.x}%`, top: `${region.y}%`, width: `${region.width}%`, height: `${region.height}%` }}
                />
              ))}
            </div>
          ) : (
            <VideoPlayer src={selectedSample.videoSrc} />
          )}
        </section>

        {sections.map((section, index) => (
          <div id={`report-${index + 1}`} key={section.title}>
            <ReportSection section={section} />
          </div>
        ))}

        <button
          type="button"
          onClick={onExport}
          className="mt-2 rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
        >
          导出报告
        </button>
      </article>
    </div>
  );
}
```

## src/shared/utils/format.ts

```ts
import type { StatusTone } from '../types/common';

export const STATUS_LABEL: Record<string, string> = {
  pending: '待处理',
  processing: '处理中',
  running: '处理中',
  done: '已完成',
  complete: '已完成',
  error: '错误',
  reviewed: '已复核',
  review: '待复核',
};

export const TYPE_LABEL: Record<string, string> = {
  image: '图像',
  video: '视频',
};

export const SOURCE_LABEL: Record<string, string> = {
  generated: '生成',
  real: '真实',
  unknown: '未知',
};

export const RISK_LABEL: Record<string, string> = {
  high: '高风险',
  medium: '中风险',
  low: '低风险',
  unknown: '未知',
  critical: '关键风险',
};

export const ANNOTATION_STATUS_LABEL: Record<string, string> = {
  unannotated: '未标注',
  annotated: '已标注',
  reviewed: '已复核',
  pending: '未标注',
  running: '处理中',
  review: '待复核',
  complete: '已标注',
};

export const DETECTION_STATUS_LABEL: Record<string, string> = {
  unanalyzed: '未检测',
  analyzing: '检测中',
  analyzed: '已检测',
  pending: '未检测',
  running: '检测中',
  review: '待复核',
  complete: '已检测',
};

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatScore(value: number) {
  return value.toFixed(2);
}

export function statusLabel(value: string) {
  return STATUS_LABEL[value] ?? value;
}

export function riskLabel(value: string) {
  return RISK_LABEL[value] ?? value;
}

export function toneForStatus(value: string): StatusTone {
  if (value === 'complete' || value === 'done' || value === 'reviewed') return 'success';
  if (value === 'review' || value === 'running' || value === 'processing') return 'warning';
  if (value === 'error') return 'risk';
  return 'neutral';
}

export function toneForRisk(value: string): StatusTone {
  if (value === 'high' || value === 'critical') return 'risk';
  if (value === 'medium') return 'warning';
  if (value === 'low') return 'success';
  return 'neutral';
}
```

## src/shared/utils/localSample.ts

```ts
export type LocalAssetKind = 'image' | 'video';

export function saveLocalAsset(kind: LocalAssetKind, dataUrl: string, name: string) {
  localStorage.setItem(`${kind}:dataUrl`, dataUrl);
  localStorage.setItem(`${kind}:name`, name);
}

export function readLocalAsset(kind: LocalAssetKind) {
  return {
    dataUrl: localStorage.getItem(`${kind}:dataUrl`),
    name: localStorage.getItem(`${kind}:name`),
  };
}

export function readFileAsDataUrl(file: File, onLoad: (dataUrl: string) => void) {
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      onLoad(reader.result);
    }
  };
  reader.readAsDataURL(file);
}

export function saveAnnotationToSession(sampleId: string, regions: unknown[]): void {
  sessionStorage.setItem(`annotation_${sampleId}`, JSON.stringify(regions));
}

export function loadAnnotationFromSession(sampleId: string): unknown[] | null {
  const raw = sessionStorage.getItem(`annotation_${sampleId}`);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as unknown[]) : null;
  } catch {
    sessionStorage.removeItem(`annotation_${sampleId}`);
    return null;
  }
}
```

## src/shared/utils/chartTheme.ts

```ts
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
```

## src/styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color: #F3F0EA;
  background: #111315;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 0;
  min-height: 100vh;
  margin: 0;
  background:
    radial-gradient(circle at 10% 0%, rgba(184, 138, 68, 0.12), transparent 32%),
    radial-gradient(circle at 85% 6%, rgba(111, 143, 114, 0.12), transparent 30%),
    linear-gradient(180deg, #111315 0%, #111315 52%, #111315 100%);
}

button,
input,
textarea,
select {
  font: inherit;
}

.react-flow__attribution {
  display: none;
}

.react-flow__node {
  font-family: inherit;
}

::selection {
  background: rgba(184, 138, 68, 0.25);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    scroll-behavior: auto !important;
  }
}
```

