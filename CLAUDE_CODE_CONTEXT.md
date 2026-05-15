# Claude Code Context: visual-authenticity-workbench

This file is a synchronized root-level snapshot for tools that cannot traverse the repository tree.

Last synchronized: 2026-05-13

## Product Positioning

visual-authenticity-workbench is a frontend-only forensic-style workbench for visual generated-content evidence analysis. It has no backend, no real AI inference, and no live detection API. Annotation outputs, detection phases, risk scores, and report content are mock data plus deterministic frontend simulation.

Core workflow: Sample Import -> Data Annotation -> Explainable Detection -> Evidence Fusion -> Structured Report

## Tech Stack

- Vite 6
- React 18
- TypeScript strict
- Tailwind CSS 3
- React Router 7
- Framer Motion 11
- echarts-for-react / ECharts
- @xyflow/react
- lucide-react
- pnpm 9.15.4

## Runtime Notes

- package.json declares Node >=20 <21.
- Use corepack pnpm when pnpm is not available directly in PowerShell.
- Run with Vite dev server, not by opening index.html through file://.
- Browser-based folder import uses directory picker inputs; typed filesystem paths cannot be read directly by a frontend-only web app.
- Imported media samples are session-level blob URLs stored in src/features/samples/importedSamples.ts; refresh clears access to those local file objects.
- Detection workbench default demo image is public/demo-assets/fake_example.png, copied from pictures/fake_example.png.
- Verified after latest sync: corepack pnpm lint passes with zero errors; corepack pnpm build passes.
- Current local Node v24.11.1 triggers an engines warning but build and lint completed.

## Latest Completed Upgrade Batch

- Detection workbench default example image changed to /demo-assets/fake_example.png.
- Video annotation extracts real keyframe thumbnails with hidden video + canvas instead of patterned placeholders.
- Video annotation timeline uses actual video duration from metadata, with demo fallback duration 8 seconds.
- Demo video forged segments are aligned to 1-3s and 6-7s in timeline and segment detail views.
- Shapley attribution donut was added to FusionVerdictPanel using pure SVG.
- Expert panel shows generic and targeted heterogeneous experts with LoRA, gate score, and Shapley attribution.
- Semantic chain panel aligns with CLIP / Grounding DINO / ConceptNet + LLM three-stage research flow.
- Sample import uses real browser File API input for multiple image/video files and folder selection.

## Visual System

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

## Public Assets

- public/demo-assets/demo-video.mp4
- public/demo-assets/fake.jpg
- public/demo-assets/fake_example.png
- public/demo-assets/real.jpg

## File Index

- README.md
- package.json
- index.html
- vite.config.ts
- tailwind.config.ts
- eslint.config.js
- tsconfig.json
- tsconfig.app.json
- tsconfig.node.json
- public/demo-assets/demo-video.mp4
- public/demo-assets/fake.jpg
- public/demo-assets/fake_example.png
- public/demo-assets/real.jpg
- src/app/App.tsx
- src/app/router.tsx
- src/features/analysis/components/CandidateEvidencePanel.tsx
- src/features/analysis/components/DetectionLogStream.tsx
- src/features/analysis/components/ExpertMeterPanel.tsx
- src/features/analysis/components/FusionVerdictPanel.tsx
- src/features/analysis/components/ImageScanCanvas.tsx
- src/features/analysis/components/SemanticChainPanel.tsx
- src/features/analysis/components/SemanticStepCard.tsx
- src/features/analysis/data.ts
- src/features/analysis/hooks/useDetectionPhases.ts
- src/features/analysis/types.ts
- src/features/annotation/components/AnnotationLogStream.tsx
- src/features/annotation/components/AnnotationResultPanel.tsx
- src/features/annotation/components/FakeRegionOverlay.tsx
- src/features/annotation/components/ImageAnnotationCanvas.tsx
- src/features/annotation/components/KeyframeStrip.tsx
- src/features/annotation/components/RegionClueList.tsx
- src/features/annotation/components/SegmentPanel.tsx
- src/features/annotation/components/VideoTimeline.tsx
- src/features/report/components/ReportPreview.tsx
- src/features/report/components/ReportSection.tsx
- src/features/report/data.ts
- src/features/report/types.ts
- src/features/samples/components/SampleCard.tsx
- src/features/samples/components/SampleFilters.tsx
- src/features/samples/components/SampleImportPanel.tsx
- src/features/samples/components/SampleStatusPanel.tsx
- src/features/samples/components/SampleTable.tsx
- src/features/samples/data.ts
- src/features/samples/importedSamples.ts
- src/features/samples/types.ts
- src/layouts/AppLayout.tsx
- src/layouts/PageShell.tsx
- src/layouts/Sidebar.tsx
- src/layouts/TopBar.tsx
- src/main.tsx
- src/pages/AnalysisCenterPage.tsx
- src/pages/AnnotationCenterPage.tsx
- src/pages/ImageAnnotationPage.tsx
- src/pages/OverviewPage.tsx
- src/pages/ReportPage.tsx
- src/pages/SampleAnalysisPage.tsx
- src/pages/SampleLibraryPage.tsx
- src/pages/VideoAnnotationPage.tsx
- src/shared/components/EmptyAssetPlaceholder.tsx
- src/shared/components/HeroDemoCard.tsx
- src/shared/components/MetricStat.tsx
- src/shared/components/PipelineIconFlow.tsx
- src/shared/components/PipelineStatusBar.tsx
- src/shared/components/ScoreBar.tsx
- src/shared/components/SectionCard.tsx
- src/shared/components/StatusBadge.tsx
- src/shared/components/VideoPlayer.tsx
- src/shared/types/common.ts
- src/shared/utils/chartTheme.ts
- src/shared/utils/cn.ts
- src/shared/utils/format.ts
- src/shared/utils/localSample.ts
- src/styles/globals.css

## README.md

``md
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
````

## package.json

``json
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
````

## index.html

``html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <title>Visual Authenticity Workbench</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## vite.config.ts

``ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
````

## tailwind.config.ts

``ts
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
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'data-flow': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'glitch-in': {
          '0%': { transform: 'translate(0)', opacity: '0' },
          '20%': { transform: 'translate(-2px, 1px)', opacity: '1' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '100%': { transform: 'translate(0)', opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'data-flow': 'data-flow 2.4s ease-in-out infinite',
        'glitch-in': 'glitch-in 0.45s ease-out',
      },
      boxShadow: {
        workstation: '0 18px 50px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
} satisfies Config;
````

## eslint.config.js

``js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  prettier,
);
````

## tsconfig.json

``json
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }]
}
````

## tsconfig.app.json

``json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
````

## tsconfig.node.json

``json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["vite.config.ts", "eslint.config.js"]
}
````

## public/demo-assets/demo-video.mp4

[binary or static asset]

## public/demo-assets/fake.jpg

[binary or static asset]

## public/demo-assets/fake_example.png

[binary or static asset]

## public/demo-assets/real.jpg

[binary or static asset]

## src/app/App.tsx

``tsx
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
````

## src/app/router.tsx

``tsx
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
````

## src/features/analysis/components/CandidateEvidencePanel.tsx

``tsx
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
````

## src/features/analysis/components/DetectionLogStream.tsx

``tsx
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
        <span className="text-[10px] text-forensic-stone/40">forensic@workstation:~/analysis$ tail -f vaw-detect.log</span>
        {isRunning && (
          <motion.span
            className="ml-auto text-forensic-gold"
            animate={prefersReduced ? undefined : { opacity: [1, 0.2, 1] }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.9, repeat: Infinity }}
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
        <div className="mt-1 flex items-center gap-1 text-forensic-gold/60">
          <span className="font-mono text-[10px]">$</span>
          <motion.span
            className="inline-block h-3 w-1.5 bg-forensic-gold"
            animate={prefersReduced ? undefined : { opacity: [1, 0, 1] }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.8, repeat: Infinity }}
          />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
````

## src/features/analysis/components/ExpertMeterPanel.tsx

``tsx
import { motion, useReducedMotion } from 'framer-motion';
import { genericExpertConfigs, targetedExpertConfigs } from '../data';
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
  const activeTargetedCount = targetedExpertConfigs.filter((expert) => expert.activated).length;

  return (
    <div className="space-y-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">GENERIC EXPERTS · 广域覆盖</span>
        <span className="font-mono text-[10px] tabular-nums text-forensic-stone/60">4 / 4 ACTIVE</span>
      </div>

      {genericExpertConfigs.map((expert) => {
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
            transition={isActive && !prefersReduced ? { duration: 1.2, repeat: Infinity } : { duration: 0.2 }}
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
                      transition={prefersReduced ? { duration: 0 } : { duration: 0.8, repeat: Infinity }}
                    />
                  )}
                  {isPending && <div className="h-2 w-2 rounded-full border border-forensic-stone/20 bg-graphite-800" />}
                </div>
                <span className="font-mono text-[11px] text-forensic-stone/60">{expert.icon}</span>
                <span className={`text-xs font-medium ${isPending ? 'text-forensic-stone/40' : 'text-forensic-text'}`}>
                  {expert.label}
                </span>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-forensic-stone/40">{expert.method}</span>
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

            {isDone && (
              <div className="mt-2 flex items-center justify-between rounded bg-graphite-900/50 px-2 py-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-forensic-stone/60">SHAPLEY · 贡献度</span>
                <span className="font-mono text-[11px] font-bold tabular-nums text-forensic-gold">
                  {(expert.shapley * 100).toFixed(1)}%
                </span>
              </div>
            )}
          </motion.button>
        );
      })}

      <div className="my-3 rounded border border-forensic-gold/10 bg-graphite-900/40 px-3 py-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-forensic-stone/50">GATING · 动态路由</div>
        <div className="mt-1 font-mono text-[10px] tabular-nums text-forensic-stone">
          G(x)ᵢ = x · W_g,ᵢ + Softmax(x · W_noise,ᵢ)
        </div>
        <div className="mt-1 text-[10px] text-forensic-stone/60">
          通用专家固定激活,专用专家由门控亲和度 + 高斯扰动动态匹配
        </div>
      </div>

      <div className="mb-2 mt-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">TARGETED EXPERTS · 靶向针对</span>
        <span className="font-mono text-[10px] tabular-nums text-forensic-stone/60">
          {activeTargetedCount} / {targetedExpertConfigs.length} ACTIVE
        </span>
      </div>
      <div className="space-y-2">
        {targetedExpertConfigs.map((expert) => (
          <div
            key={expert.id}
            className={`rounded-lg border p-2.5 ${
              expert.activated
                ? 'border-forensic-gold/30 bg-forensic-gold/[0.04]'
                : 'border-forensic-stone/10 bg-graphite-900/30 opacity-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${expert.activated ? 'bg-forensic-gold' : 'bg-forensic-stone/30'}`} />
              <span className={`text-xs font-medium ${expert.activated ? 'text-forensic-text' : 'text-forensic-stone/50'}`}>
                {expert.label}
              </span>
              <span className="ml-auto rounded border border-forensic-gold/20 bg-graphite-950 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-forensic-gold/70">
                {expert.adapter}
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] tabular-nums">
              <span className="text-forensic-stone/50">
                GATE: <span className="text-forensic-text">{expert.gateScore.toFixed(2)}</span>
              </span>
              {expert.activated && expert.shapley > 0 && (
                <span className="text-forensic-stone/50">
                  SHAPLEY: <span className="text-forensic-gold">{(expert.shapley * 100).toFixed(1)}%</span>
                </span>
              )}
              {!expert.activated && <span className="text-forensic-stone/40">未激活</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
````

## src/features/analysis/components/FusionVerdictPanel.tsx

``tsx
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { fusionEvidenceChips, genericExpertConfigs, targetedExpertConfigs } from '../data';

type FusionVerdictPanelProps = {
  isVisible: boolean;
  riskScore: number;
  onGenerateReport: () => void;
  onViewReport: () => void;
};

function AnimatedScore({ target, onComplete }: { target: number; onComplete: () => void }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1000;
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextDisplay = Math.round(eased * target);
      setDisplay(nextDisplay);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        onComplete();
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, onComplete]);

  return <span className="font-mono tabular-nums">{display}</span>;
}

export function FusionVerdictPanel({ isVisible, riskScore, onGenerateReport, onViewReport }: FusionVerdictPanelProps) {
  const prefersReduced = useReducedMotion();
  const [showPulse, setShowPulse] = useState(false);
  const riskLabel = riskScore >= 75 ? '高风险' : riskScore >= 50 ? '中风险' : '低风险';
  const riskColor = riskScore >= 75 ? '#C95A4A' : riskScore >= 50 ? '#D2A64A' : '#6F8F72';
  const englishLabel = riskLabel === '高风险' ? 'HIGH RISK' : riskLabel === '中风险' ? 'MEDIUM' : 'LOW RISK';
  const allContributors = [
    ...genericExpertConfigs.map((expert) => ({ label: expert.label, shapley: expert.shapley })),
    ...targetedExpertConfigs
      .filter((expert) => expert.activated)
      .map((expert) => ({ label: expert.label, shapley: expert.shapley })),
  ];
  const sortedContributors = allContributors.slice().sort((a, b) => b.shapley - a.shapley);
  const topContributor = sortedContributors[0]?.label ?? '语义专家';
  const circumference = 2 * Math.PI * 60;
  let cumulativeOffset = 0;

  const handleScoreComplete = useCallback(() => {
    if (prefersReduced) return;
    setShowPulse(true);
    window.setTimeout(() => setShowPulse(false), 3000);
  }, [prefersReduced]);

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
          <div className="mb-4 rounded-lg border border-forensic-gold/15 bg-graphite-900/40 p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-forensic-gold">SHAPLEY ATTRIBUTION · 专家贡献度</span>
              <span className="font-mono text-[10px] tabular-nums text-forensic-stone/60">{allContributors.length} CONTRIBUTORS</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-4">
              <div className="relative h-[140px] w-[140px]">
                <svg viewBox="0 0 140 140" className="-rotate-90">
                  <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
                  {allContributors.map((contributor, index) => {
                    const dashLength = contributor.shapley * circumference;
                    const offset = -cumulativeOffset;
                    cumulativeOffset += dashLength;
                    const hue = 35 + index * 18;

                    return (
                      <motion.circle
                        key={contributor.label}
                        cx="70"
                        cy="70"
                        r="60"
                        fill="none"
                        stroke={`hsl(${hue}, 50%, 55%)`}
                        strokeWidth="14"
                        strokeDasharray={`${dashLength} ${circumference}`}
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-forensic-stone/60">TOTAL</div>
                  <div className="font-mono text-xl font-bold tabular-nums text-forensic-text">100%</div>
                  <div className="font-mono text-[9px] tabular-nums text-forensic-stone/50">Σ Shapley</div>
                </div>
              </div>
              <div className="space-y-1.5">
                {sortedContributors.map((contributor, index) => {
                  const sourceIndex = allContributors.findIndex((item) => item.label === contributor.label);
                  const hue = 35 + sourceIndex * 18;

                  return (
                    <motion.div
                      key={contributor.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.08 }}
                      className="flex items-center gap-2 text-[11px]"
                    >
                      <span className="h-2 w-2 flex-shrink-0 rounded-sm" style={{ background: `hsl(${hue}, 50%, 55%)` }} />
                      <span className="flex-1 truncate text-forensic-text">{contributor.label}</span>
                      <span className="font-mono tabular-nums text-forensic-gold">{(contributor.shapley * 100).toFixed(1)}%</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="mt-3 border-t border-forensic-gold/10 pt-2 text-[10px] text-forensic-stone/60">
              主导专家:
              <span className="ml-1 font-mono text-forensic-gold">{topContributor}</span>
              <span> · 关键依据:几何/透视/边界异常证据贡献最高</span>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-forensic-stone/60">FUSION VERDICT</p>
              <motion.p
                className="mt-1 font-mono text-2xl font-bold"
                style={{ color: riskColor }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              >
                {englishLabel}
              </motion.p>
              <p className="mt-0.5 text-xs text-forensic-stone">{riskLabel}</p>
            </div>
            <div className="relative h-20 w-20">
              {showPulse && <div className="animate-pulse-ring absolute -inset-2 rounded-full border-2" style={{ borderColor: riskColor }} />}
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
                  <AnimatedScore target={riskScore} onComplete={handleScoreComplete} />
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
              className="group relative flex-1 overflow-hidden rounded-lg py-2.5 text-sm font-medium text-graphite-950"
              style={{ background: 'linear-gradient(135deg, #B88A44, #D2A64A)' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGenerateReport}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
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
````

## src/features/analysis/components/ImageScanCanvas.tsx

``tsx
import { useEffect, useRef, useState } from 'react';
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
  const [flashTrigger, setFlashTrigger] = useState(0);
  const prevPhaseRef = useRef(activePhase);
  const isSweeping = activePhase === 'scan-sweep';
  const showRegions = ['expert-spatial', 'expert-frequency', 'expert-style', 'expert-semantic', 'fusion', 'complete'].includes(activePhase);

  useEffect(() => {
    if (prevPhaseRef.current === 'scan-sweep' && activePhase !== 'scan-sweep') {
      setFlashTrigger((current) => current + 1);
    }
    prevPhaseRef.current = activePhase;
  }, [activePhase]);

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
            transition={prefersReduced ? { duration: 0 } : { duration: 1.6, ease: 'linear', repeat: Infinity }}
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
        {flashTrigger > 0 && (
          <motion.div
            key={`flash-${flashTrigger}`}
            className="pointer-events-none absolute inset-0 z-[25] bg-forensic-text"
            initial={{ opacity: 0.18 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

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
                  transition={!isSelected && !prefersReduced ? { duration: 2.5, repeat: Infinity } : { duration: 0.2 }}
                />
                <div className="absolute left-0 top-0 h-2.5 w-2.5" style={{ borderLeft: `2px solid ${riskColor}`, borderTop: `2px solid ${riskColor}` }} />
                <div className="absolute right-0 top-0 h-2.5 w-2.5" style={{ borderRight: `2px solid ${riskColor}`, borderTop: `2px solid ${riskColor}` }} />
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
            className="absolute right-4 top-4 z-40 overflow-hidden rounded-lg"
            initial={{ scale: 0.7, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.15 }}
            style={{
              background: 'linear-gradient(135deg, rgba(201,90,74,0.18), rgba(201,90,74,0.08))',
              border: '1.5px solid rgba(201,90,74,0.7)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(201,90,74,0.25)',
            }}
          >
            <div className="border-b border-forensic-risk/30 bg-forensic-risk/15 px-3 py-1">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-forensic-risk">FORENSIC VERDICT</div>
            </div>
            <div className="px-3 py-2">
              <div className="font-mono text-sm font-bold uppercase tracking-wide text-forensic-risk">AI-GENERATED</div>
              <div className="mt-0.5 flex items-baseline gap-1 font-mono tabular-nums">
                <span className="text-xs text-forensic-stone">CONFIDENCE</span>
                <span className="text-base font-bold text-forensic-risk">{riskScore}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
````

## src/features/analysis/components/SemanticChainPanel.tsx

``tsx
import { CheckCircle2, Lock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SemanticStep } from '../types';
import type { PhaseId } from '../hooks/useDetectionPhases';
import { SemanticStepCard } from './SemanticStepCard';

type SemanticChainPanelProps = {
  steps: SemanticStep[];
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
      <div className="grid gap-2 rounded-lg border border-forensic-gold/[0.08] bg-graphite-900 p-3 text-[11px] md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className="flex items-center gap-2">
          <span className="font-mono tabular-nums text-forensic-gold">[CLIP]</span>
          <span className="text-forensic-stone">全局语义浓缩</span>
        </div>
        <span className="hidden text-forensic-gold/50 md:block">→</span>
        <div className="flex items-center gap-2">
          <span className="font-mono tabular-nums text-forensic-gold">[Grounding DINO]</span>
          <span className="text-forensic-stone">局部一致性校验</span>
        </div>
        <span className="hidden text-forensic-gold/50 md:block">→</span>
        <div className="flex items-center gap-2">
          <span className="font-mono tabular-nums text-forensic-gold">[ConceptNet + LLM]</span>
          <span className="text-forensic-stone">双分支逻辑校验</span>
        </div>
      </div>
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
                  transition={processing && !prefersReduced ? { duration: 1.1, repeat: Infinity } : { duration: 0.2 }}
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
````

## src/features/analysis/components/SemanticStepCard.tsx

``tsx
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

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.22 },
  }),
};

const methodLabels: Record<string, string> = {
  global: 'CLIP · Zero-Shot Classification',
  local: 'Grounding DINO · Open-Vocabulary Detection',
  logic: 'ConceptNet ⊕ LLM · Dual-Branch Verification',
};

function MethodTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-forensic-gold/30 bg-forensic-gold/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">
      {children}
    </span>
  );
}

function GlobalSemanticView({ step }: { step: SemanticStep }) {
  return (
    <div className="space-y-2">
      {step.sceneCandidates?.map((candidate, index) => (
        <motion.div key={candidate.name} custom={index} initial="hidden" animate="visible" variants={rowVariants}>
          <div className="mb-1 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className={candidate.selected ? 'font-semibold text-forensic-gold' : 'text-forensic-stone'}>
                {candidate.name}
              </span>
              {candidate.selected && (
                <span className="rounded border border-forensic-gold/30 bg-forensic-gold/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-forensic-gold">
                  SELECTED
                </span>
              )}
            </div>
            <span className={`font-mono tabular-nums ${candidate.selected ? 'text-forensic-gold' : 'text-forensic-stone'}`}>
              {candidate.score.toFixed(2)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-graphite-800">
            <motion.div
              className={`h-full rounded-full ${candidate.selected ? 'bg-forensic-gold' : 'bg-forensic-stone/35'}`}
              initial={{ width: '0%' }}
              animate={{ width: `${candidate.score * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.45, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function LocalConsistencyView({ step }: { step: SemanticStep }) {
  return (
    <div className="grid gap-3 md:grid-cols-[160px_1fr]">
      <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3">
        <p className="mb-3 text-xs font-medium text-forensic-text">实体列表</p>
        <div className="space-y-2">
          {step.entities?.map((entity, index) => (
            <motion.div
              key={entity.name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={rowVariants}
              className="flex items-center gap-2 text-xs"
            >
              <span
                className={`h-1.5 w-1.5 border ${
                  entity.outlier ? 'border-forensic-risk bg-forensic-risk/20' : 'border-forensic-olive bg-forensic-olive/20'
                }`}
              />
              <span className={entity.outlier ? 'font-semibold text-forensic-risk' : 'text-forensic-stone'}>
                {entity.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="space-y-2 rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3">
        {step.entities?.map((entity, index) => (
          <motion.div
            key={entity.name}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={rowVariants}
            className="flex items-center justify-between gap-3 rounded border border-forensic-gold/[0.06] bg-graphite-850 px-3 py-2 text-xs"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${entity.outlier ? 'bg-forensic-risk' : 'bg-forensic-olive'}`} />
              <span className={entity.outlier ? 'font-semibold text-forensic-risk' : 'text-forensic-text'}>
                {entity.name}
              </span>
              {entity.outlier && (
                <span className="rounded border border-forensic-risk/35 bg-forensic-risk/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-forensic-risk">
                  OUTLIER
                </span>
              )}
            </div>
            <span className={`font-mono tabular-nums ${entity.outlier ? 'text-forensic-risk' : 'text-forensic-olive'}`}>
              d={entity.distance.toFixed(2)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LogicVerificationView({ step }: { step: SemanticStep }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">Knowledge Graph (ConceptNet)</p>
          <div className="space-y-2">
            {step.triplets?.map((triplet, index) => (
              <motion.div key={`${triplet.h}-${triplet.r}-${triplet.t}`} custom={index} initial="hidden" animate="visible" variants={rowVariants} className="rounded bg-graphite-850 p-2 text-xs">
                <p className="text-forensic-text">⟨{triplet.h}, {triplet.r}, {triplet.t}⟩</p>
                <p className="mt-1 font-mono tabular-nums text-forensic-warning">E_KG = {triplet.kgEnergy.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-forensic-gold">LLM Reasoning</p>
          <div className="space-y-2">
            {step.triplets?.map((triplet, index) => (
              <motion.div key={`${triplet.h}-${triplet.r}-llm`} custom={index} initial="hidden" animate="visible" variants={rowVariants} className="rounded bg-graphite-850 p-2 text-xs">
                <p className="text-forensic-stone">{triplet.h} 与 {triplet.t} 的关系存在常识违和。</p>
                <p className="mt-1 font-mono tabular-nums text-forensic-risk">E_LLM = {triplet.llmScore.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <motion.div custom={2} initial="hidden" animate="visible" variants={rowVariants} className="rounded-md border border-forensic-gold/20 bg-forensic-gold/5 p-3">
        <p className="font-mono text-xs tabular-nums text-forensic-gold">
          P_final = Sigmoid(α · E_KG + β · E_LLM)
        </p>
        <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px] tabular-nums">
          <span className="rounded border border-forensic-gold/[0.08] bg-graphite-900 px-2 py-1 text-forensic-stone">α={step.alpha?.toFixed(1)}</span>
          <span className="rounded border border-forensic-gold/[0.08] bg-graphite-900 px-2 py-1 text-forensic-stone">β={step.beta?.toFixed(1)}</span>
          <span className="rounded border border-forensic-gold/[0.08] bg-graphite-900 px-2 py-1 text-forensic-warning">E_KG={step.eKG?.toFixed(2)}</span>
          <span className="rounded border border-forensic-gold/[0.08] bg-graphite-900 px-2 py-1 text-forensic-risk">E_LLM={step.eLLM?.toFixed(2)}</span>
          <span className="rounded border border-forensic-gold/30 bg-forensic-gold/10 px-2 py-1 text-forensic-gold">→ P_final=0.93</span>
        </div>
      </motion.div>
    </div>
  );
}

function StepBody({ step }: { step: SemanticStep }) {
  if (step.id === 'global') return <GlobalSemanticView step={step} />;
  if (step.id === 'local') return <LocalConsistencyView step={step} />;
  if (step.id === 'logic') return <LogicVerificationView step={step} />;
  return null;
}

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
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-forensic-gold/40 bg-forensic-gold/10 font-mono text-xs tabular-nums text-forensic-gold">
            {index + 1}
          </span>
          <div>
            <h3 className="font-semibold">{step.name}</h3>
            <p className="mt-1 text-xs text-forensic-stone">{step.method}</p>
          </div>
        </div>
        <StatusBadge tone={toneForStatus(step.status)}>{statusLabel(step.status)}</StatusBadge>
      </div>

      <div className="mb-4">
        <MethodTag>{methodLabels[step.id] ?? step.method ?? 'Semantic Reasoning'}</MethodTag>
      </div>

      <div className="mb-4 grid gap-2 text-sm text-forensic-stone">
        <p>
          <span className="text-forensic-text">输入证据：</span>
          {step.input}
        </p>
        <p>
          <span className="text-forensic-text">中间结果：</span>
          {step.result}
        </p>
      </div>

      <StepBody step={step} />

      <p className="mt-4 text-xs leading-6 text-forensic-stone">
        <span className="text-forensic-text">解释文本：</span>
        {step.explanation}
      </p>
    </motion.button>
  );
}
````

## src/features/analysis/data.ts

``ts
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
````

## src/features/analysis/hooks/useDetectionPhases.ts

``ts
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
````

## src/features/analysis/types.ts

``ts
export type SemanticStep = {
  id: string;
  name: string;
  method?: string;
  status: string;
  input: string;
  result: string;
  explanation: string;
  lockedUntilPhase?: string;
  sceneCandidates?: {
    name: string;
    score: number;
    selected?: boolean;
  }[];
  entities?: {
    name: string;
    distance: number;
    outlier: boolean;
  }[];
  triplets?: {
    h: string;
    r: string;
    t: string;
    kgEnergy: number;
    llmScore: number;
  }[];
  alpha?: number;
  beta?: number;
  eKG?: number;
  eLLM?: number;
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
  method: string;
  icon: string;
  riskScore: number;
  findings: string[];
  shapley: number;
};
````

## src/features/annotation/components/AnnotationLogStream.tsx

``tsx
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type AnnotationLogStreamProps = {
  lines: string[];
  isRunning: boolean;
  isComplete: boolean;
};

function lineColor(line: string) {
  if (line.startsWith('[WARN]')) return 'text-forensic-warning';
  if (line.startsWith('[OK]')) return 'text-forensic-olive';
  if (line.startsWith('[CLUE]')) return 'text-forensic-gold';
  if (line.startsWith('[SAVE]')) return 'text-forensic-olive';
  return 'text-forensic-stone';
}

export function AnnotationLogStream({ lines, isRunning, isComplete }: AnnotationLogStreamProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div
      className="overflow-y-auto rounded-lg border border-forensic-gold/10 bg-graphite-950 p-3 font-mono text-[11px] leading-relaxed"
      style={{ height: '140px', scrollbarWidth: 'thin' }}
    >
      <div className="mb-2 flex items-center gap-2 border-b border-forensic-gold/10 pb-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-forensic-risk/70" />
          <span className="h-2 w-2 rounded-full bg-forensic-warning/70" />
          <span className="h-2 w-2 rounded-full bg-forensic-olive/70" />
        </div>
        <span className="text-forensic-stone/50">vaw-annotate.log</span>
        {isRunning && (
          <motion.span
            className="ml-auto text-forensic-gold"
            animate={prefersReduced ? undefined : { opacity: [1, 0.2, 1] }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.9, repeat: Infinity }}
          >
            ●
          </motion.span>
        )}
        {isComplete && !isRunning && <span className="ml-auto text-[10px] text-forensic-olive">● 完成</span>}
      </div>

      {lines.length === 0 && <span className="text-forensic-stone/30">等待标注启动...</span>}

      <AnimatePresence initial={false}>
        {lines.map((line, index) => (
          <motion.div
            key={`${line}-${index}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`${lineColor(line)} block`}
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
          transition={prefersReduced ? { duration: 0 } : { duration: 0.7, repeat: Infinity }}
        >
          █
        </motion.span>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
````

## src/features/annotation/components/AnnotationResultPanel.tsx

``tsx
import { motion, useReducedMotion } from 'framer-motion';
import type { EvidenceSample, FakeRegion } from '../../samples/types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, toneForStatus } from '../../../shared/utils/format';

type AnnotationResultPanelProps = {
  sample: EvidenceSample;
  selectedRegion?: FakeRegion;
  running: boolean;
  reviewed: boolean;
  onRun: () => void;
  onReview: () => void;
  onSendToAnalysis: () => void;
};

export function AnnotationResultPanel({
  sample,
  selectedRegion,
  running,
  reviewed,
  onRun,
  onReview,
  onSendToAnalysis,
}: AnnotationResultPanelProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-forensic-gold">自动标注结果</p>
        <h3 className="mt-1 text-lg font-semibold">{sample.id}</h3>
      </div>

      <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-4">
        <p className="text-xs text-forensic-stone">生成提示词或推断提示词</p>
        <p className="mt-2 text-sm leading-6">{sample.prompt}</p>
      </div>

      {!selectedRegion && running && (
        <motion.div
          className="rounded-md border border-forensic-gold/20 bg-forensic-gold/5 p-4"
          animate={prefersReduced ? undefined : { borderColor: ['rgba(184,138,68,0.15)', 'rgba(184,138,68,0.35)', 'rgba(184,138,68,0.15)'] }}
          transition={prefersReduced ? { duration: 0 } : { duration: 1.2, repeat: Infinity }}
        >
          <div className="flex items-center gap-3 text-xs text-forensic-stone">
            <motion.div
              className="h-2 w-2 rounded-full bg-forensic-gold"
              animate={prefersReduced ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.8, repeat: Infinity }}
            />
            正在扫描图像，发现候选区域...
          </div>
        </motion.div>
      )}

      {selectedRegion && (
        <div className="rounded-md border border-forensic-gold/35 bg-forensic-gold/10 p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold">
                {selectedRegion.id} · {selectedRegion.label}
              </p>
              <p className="mt-1 text-xs text-forensic-stone">{selectedRegion.type}</p>
            </div>
            <StatusBadge tone={reviewed ? 'success' : toneForStatus(selectedRegion.reviewStatus)}>
              {reviewed ? '已复核' : statusLabel(selectedRegion.reviewStatus)}
            </StatusBadge>
          </div>
          <p className="mb-3 text-sm leading-6 text-forensic-stone">{selectedRegion.clue}</p>
          <ScoreBar label="置信度分数" value={selectedRegion.confidence} tone="warning" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={onRun}
          className="rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
        >
          {running ? '正在处理' : '运行自动标注'}
        </button>
        <button
          type="button"
          onClick={onReview}
          className="rounded-md border border-forensic-olive/40 bg-forensic-olive/10 px-4 py-2 text-sm font-medium text-forensic-olive"
        >
          标记为已复核
        </button>
        <button
          type="button"
          onClick={onSendToAnalysis}
          className="rounded-md border border-forensic-gold/30 bg-forensic-gold/10 px-4 py-2 text-center text-sm font-medium text-forensic-gold"
        >
          发送到分析
        </button>
      </div>
    </div>
  );
}
````

## src/features/annotation/components/FakeRegionOverlay.tsx

``tsx
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { FakeRegion } from '../../samples/types';

type FakeRegionOverlayProps = {
  regions: FakeRegion[];
  selectedId: string;
  onSelect: (id: string) => void;
  visibleCount?: number;
  staggerReveal?: boolean;
};

function confidenceColor(confidence: number) {
  if (confidence >= 75) return { border: 'rgba(201,90,74,0.7)', bg: 'rgba(201,90,74,0.08)', text: '#C95A4A' };
  if (confidence >= 60) return { border: 'rgba(210,166,74,0.7)', bg: 'rgba(210,166,74,0.08)', text: '#D2A64A' };
  return { border: 'rgba(111,143,114,0.7)', bg: 'rgba(111,143,114,0.08)', text: '#6F8F72' };
}

export function FakeRegionOverlay({
  regions,
  selectedId,
  onSelect,
  visibleCount,
  staggerReveal = false,
}: FakeRegionOverlayProps) {
  const prefersReduced = useReducedMotion();
  const count = visibleCount ?? regions.length;
  const visibleRegions = regions.slice(0, count);

  return (
    <AnimatePresence>
      {visibleRegions.map((region, index) => {
        const isSelected = selectedId === region.id;
        const colors = confidenceColor(region.confidence);

        return (
          <motion.button
            type="button"
            key={region.id}
            className="absolute cursor-pointer"
            style={{
              left: `${region.x}%`,
              top: `${region.y}%`,
              width: `${region.width}%`,
              height: `${region.height}%`,
            }}
            initial={staggerReveal ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={staggerReveal ? { delay: index * 0.22, duration: 0.35, ease: 'easeOut' } : { duration: 0.2 }}
            onClick={() => onSelect(region.id)}
          >
            <motion.div
              className="absolute inset-0 rounded"
              style={{
                border: `1.5px solid ${colors.border}`,
                backgroundColor: isSelected ? colors.border.replace('0.7', '0.18') : colors.bg,
              }}
              animate={
                !isSelected && !prefersReduced
                  ? {
                      borderColor: [colors.border, colors.border.replace('0.7', '0.25'), colors.border],
                    }
                  : undefined
              }
              transition={!isSelected && !prefersReduced ? { duration: 2.5, repeat: Infinity } : { duration: 0.2 }}
            />

            <div className="absolute left-0 top-0 h-2.5 w-2.5" style={{ borderLeft: `2px solid ${colors.text}`, borderTop: `2px solid ${colors.text}` }} />
            <div className="absolute right-0 top-0 h-2.5 w-2.5" style={{ borderRight: `2px solid ${colors.text}`, borderTop: `2px solid ${colors.text}` }} />
            <div className="absolute bottom-0 left-0 h-2.5 w-2.5" style={{ borderBottom: `2px solid ${colors.text}`, borderLeft: `2px solid ${colors.text}` }} />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5" style={{ borderBottom: `2px solid ${colors.text}`, borderRight: `2px solid ${colors.text}` }} />

            <motion.div
              className="absolute -top-5 left-0 flex items-center gap-1 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: 'rgba(17,19,21,0.92)',
                color: colors.text,
                border: `1px solid ${colors.border.replace('0.7', '0.35')}`,
              }}
              initial={staggerReveal ? { opacity: 0, y: 4 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: staggerReveal ? index * 0.22 + 0.15 : 0 }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors.text }} />
              {region.id}
              <span className="text-forensic-stone/60">·</span>
              {region.type}
            </motion.div>

            {isSelected && (
              <motion.div
                className="absolute -bottom-5 right-0 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10px] tabular-nums"
                style={{
                  backgroundColor: 'rgba(17,19,21,0.92)',
                  color: colors.text,
                  border: `1px solid ${colors.border.replace('0.7', '0.35')}`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {region.confidence}%
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </AnimatePresence>
  );
}
````

## src/features/annotation/components/ImageAnnotationCanvas.tsx

``tsx
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { EvidenceSample } from '../../samples/types';
import { EmptyAssetPlaceholder } from '../../../shared/components/EmptyAssetPlaceholder';
import { FakeRegionOverlay } from './FakeRegionOverlay';

type ImageAnnotationCanvasProps = {
  sample: EvidenceSample;
  selectedRegionId: string;
  onSelectRegion: (id: string) => void;
  imageSrc?: string | null;
  annotationPhase: number;
  isRunning: boolean;
  isComplete: boolean;
};

export function ImageAnnotationCanvas({
  sample,
  selectedRegionId,
  onSelectRegion,
  imageSrc,
  annotationPhase,
  isRunning,
  isComplete,
}: ImageAnnotationCanvasProps) {
  const prefersReduced = useReducedMotion();
  const resolvedImageSrc = imageSrc ?? sample.assetSrc;
  const showRegions = annotationPhase >= 2 || isComplete;
  const visibleCount = isComplete || annotationPhase >= 3 ? sample.regions.length : annotationPhase === 2 ? sample.regions.length : 0;
  const isSweeping = isRunning && annotationPhase === 1;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-900">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(135deg,rgba(184,138,68,.12)_1px,transparent_1px)] [background-size:18px_18px]" />

      {resolvedImageSrc ? (
        <motion.img
          src={resolvedImageSrc}
          alt="导入样本"
          className="h-full w-full object-contain"
          animate={{
            opacity: annotationPhase === 0 && isRunning ? [0.6, 1] : 0.9,
            filter: isSweeping ? 'brightness(0.8)' : 'brightness(1)',
          }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <EmptyAssetPlaceholder label={sample.id} detail="本地视觉占位，叠加候选证据区域" />
      )}

      <AnimatePresence>
        {isSweeping && (
          <motion.div
            key="annotation-scan-line"
            className="pointer-events-none absolute left-0 right-0 z-20"
            style={{ height: '2px' }}
            initial={{ top: '0%' }}
            animate={prefersReduced ? undefined : { top: '100%' }}
            exit={{ opacity: 0 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 1.4, ease: 'linear', repeat: Infinity }}
          >
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #B88A44, rgba(184,138,68,0.5), #B88A44, transparent)',
                boxShadow: '0 0 10px 3px rgba(184,138,68,0.35)',
              }}
            />
            <div
              className="absolute w-full"
              style={{
                height: '32px',
                top: '-32px',
                background: 'linear-gradient(to top, rgba(184,138,68,0.07), transparent)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isSweeping && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(184,138,68,0.025) 4px)',
          }}
        />
      )}

      {showRegions && (
        <FakeRegionOverlay
          regions={sample.regions}
          selectedId={selectedRegionId}
          onSelect={onSelectRegion}
          visibleCount={visibleCount}
          staggerReveal={annotationPhase === 2}
        />
      )}

      <AnimatePresence>
        {isComplete && (
          <motion.div
            key="annotation-complete"
            className="absolute right-3 top-3 z-40 flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{
              background: 'rgba(111,143,114,0.15)',
              border: '1.5px solid rgba(111,143,114,0.5)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ scale: 0.6, opacity: 0, rotate: 6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.2 }}
          >
            <span className="text-xs font-bold tracking-widest text-forensic-olive">标注完成</span>
            <span className="text-sm font-bold tabular-nums text-forensic-olive">{sample.regions.length} 区域</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRunning && (
          <motion.div
            key="phase-indicator"
            className="absolute bottom-3 left-3 z-40 flex items-center gap-2 rounded-md px-2.5 py-1 text-[11px] font-medium"
            style={{
              background: 'rgba(17,19,21,0.85)',
              border: '1px solid rgba(184,138,68,0.25)',
              backdropFilter: 'blur(6px)',
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-forensic-gold"
              animate={prefersReduced ? undefined : { opacity: [1, 0.3, 1] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.8, repeat: Infinity }}
            />
            <span className="text-forensic-gold">
              {annotationPhase === 0 && '读取中...'}
              {annotationPhase === 1 && '扫描中...'}
              {annotationPhase === 2 && '生成线索...'}
              {annotationPhase === 3 && '固化结果...'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
````

## src/features/annotation/components/KeyframeStrip.tsx

``tsx
import { motion } from 'framer-motion';

export type KeyframeItem = {
  id: string;
  src?: string;
  timeLabel?: string;
};

type KeyframeStripProps = {
  frames?: string[] | KeyframeItem[];
  selectedFrame?: string;
  onSelect?: (frame: string) => void;
  visibleCount?: number;
};

export function KeyframeStrip({ frames, selectedFrame, onSelect, visibleCount }: KeyframeStripProps) {
  const frameList = (frames ?? Array.from({ length: 6 }, (_, index) => `KF-${String(index + 1).padStart(2, '0')}`)).map((frame) =>
    typeof frame === 'string' ? { id: frame } : frame,
  );
  const count = visibleCount ?? frameList.length;

  return (
    <div className="grid grid-cols-6 gap-2">
      {frameList.map((frame, index) => {
        const isRevealed = index < count;
        const isSelected = selectedFrame === frame.id;

        if (!isRevealed) {
          return (
            <div key={frame.id} className="aspect-video rounded border border-forensic-stone/10 bg-graphite-900/50 p-2">
              <div className="h-full rounded-sm bg-graphite-950/50" />
              <p className="mt-1 text-[10px] text-forensic-stone/20">{frame.id}</p>
            </div>
          );
        }

        return (
          <motion.button
            type="button"
            key={frame.id}
            onClick={() => onSelect?.(frame.id)}
            className={`aspect-video rounded border bg-graphite-850 p-2 text-left transition-colors ${
              isSelected ? 'border-forensic-gold' : 'border-forensic-gold/[0.08] hover:border-forensic-gold/30'
            }`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.25, ease: 'easeOut' }}
          >
            {frame.src ? (
              <img src={frame.src} alt={frame.id} className="h-full w-full rounded-sm object-cover" />
            ) : (
              <div
                className={`h-full rounded-sm [background-image:linear-gradient(45deg,rgba(111,143,114,.24)_1px,transparent_1px)] [background-size:12px_12px] ${
                  isSelected ? 'bg-forensic-gold/5' : 'bg-graphite-950'
                }`}
              />
            )}
            <p className={`mt-1 flex justify-between gap-1 text-[10px] ${isSelected ? 'text-forensic-gold' : 'text-forensic-stone'}`}>
              <span>{frame.id}</span>
              {frame.timeLabel && <span className="font-mono tabular-nums text-forensic-stone/60">{frame.timeLabel}</span>}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
````

## src/features/annotation/components/RegionClueList.tsx

``tsx
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { FakeRegion } from '../../samples/types';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, toneForStatus } from '../../../shared/utils/format';

type RegionClueListProps = {
  regions: FakeRegion[];
  selectedId: string;
  onSelect: (id: string) => void;
  visibleCount?: number;
  isRunning?: boolean;
};

function AnimatedBar({ value, color }: { value: number; color: string }) {
  const [width, setWidth] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setWidth(value);
      return undefined;
    }
    const timer = window.setTimeout(() => setWidth(value), 80);
    return () => window.clearTimeout(timer);
  }, [value, prefersReduced]);

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-graphite-800">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: '0%' }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
    </div>
  );
}

function scoreColor(confidence: number): string {
  if (confidence >= 75) return '#C95A4A';
  if (confidence >= 60) return '#D2A64A';
  return '#6F8F72';
}

export function RegionClueList({ regions, selectedId, onSelect, visibleCount, isRunning = false }: RegionClueListProps) {
  const count = visibleCount ?? regions.length;
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-3">
      {regions.map((region, index) => {
        const isVisible = index < count;
        const isSelected = selectedId === region.id;
        const color = scoreColor(region.confidence);

        if (!isVisible) {
          return (
            <div key={region.id} className="flex items-center gap-2 rounded-md border border-forensic-stone/10 bg-graphite-900/40 p-4">
              {isRunning && (
                <motion.div
                  className="h-2 w-2 rounded-full bg-forensic-gold/40"
                  animate={prefersReduced ? undefined : { opacity: [0.4, 1, 0.4] }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 1.2, repeat: Infinity, delay: index * 0.3 }}
                />
              )}
              <span className="text-xs text-forensic-stone/30">{isRunning ? '扫描中...' : '待发现'}</span>
            </div>
          );
        }

        return (
          <motion.button
            type="button"
            key={region.id}
            onClick={() => onSelect(region.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.3, ease: 'easeOut' }}
            className={`rounded-md border p-4 text-left transition-colors ${
              isSelected
                ? 'border-forensic-warning bg-forensic-warning/10'
                : 'border-forensic-gold/[0.08] bg-graphite-850 hover:border-forensic-gold/35'
            }`}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  {region.id} · {region.label}
                </p>
                <p className="mt-1 text-xs text-forensic-stone">{region.type}</p>
              </div>
              <StatusBadge tone={toneForStatus(region.reviewStatus)}>{statusLabel(region.reviewStatus)}</StatusBadge>
            </div>
            <p className="mb-3 text-sm leading-6 text-forensic-stone">{region.clue}</p>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-forensic-stone">
                <span>区域置信度</span>
                <motion.span
                  className="font-mono tabular-nums"
                  style={{ color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.12 + 0.4 }}
                >
                  {region.confidence}%
                </motion.span>
              </div>
              <AnimatedBar value={region.confidence} color={color} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
````

## src/features/annotation/components/SegmentPanel.tsx

``tsx
import type { VideoSegmentEvidence } from '../../samples/types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, toneForStatus } from '../../../shared/utils/format';

type SegmentPanelProps = {
  segment: VideoSegmentEvidence;
  running: boolean;
  reviewed: boolean;
  onRun: () => void;
  onReview: () => void;
};

export function SegmentPanel({ segment, running, reviewed, onRun, onReview }: SegmentPanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-forensic-gold">片段标注</p>
        <h3 className="mt-1 text-lg font-semibold">
          {segment.id} · {segment.label}
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded border border-forensic-gold/[0.08] bg-graphite-850 p-3">
          <p className="text-xs text-forensic-stone">开始时间</p>
          <p className="mt-1">{segment.start}</p>
        </div>
        <div className="rounded border border-forensic-gold/[0.08] bg-graphite-850 p-3">
          <p className="text-xs text-forensic-stone">结束时间</p>
          <p className="mt-1">{segment.end}</p>
        </div>
      </div>
      <p className="text-sm leading-6 text-forensic-stone">{segment.clue}</p>
      <ScoreBar label="片段风险分数" value={segment.riskScore} tone="warning" />
      <StatusBadge tone={reviewed ? 'success' : toneForStatus(segment.reviewStatus)}>
        {reviewed ? '已复核' : statusLabel(segment.reviewStatus)}
      </StatusBadge>
      <div className="grid gap-2">
        <button
          type="button"
          onClick={onRun}
          className="rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
        >
          {running ? '正在处理' : '运行自动标注'}
        </button>
        <button
          type="button"
          onClick={onReview}
          className="rounded-md border border-forensic-olive/40 bg-forensic-olive/10 px-4 py-2 text-sm font-medium text-forensic-olive"
        >
          标记片段已复核
        </button>
      </div>
    </div>
  );
}
````

## src/features/annotation/components/VideoTimeline.tsx

``tsx
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { VideoSegmentEvidence } from '../../samples/types';

type VideoTimelineProps = {
  segments: VideoSegmentEvidence[];
  selectedId: string;
  onSelect: (id: string) => void;
  visibleCount?: number;
  isScanning?: boolean;
  scanProgress?: number;
  durationSeconds?: number;
};

function parseTimecode(value: string) {
  const parts = value.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return Number(value) || 0;
}

function formatTick(seconds: number) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remaining = Math.round(safeSeconds - minutes * 60);
  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

export function VideoTimeline({
  segments,
  selectedId,
  onSelect,
  visibleCount,
  isScanning = false,
  scanProgress = 0,
  durationSeconds = 30,
}: VideoTimelineProps) {
  const prefersReduced = useReducedMotion();
  const count = visibleCount ?? segments.length;
  const totalDuration = Number.isFinite(durationSeconds) && durationSeconds > 0 ? durationSeconds : 30;
  const ticks = [0, totalDuration / 3, (totalDuration / 3) * 2, totalDuration];

  return (
    <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-950 p-4">
      <div className="mb-3 flex justify-between text-xs text-forensic-stone">
        {ticks.map((tick) => (
          <span key={tick}>{formatTick(tick)}</span>
        ))}
      </div>

      <div className="relative h-16 overflow-hidden rounded bg-graphite-850">
        <div className="absolute inset-x-0 top-1/2 h-px bg-graphite-800" />
        <div className="absolute bottom-0 left-[37%] top-0 w-px bg-forensic-gold/40" />

        <AnimatePresence>
          {isScanning && (
            <motion.div
              key="scan-progress"
              className="absolute bottom-0 top-0 z-10 w-0.5"
              style={{ backgroundColor: '#B88A44', boxShadow: '0 0 8px rgba(184,138,68,0.6)' }}
              initial={{ left: '0%' }}
              animate={prefersReduced ? undefined : { left: `${scanProgress}%` }}
              transition={{ duration: 0.4, ease: 'linear' }}
            >
              <div
                className="absolute inset-y-0 right-0"
                style={{
                  width: `${scanProgress * 0.4}px`,
                  background: 'linear-gradient(to left, rgba(184,138,68,0.15), transparent)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isScanning && (
          <motion.div
            className="absolute bottom-0 left-0 top-0 z-0"
            style={{ background: 'rgba(184,138,68,0.04)' }}
            animate={{ width: `${scanProgress}%` }}
            transition={{ duration: 0.4, ease: 'linear' }}
          />
        )}

        {segments.map((segment, index) => {
          const isVisible = index < count;
          const isSelected = selectedId === segment.id;
          const start = parseTimecode(segment.start);
          const end = parseTimecode(segment.end);
          const left = Math.max(0, Math.min((start / totalDuration) * 100, 98));
          const width = Math.max(5, Math.min(((end - start) / totalDuration) * 100, 100 - left));

          if (!isVisible) {
            return (
              <motion.div
                key={`pending-${segment.id}`}
                className="absolute top-4 h-8 rounded border border-dashed border-forensic-stone/20 bg-transparent"
                style={{ left: `${left}%`, width: `${width}%` }}
                animate={
                  isScanning && !prefersReduced
                    ? {
                        borderColor: ['rgba(168,162,154,0.2)', 'rgba(184,138,68,0.3)', 'rgba(168,162,154,0.2)'],
                      }
                    : undefined
                }
                transition={isScanning && !prefersReduced ? { duration: 1.5, repeat: Infinity, delay: index * 0.4 } : { duration: 0.2 }}
              />
            );
          }

          return (
            <motion.button
              type="button"
              key={segment.id}
              whileHover={{ y: -2 }}
              onClick={() => onSelect(segment.id)}
              className={`absolute top-4 h-8 rounded border px-2 text-xs ${
                isSelected
                  ? 'border-forensic-risk bg-forensic-risk/20 text-forensic-risk'
                  : 'border-forensic-warning/50 bg-forensic-warning/15 text-forensic-warning'
              }`}
              style={{ left: `${left}%`, width: `${width}%` }}
              initial={{ opacity: 0, scaleY: 0.5 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: index * 0.18, duration: 0.3, ease: 'easeOut' }}
            >
              <span className="flex h-full items-center gap-1 truncate">
                <span className="font-medium">{segment.id}</span>
                <span className="opacity-70">·</span>
                <motion.span className="font-mono tabular-nums" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.18 + 0.2 }}>
                  {segment.riskScore}%
                </motion.span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-3 text-[10px] text-forensic-stone/60">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-3 rounded-sm bg-forensic-warning/50" />
          可疑片段
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-3 rounded-sm bg-forensic-risk/50" />
          高风险片段
        </span>
        {isScanning && (
          <span className="ml-auto flex items-center gap-1 text-forensic-gold">
            <motion.span
              animate={prefersReduced ? undefined : { opacity: [1, 0.3, 1] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.8, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-forensic-gold"
            />
            扫描 {Math.round(scanProgress)}%
          </span>
        )}
      </div>
    </div>
  );
}
````

## src/features/report/components/ReportPreview.tsx

``tsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import { activeSample, samples } from '../../samples/data';
import { getImportedSamples } from '../../samples/importedSamples';
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
  const reportSamples = [...getImportedSamples(), ...samples];
  const [searchParams] = useSearchParams();
  const initialSampleId = searchParams.get('sampleId') ?? activeSample.id;
  const [selectedSampleId, setSelectedSampleId] = useState(initialSampleId);
  const selectedSample = reportSamples.find((sample) => sample.id === selectedSampleId) ?? activeSample;

  return (
    <div className="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)]">
      <button
        type="button"
        onClick={onExport}
        className="group fixed right-8 top-20 z-30 inline-flex items-center gap-2 rounded-lg border border-forensic-gold/35 bg-graphite-900/90 px-4 py-2 text-sm font-medium text-forensic-gold backdrop-blur transition-all hover:border-forensic-gold/60 hover:bg-forensic-gold/10"
      >
        <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        导出 PDF
      </button>

      <aside className="h-fit rounded-lg border border-forensic-gold/[0.08] bg-graphite-850 p-3 lg:sticky lg:top-24 lg:row-span-2">
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

      <div className="flex items-center gap-3 lg:col-start-2">
        <span className="text-xs text-forensic-stone">切换样本报告：</span>
        <select
          value={selectedSampleId}
          onChange={(event) => setSelectedSampleId(event.target.value)}
          className="min-w-0 rounded border border-forensic-gold/[0.08] bg-graphite-850 px-3 py-1.5 text-sm text-forensic-text outline-none focus:border-forensic-gold/40"
        >
          {reportSamples.map((sample) => (
            <option key={sample.id} value={sample.id}>
              {sample.id} · {sample.title}
            </option>
          ))}
        </select>
      </div>

      <article className="min-w-0 rounded-lg border border-forensic-gold/[0.08] bg-graphite-900/90 p-8 shadow-workstation backdrop-blur lg:col-start-2">
        <div className="relative mb-8 overflow-hidden rounded-lg border border-forensic-gold/20 bg-gradient-to-br from-graphite-900 to-graphite-950 p-6">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-forensic-gold to-transparent" />

          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
              <span className="rounded border border-forensic-risk/40 bg-forensic-risk/10 px-2 py-0.5 text-forensic-risk">CONFIDENTIAL</span>
              <span className="text-forensic-stone/50">·</span>
              <span className="text-forensic-stone">FORENSIC USE ONLY</span>
            </div>
            <span className="rounded border border-forensic-warning/35 bg-forensic-warning/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-forensic-warning">
              PENDING REVIEW
            </span>
          </div>

          <div className="border-l-2 border-forensic-gold pl-4">
            <h1 className="text-2xl font-semibold text-forensic-text">视觉内容真实性分析报告</h1>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-forensic-stone/60">VISUAL CONTENT AUTHENTICITY FORENSIC REPORT</p>
          </div>

          <div className="mt-5 grid gap-4 border-t border-forensic-gold/15 pt-4 text-xs md:grid-cols-4">
            {[
              { label: 'REPORT ID', value: 'VAW-2026-001' },
              { label: 'ISSUED', value: '2026-05-09 14:32' },
              { label: 'SYSTEM', value: 'v0.9.0-alpha' },
              { label: 'ANALYST', value: 'AUTO-PIPELINE' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-forensic-stone/50">{item.label}</p>
                <p className="mt-1 font-mono text-sm tabular-nums text-forensic-text">{item.value}</p>
              </div>
            ))}
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
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">样本编号</p>
              <p className="mt-2 break-words font-mono font-semibold tabular-nums">{selectedSample.id}</p>
            </div>
            <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">样本类型</p>
              <p className="mt-2 font-semibold">{TYPE_LABEL[selectedSample.type]}</p>
            </div>
            <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-4">
              <p className="text-xs text-forensic-stone">检测时间</p>
              <p className="mt-2 font-mono font-semibold tabular-nums">2026-05-09 14:32</p>
            </div>
            <div className="rounded-md border border-forensic-warning/35 bg-forensic-warning/10 p-4 md:col-span-3">
              <ScoreBar label="最终风险分数" value={selectedSample.riskScore} tone="warning" />
            </div>
          </div>
        </section>

        <section className="mb-8 border-b border-forensic-gold/[0.08] pb-6">
          <h3 className="mb-4 text-base font-semibold">样本预览</h3>
          {selectedSample.type === 'image' ? (
            <div className="relative overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-950">
              {selectedSample.assetSrc ? (
                <img src={selectedSample.assetSrc} alt="报告样本" className="h-72 w-full object-contain" />
              ) : (
                <div className="flex h-72 items-center justify-center text-sm text-forensic-stone">
                  暂无图像资产
                </div>
              )}
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
      </article>
    </div>
  );
}
````

## src/features/report/components/ReportSection.tsx

``tsx
import type { ReportSectionData } from '../types';

type ReportSectionProps = {
  section: ReportSectionData;
};

export function ReportSection({ section }: ReportSectionProps) {
  const match = section.title.match(/^(\d+)\.\s/);
  const num = match?.[1];
  const titleText = match ? section.title.replace(/^\d+\.\s/, '') : section.title;

  return (
    <section className="mt-2 border-t border-forensic-gold/15 py-6">
      <div className="mb-4 flex items-center gap-3">
        {num && (
          <span className="flex items-baseline gap-0.5 font-mono">
            <span className="text-2xl font-bold tabular-nums text-forensic-gold">{num.padStart(2, '0')}</span>
            <span className="text-2xl font-bold text-forensic-gold/40">.</span>
          </span>
        )}
        <h3 className="text-base font-semibold text-forensic-text">{titleText}</h3>
      </div>
      <div className="grid gap-2">
        {section.rows.map((row) => (
          <div key={row.label} className="group grid grid-cols-[200px_1fr] gap-4 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-graphite-800/50">
            <p className="text-forensic-stone">{row.label}</p>
            <p className="leading-6 text-forensic-text">{row.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
````

## src/features/report/data.ts

``ts
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
````

## src/features/report/types.ts

``ts
export type ReportSectionData = {
  title: string;
  rows: Array<{ label: string; value: string }>;
};
````

## src/features/samples/components/SampleCard.tsx

``tsx
import { FileText, Microscope, ScanSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EvidenceSample } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { riskLabel, statusLabel, toneForRisk, toneForStatus } from '../../../shared/utils/format';

type SampleCardProps = {
  sample: EvidenceSample;
  selected: boolean;
  onSelect: (sample: EvidenceSample) => void;
};

export function SampleCard({ sample, selected, onSelect }: SampleCardProps) {
  return (
    <div
      className={`w-full rounded-lg border p-4 text-left transition-colors ${
        selected ? 'border-forensic-gold/50 bg-forensic-gold/10' : 'border-forensic-gold/[0.08] bg-graphite-900 hover:border-forensic-gold/30'
      }`}
    >
      <button type="button" onClick={() => onSelect(sample)} className="w-full text-left">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-forensic-text">{sample.id}</p>
            <p className="mt-1 text-xs text-forensic-stone">{sample.title}</p>
          </div>
          <StatusBadge tone={toneForRisk(sample.riskLevel)}>{riskLabel(sample.riskLevel)}</StatusBadge>
        </div>
      </button>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <StatusBadge tone={toneForStatus(sample.annotationStatus)}>{statusLabel(sample.annotationStatus)}</StatusBadge>
        <StatusBadge tone={toneForStatus(sample.analysisStatus)}>{statusLabel(sample.analysisStatus)}</StatusBadge>
        <StatusBadge tone={toneForStatus(sample.reportStatus)}>{statusLabel(sample.reportStatus)}</StatusBadge>
      </div>
      <div className="mt-4">
        <ScoreBar label="风险分数" value={sample.riskScore} tone={sample.riskScore > 65 ? 'warning' : 'olive'} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Link
          to={`/${sample.type === 'image' ? 'annotation/image' : 'annotation/video'}?sampleId=${sample.id}`}
          className="inline-flex items-center justify-center gap-1 rounded border border-forensic-gold/[0.08] px-2 py-2 text-xs text-forensic-stone"
        >
          <ScanSearch className="h-3.5 w-3.5" />
          标注
        </Link>
        {sample.type === 'image' && (
          <Link
            to={`/analysis/sample?sampleId=${sample.id}`}
            className="inline-flex items-center justify-center gap-1 rounded border border-forensic-gold/[0.08] px-2 py-2 text-xs text-forensic-stone"
          >
            <Microscope className="h-3.5 w-3.5" />
            分析
          </Link>
        )}
        {sample.type !== 'image' && (
          <span className="inline-flex cursor-not-allowed select-none items-center justify-center gap-1 rounded border border-forensic-gold/[0.04] px-2 py-2 text-xs text-forensic-stone/30">
            <Microscope className="h-3.5 w-3.5" />
            分析
          </span>
        )}
        <Link to={`/report?sampleId=${sample.id}`} className="inline-flex items-center justify-center gap-1 rounded border border-forensic-gold/[0.08] px-2 py-2 text-xs text-forensic-stone">
          <FileText className="h-3.5 w-3.5" />
          报告
        </Link>
      </div>
    </div>
  );
}
````

## src/features/samples/components/SampleFilters.tsx

``tsx
type SampleFiltersProps = {
  selectedType: string;
  selectedRisk: string;
  selectedStatus: string;
  search: string;
  onTypeChange: (value: string) => void;
  onRiskChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
};

export function SampleFilters({
  selectedType,
  selectedRisk,
  selectedStatus,
  search,
  onTypeChange,
  onRiskChange,
  onStatusChange,
  onSearchChange,
}: SampleFiltersProps) {
  const hasActiveFilters = selectedRisk !== 'all' || selectedStatus !== 'all' || selectedType !== 'all' || search.trim().length > 0;
  const activeCount = [selectedType !== 'all', selectedRisk !== 'all', selectedStatus !== 'all', search.trim().length > 0].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="搜索样本编号、来源..."
          className="h-10 w-80 rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 px-4 text-sm outline-none focus:border-forensic-gold/40"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-forensic-stone">类型</span>
        {[
          { value: 'all', label: '全部' },
          { value: 'image', label: '图像' },
          { value: 'video', label: '视频' },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onTypeChange(item.value)}
            className={`rounded-full border px-3 py-1 ${
              selectedType === item.value
                ? 'border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold'
                : 'border-forensic-gold/[0.08] bg-graphite-850 text-forensic-stone'
            }`}
          >
            {item.label}
          </button>
        ))}
        <span className="ml-3 text-forensic-stone">风险</span>
        {[
          { value: 'all', label: '全部' },
          { value: 'high', label: '高风险' },
          { value: 'critical', label: '关键风险' },
          { value: 'medium', label: '中风险' },
          { value: 'low', label: '低风险' },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onRiskChange(item.value)}
            className={`rounded-full border px-3 py-1 text-sm ${
              selectedRisk === item.value
                ? 'border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold'
                : 'border-forensic-gold/[0.08] bg-graphite-850 text-forensic-stone'
            }`}
          >
            {item.label}
          </button>
        ))}
        <span className="ml-3 text-forensic-stone">状态</span>
        {[
          { value: 'all', label: '全部' },
          { value: 'pending', label: '未标注' },
          { value: 'complete', label: '已标注' },
          { value: 'review', label: '待复核' },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onStatusChange(item.value)}
            className={`rounded-full border px-3 py-1 text-sm ${
              selectedStatus === item.value
                ? 'border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold'
                : 'border-forensic-gold/[0.08] bg-graphite-850 text-forensic-stone'
            }`}
          >
            {item.label}
          </button>
        ))}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              onTypeChange('all');
              onRiskChange('all');
              onStatusChange('all');
              onSearchChange('');
            }}
            className="ml-auto flex items-center gap-1.5 rounded-full border border-forensic-risk/25 bg-forensic-risk/[0.08] px-3 py-1 text-xs text-forensic-risk transition-colors hover:border-forensic-risk/40 hover:bg-forensic-risk/[0.12]"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-forensic-risk/20 font-mono text-[10px] font-bold">
              {activeCount}
            </span>
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
}
````

## src/features/samples/components/SampleImportPanel.tsx

``tsx
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { FolderOpen, Upload, FileImage, FileVideo } from 'lucide-react';
import type { EvidenceSample, FakeRegion, VideoSegmentEvidence } from '../types';

type SampleImportPanelProps = {
  onImport: (samples: EvidenceSample[]) => void;
  imported: boolean;
  importedCount: number;
};

const ACCEPTED_MEDIA = 'image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm,video/quicktime';

function isSupportedMedia(file: File) {
  return file.type.startsWith('image/') || file.type.startsWith('video/');
}

function createRegion(index: number): FakeRegion {
  const confidence = 64 + (index % 4) * 7;
  return {
    id: `R-${String((index % 9) + 1).padStart(2, '0')}`,
    label: '自动候选区域',
    type: confidence >= 78 ? '边界异常' : '纹理异常',
    clue: '导入样本已进入自动标注队列，系统生成候选复核区域。',
    confidence,
    x: 18 + (index % 4) * 13,
    y: 20 + (index % 3) * 14,
    width: 18,
    height: 16,
    semanticStepId: 'local',
    expertIds: ['spatial', 'style'],
    reviewStatus: 'review',
  };
}

function createSegments(index: number): VideoSegmentEvidence[] {
  return [
    {
      id: 'S-01',
      label: '自动候选片段',
      start: '00:03.20',
      end: '00:08.60',
      riskScore: 62 + (index % 4) * 6,
      clue: '导入视频已进入自动标注队列，系统生成候选片段。',
      keyframes: ['KF-01', 'KF-02', 'KF-03'],
      regions: [],
      semanticStepId: 'logic',
      expertIds: ['spatial', 'semantic'],
      reviewStatus: 'review',
    },
  ];
}

function createImportedSample(file: File, index: number): EvidenceSample {
  const type = file.type.startsWith('video/') ? 'video' : 'image';
  const idPrefix = type === 'video' ? 'VID-IMP' : 'IMG-IMP';
  const riskScore = 48 + (index % 6) * 7;
  const objectUrl = URL.createObjectURL(file);

  return {
    id: `${idPrefix}-${String(Date.now()).slice(-5)}-${String(index + 1).padStart(3, '0')}`,
    title: file.name,
    type,
    source: 'unknown',
    generator: '未知',
    assetSrc: type === 'image' ? objectUrl : undefined,
    videoSrc: type === 'video' ? objectUrl : undefined,
    category: type === 'image' ? '导入图像' : '导入视频',
    prompt: '本地导入样本，等待人工补充来源说明。',
    annotationStatus: 'review',
    analysisStatus: 'pending',
    reportStatus: 'pending',
    riskLevel: riskScore >= 75 ? 'high' : riskScore >= 55 ? 'medium' : 'low',
    riskScore,
    createdAt: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).replace(/\//g, '-'),
    regions: type === 'image' ? [createRegion(index)] : [],
    segments: type === 'video' ? createSegments(index) : [],
  };
}

function folderNameFromFiles(files: File[]) {
  const firstPath = files[0]?.webkitRelativePath;
  return firstPath ? firstPath.split('/')[0] : '已选择文件夹';
}

export function SampleImportPanel({ onImport, imported, importedCount }: SampleImportPanelProps) {
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [lastBatchName, setLastBatchName] = useState('未选择');
  const [lastBatchCount, setLastBatchCount] = useState(0);
  const summaryText = useMemo(() => {
    if (!imported) return '等待导入样本。';
    return `已导入 ${importedCount} 个样本，已生成自动标注候选证据。`;
  }, [imported, importedCount]);

  useEffect(() => {
    folderInputRef.current?.setAttribute('webkitdirectory', '');
    folderInputRef.current?.setAttribute('directory', '');
  }, []);

  function importFiles(fileList: FileList | null, sourceName: string) {
    const mediaFiles = Array.from(fileList ?? []).filter(isSupportedMedia);
    if (mediaFiles.length === 0) {
      setLastBatchName('未发现可导入媒体');
      setLastBatchCount(0);
      return;
    }

    const importedSamples = mediaFiles.map(createImportedSample);
    setLastBatchName(sourceName);
    setLastBatchCount(importedSamples.length);
    onImport(importedSamples);
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    importFiles(event.target.files, '手动选择文件');
    event.target.value = '';
  }

  function handleFolder(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    importFiles(event.target.files, folderNameFromFiles(files));
    event.target.value = '';
  }

  return (
    <div className="grid grid-cols-[1fr_280px] gap-4">
      <div className="rounded-md border border-dashed border-forensic-gold/[0.08] bg-black/20 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold">
            <Upload className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold">样本导入入口</p>
            <p className="mt-2 text-sm leading-6 text-forensic-stone">
              支持真实导入图像、视频或整个文件夹。导入后建立样本任务，并自动生成候选标注证据。
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-3">
            <FileImage className="mb-2 h-4 w-4 text-forensic-gold" />
            <p className="text-xs text-forensic-stone">图像输入</p>
            <p className="mt-1 text-sm">PNG / JPG / WEBP</p>
          </div>
          <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-3">
            <FileVideo className="mb-2 h-4 w-4 text-forensic-olive" />
            <p className="text-xs text-forensic-stone">视频输入</p>
            <p className="mt-1 text-sm">MP4 / WEBM / MOV</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-forensic-gold/35 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold transition-colors hover:bg-forensic-gold/15">
            <Upload className="h-4 w-4" />
            导入文件
            <input type="file" multiple accept={ACCEPTED_MEDIA} onChange={handleFiles} className="hidden" />
          </label>
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-forensic-olive/35 bg-forensic-olive/10 px-4 py-2 text-sm font-medium text-forensic-olive transition-colors hover:bg-forensic-olive/15">
            <FolderOpen className="h-4 w-4" />
            导入文件夹
            <input ref={folderInputRef} type="file" multiple accept={ACCEPTED_MEDIA} onChange={handleFolder} className="hidden" />
          </label>
        </div>
      </div>
      <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-forensic-stone">导入输出</p>
        <p className="mt-3 text-sm leading-6">{summaryText}</p>
        <div className="mt-4 rounded-md border border-forensic-gold/[0.08] bg-graphite-900 p-3 text-xs">
          <div className="flex justify-between gap-3">
            <span className="text-forensic-stone">来源</span>
            <span className="truncate text-forensic-text">{lastBatchName}</span>
          </div>
          <div className="mt-2 flex justify-between gap-3">
            <span className="text-forensic-stone">本批数量</span>
            <span className="font-mono tabular-nums text-forensic-gold">{lastBatchCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## src/features/samples/components/SampleStatusPanel.tsx

``tsx
import type { EvidenceSample } from '../types';
import { ScoreBar } from '../../../shared/components/ScoreBar';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { statusLabel, riskLabel, toneForRisk, toneForStatus } from '../../../shared/utils/format';

type SampleStatusPanelProps = {
  sample: EvidenceSample;
};

export function SampleStatusPanel({ sample }: SampleStatusPanelProps) {
  return (
    <div className="space-y-3 rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{sample.id}</p>
          <p className="mt-1 text-xs text-forensic-stone">{sample.title}</p>
        </div>
        <StatusBadge tone={toneForRisk(sample.riskLevel)}>{riskLabel(sample.riskLevel)}</StatusBadge>
      </div>
      <ScoreBar label="风险分数" value={sample.riskScore} tone={sample.riskScore > 65 ? 'warning' : 'olive'} />
      <div className="grid grid-cols-3 gap-2 text-xs">
        <StatusBadge tone={toneForStatus(sample.annotationStatus)}>
          标注 {statusLabel(sample.annotationStatus)}
        </StatusBadge>
        <StatusBadge tone={toneForStatus(sample.analysisStatus)}>
          分析 {statusLabel(sample.analysisStatus)}
        </StatusBadge>
        <StatusBadge tone={toneForStatus(sample.reportStatus)}>
          报告 {statusLabel(sample.reportStatus)}
        </StatusBadge>
      </div>
    </div>
  );
}
````

## src/features/samples/components/SampleTable.tsx

``tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { EvidenceSample } from '../types';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import {
  RISK_LABEL,
  SOURCE_LABEL,
  TYPE_LABEL,
  riskLabel,
  statusLabel,
  toneForRisk,
  toneForStatus,
} from '../../../shared/utils/format';

type SampleTableProps = {
  samples: EvidenceSample[];
  selectedId: string;
  onSelect: (sample: EvidenceSample) => void;
};

export function SampleTable({ samples, selectedId, onSelect }: SampleTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-forensic-gold/[0.08]">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-graphite-850 text-xs uppercase tracking-[0.12em] text-forensic-stone">
          <tr>
            <th className="w-0 p-0" />
            <th className="px-4 py-3 text-left">样本</th>
            <th className="px-4 py-3 text-left">类型</th>
            <th className="px-4 py-3 text-left">来源</th>
            <th className="px-4 py-3 text-left">生成器</th>
            <th className="px-4 py-3 text-left">标注</th>
            <th className="px-4 py-3 text-left">检测</th>
            <th className="px-4 py-3 text-left">报告</th>
            <th className="px-4 py-3 text-left">风险</th>
            <th className="px-4 py-3 text-left">创建时间</th>
            <th className="px-4 py-3 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample, index) => (
            <motion.tr
              key={sample.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
              className={`group/row relative border-t border-forensic-gold/[0.08] bg-graphite-900/80 transition-colors duration-100 hover:bg-forensic-gold/[0.03] ${
                selectedId === sample.id ? 'bg-forensic-gold/[0.04]' : ''
              }`}
            >
              <td className="relative w-0 p-0">
                <motion.div
                  className="absolute inset-y-0 left-0 w-0.5 origin-center rounded-r-full bg-forensic-gold"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: selectedId === sample.id ? 1 : 0,
                    opacity: selectedId === sample.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </td>
              <td className="px-4 py-3">
                <button type="button" onClick={() => onSelect(sample)} className="text-left">
                  <span className="font-medium text-forensic-text">{sample.id}</span>
                  <span className="mt-1 block text-xs text-forensic-stone">{sample.title}</span>
                </button>
              </td>
              <td className="px-4 py-3 text-forensic-stone transition-opacity group-hover/row:text-forensic-text/80">
                {TYPE_LABEL[sample.type] ?? sample.type}
              </td>
              <td className="px-4 py-3 text-forensic-stone transition-opacity group-hover/row:text-forensic-text/80">
                {SOURCE_LABEL[sample.source] ?? sample.source}
              </td>
              <td className="px-4 py-3 text-forensic-stone transition-opacity group-hover/row:text-forensic-text/80">
                {sample.generator ?? '未知'}
              </td>
              <td className="px-4 py-3">
                <StatusBadge tone={toneForStatus(sample.annotationStatus)}>{statusLabel(sample.annotationStatus)}</StatusBadge>
              </td>
              <td className="px-4 py-3">
                <StatusBadge tone={toneForStatus(sample.analysisStatus)}>{statusLabel(sample.analysisStatus)}</StatusBadge>
              </td>
              <td className="px-4 py-3">
                <StatusBadge tone={toneForStatus(sample.reportStatus)}>{statusLabel(sample.reportStatus)}</StatusBadge>
              </td>
              <td className="px-4 py-3">
                <StatusBadge tone={toneForRisk(sample.riskLevel)}>{RISK_LABEL[sample.riskLevel] ?? riskLabel(sample.riskLevel)}</StatusBadge>
              </td>
              <td className="px-4 py-3 font-mono tabular-nums text-forensic-stone transition-opacity group-hover/row:text-forensic-text/80">
                {sample.createdAt}
              </td>
              <td className="relative px-4 py-3 pr-8">
                <div className="flex gap-2 text-xs">
                  <Link to={`/${sample.type === 'image' ? 'annotation/image' : 'annotation/video'}?sampleId=${sample.id}`} className="text-forensic-gold">
                    标注
                  </Link>
                  {sample.type === 'image' && (
                    <Link to={`/analysis/sample?sampleId=${sample.id}`} className="text-forensic-olive">
                      分析
                    </Link>
                  )}
                  <Link to={`/report?sampleId=${sample.id}`} className="text-forensic-stone">
                    报告
                  </Link>
                </div>
                <ArrowRight className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-2 text-forensic-gold/60 opacity-0 transition-all duration-150 group-hover/row:translate-x-0 group-hover/row:opacity-100" />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
````

## src/features/samples/data.ts

``ts
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
````

## src/features/samples/importedSamples.ts

``ts
import type { EvidenceSample } from './types';

const importedSamples: EvidenceSample[] = [];

export function addImportedSamples(samples: EvidenceSample[]) {
  importedSamples.unshift(...samples);
}

export function getImportedSamples() {
  return [...importedSamples];
}

export function findImportedSample(sampleId: string | null) {
  if (!sampleId) return undefined;
  return importedSamples.find((sample) => sample.id === sampleId);
}
````

## src/features/samples/types.ts

``ts
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
````

## src/layouts/AppLayout.tsx

``tsx
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
````

## src/layouts/PageShell.tsx

``tsx
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

// Route wrapper keeps page transitions and heading rhythm consistent.
export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.22 }}>
      <div className="mb-6 max-w-5xl">
        <div className="flex items-center gap-2">
          <motion.div
            className="h-3 w-0.5 rounded-full bg-forensic-gold"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          <p className="text-xs uppercase tracking-[0.2em] text-forensic-gold">{eyebrow}</p>
        </div>
        <motion.h1
          className="mt-2 text-3xl font-semibold tracking-normal text-forensic-text"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-2 text-sm leading-6 text-forensic-stone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}
      </div>
      {children}
    </motion.div>
  );
}
````

## src/layouts/Sidebar.tsx

``tsx
import { motion, useReducedMotion } from 'framer-motion';
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
import { sampleMetrics } from '../features/samples/data';
import { cn } from '../shared/utils/cn';

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
  const prefersReduced = useReducedMotion();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[220px] flex-col border-r border-forensic-gold/[0.08] bg-graphite-900">
      <div className="border-b border-forensic-gold/[0.08] px-5 py-5">
        <div className="flex items-center gap-2">
          <motion.svg
            viewBox="0 0 32 32"
            className="h-4 w-4 text-forensic-gold"
            animate={prefersReduced ? undefined : { rotate: 360 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
            <circle cx="16" cy="16" r="5.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
            <path d="M16 3.5v6M16 22.5v6M3.5 16h6M22.5 16h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1.6" fill="currentColor" />
          </motion.svg>
          <p className="text-xs uppercase tracking-[0.22em] text-forensic-gold">Evidence</p>
        </div>
        <h1 className="mt-2 text-lg font-semibold leading-tight text-forensic-text">视觉证据工作台</h1>
      </div>

      <motion.nav className="flex-1 space-y-1 p-3" variants={navVariants} initial="hidden" animate="visible">
        {navItems.map((item) => {
          if ('divider' in item) {
            return <div key={item.id} className="my-3 h-px bg-forensic-gold/10" />;
          }

          const Icon = item.icon;
          const isExactMatch = location.pathname === item.path;
          const isParentOfActiveSub = !item.sub && item.path !== '/' && location.pathname.startsWith(item.path + '/');
          const isActive = isExactMatch || isParentOfActiveSub;

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

      <div className="border-t border-forensic-gold/[0.08] p-4 font-mono text-[10px] uppercase tracking-[0.16em]">
        <div className="space-y-2 rounded-lg border border-forensic-gold/[0.08] bg-graphite-950/40 p-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-forensic-olive" />
            <span className="text-forensic-stone/50">MODEL</span>
            <span className="ml-auto text-forensic-olive">READY</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-forensic-olive"
              animate={prefersReduced ? undefined : { opacity: [1, 0.35, 1] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 2.5, repeat: Infinity }}
            />
            <span className="text-forensic-stone/50">ENGINE</span>
            <span className="ml-auto text-forensic-olive">ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-forensic-gold" />
            <span className="text-forensic-stone/50">QUEUE</span>
            <span className="ml-auto tabular-nums text-forensic-gold">{sampleMetrics.reviewRequired}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
````

## src/layouts/TopBar.tsx

``tsx
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { activeSample, samples } from '../features/samples/data';

const ROUTE_LABELS: Record<string, string> = {
  '/': '总览',
  '/samples': '样本库',
  '/annotation': '标注中心',
  '/annotation/image': '图像标注',
  '/annotation/video': '视频标注',
  '/analysis': '检测中心',
  '/analysis/sample': '检测工作台',
  '/report': '证据报告',
};

function LiveClock() {
  const formatTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\//g, '-');
    const time = now.toLocaleTimeString('zh-CN', { hour12: false });
    return `WS-001 · ${date} ${time}`;
  };
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(formatTime());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="font-mono text-xs tabular-nums text-forensic-stone">{time}</span>;
}

export function TopBar() {
  const prefersReduced = useReducedMotion();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId');
  const currentSample = samples.find((sample) => sample.id === sampleId) ?? activeSample;
  const routeLabel = ROUTE_LABELS[location.pathname] ?? location.pathname;

  return (
    <header
      className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-forensic-gold/[0.08] px-6"
      style={{
        background: 'rgba(17,19,21,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="text-forensic-stone/60">视觉真实性工作台</span>
        <ChevronRight className="h-3.5 w-3.5 text-forensic-stone/35" />
        <span className="font-medium text-forensic-text">{routeLabel}</span>
        <ChevronRight className="h-3.5 w-3.5 text-forensic-stone/35" />
        <span className="font-mono text-xs tabular-nums text-forensic-gold">{currentSample.id}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-forensic-stone">
        <div className="flex items-center gap-1.5">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-forensic-olive"
            animate={prefersReduced ? undefined : { opacity: [1, 0.4, 1] }}
            transition={prefersReduced ? { duration: 0 } : { duration: 2.5, repeat: Infinity }}
          />
          <span className="text-xs text-forensic-stone">系统就绪</span>
        </div>
        <LiveClock />
      </div>
    </header>
  );
}
````

## src/main.tsx

``tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import './styles/globals.css';
import { router } from './app/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
````

## src/pages/AnalysisCenterPage.tsx

``tsx
import ReactECharts from 'echarts-for-react';
import { Link } from 'react-router-dom';
import { Cpu, Video as VideoIcon } from 'lucide-react';
import { expertResults } from '../features/analysis/data';
import { samples } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { darkChartBase } from '../shared/utils/chartTheme';
import { RISK_LABEL, toneForRisk } from '../shared/utils/format';

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
                <StatusBadge tone={toneForRisk(sample.riskLevel)}>{RISK_LABEL[sample.riskLevel] ?? sample.riskLevel}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
````

## src/pages/AnnotationCenterPage.tsx

``tsx
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ImageIcon, Video } from 'lucide-react';
import { sampleMetrics, samples } from '../features/samples/data';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { darkChartBase } from '../shared/utils/chartTheme';
import { statusLabel, toneForStatus, TYPE_LABEL } from '../shared/utils/format';

export function AnnotationCenterPage() {
  const navigate = useNavigate();
  const annotatedPct = sampleMetrics.total > 0 ? Math.round((sampleMetrics.annotated / sampleMetrics.total) * 100) : 0;
  const imageCompleted = samples.filter((sample) => sample.type === 'image' && sample.annotationStatus !== 'pending').length;
  const imagePending = sampleMetrics.images - imageCompleted;
  const videoCompleted = samples.filter((sample) => sample.type === 'video' && sample.annotationStatus !== 'pending').length;
  const videoPending = sampleMetrics.videos - videoCompleted;

  const annotationProgressOption = {
    ...darkChartBase,
    series: [
      {
        type: 'pie',
        radius: ['72%', '88%'],
        silent: true,
        label: { show: true, position: 'center', formatter: `${annotatedPct}%`, color: '#B88A44', fontSize: 34, fontWeight: 700 },
        data: [
          { value: annotatedPct, name: '完成', itemStyle: { color: '#B88A44' } },
          { value: 100 - annotatedPct, name: '剩余', itemStyle: { color: '#2D3338' } },
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
        <motion.button
          type="button"
          onClick={() => navigate('/annotation/image')}
          className="group relative flex h-[260px] flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 transition-colors hover:border-forensic-gold/40 hover:bg-forensic-gold/[0.04]"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18 }}
        >
          <span className="absolute left-5 top-4 font-mono text-4xl font-bold tabular-nums text-forensic-gold/30">01</span>
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(184,138,68,0.15) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(184,138,68,0.4), transparent)' }}
          />
          <ImageIcon className="h-12 w-12 text-forensic-gold transition-transform duration-300 group-hover:scale-110" />
          <div className="text-center">
            <p className="text-2xl font-semibold">图像标注</p>
            <p className="mt-1 text-sm text-forensic-stone">自动发现可疑区域</p>
            <p className="mt-2 font-mono text-[11px] tabular-nums text-forensic-stone/70">
              已完成 {imageCompleted} · 待处理 {imagePending}
            </p>
          </div>
          <motion.span
            className="absolute bottom-5 right-5 rounded border border-forensic-gold/35 bg-graphite-950/60 px-3 py-1.5 font-mono text-[11px] font-semibold text-forensic-gold"
            whileHover={{ paddingLeft: '24px', paddingRight: '24px' }}
            transition={{ duration: 0.15 }}
          >
            [ ENTER → ]
          </motion.span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => navigate('/annotation/video')}
          className="group relative flex h-[260px] flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-forensic-olive/[0.12] bg-graphite-850 transition-colors hover:border-forensic-olive/40 hover:bg-forensic-olive/[0.04]"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18 }}
        >
          <span className="absolute left-5 top-4 font-mono text-4xl font-bold tabular-nums text-forensic-olive/30">02</span>
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(111,143,114,0.15) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(111,143,114,0.4), transparent)' }}
          />
          <Video className="h-12 w-12 text-forensic-olive transition-transform duration-300 group-hover:scale-110" />
          <div className="text-center">
            <p className="text-2xl font-semibold">视频标注</p>
            <p className="mt-1 text-sm text-forensic-stone">定位可疑片段</p>
            <p className="mt-2 font-mono text-[11px] tabular-nums text-forensic-stone/70">
              已完成 {videoCompleted} · 待处理 {videoPending}
            </p>
          </div>
          <motion.span
            className="absolute bottom-5 right-5 rounded border border-forensic-olive/35 bg-graphite-950/60 px-3 py-1.5 font-mono text-[11px] font-semibold text-forensic-olive"
            whileHover={{ paddingLeft: '24px', paddingRight: '24px' }}
            transition={{ duration: 0.15 }}
          >
            [ ENTER → ]
          </motion.span>
        </motion.button>
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
                <StatusBadge tone={toneForStatus(sample.annotationStatus)}>{statusLabel(sample.annotationStatus)}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
````

## src/pages/ImageAnnotationPage.tsx

``tsx
import { ChangeEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { activeSample, samples } from '../features/samples/data';
import { findImportedSample } from '../features/samples/importedSamples';
import { AnnotationLogStream } from '../features/annotation/components/AnnotationLogStream';
import { AnnotationResultPanel } from '../features/annotation/components/AnnotationResultPanel';
import { ImageAnnotationCanvas } from '../features/annotation/components/ImageAnnotationCanvas';
import { RegionClueList } from '../features/annotation/components/RegionClueList';
import { PageShell } from '../layouts/PageShell';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { readFileAsDataUrl, readLocalAsset, saveAnnotationToSession, saveLocalAsset } from '../shared/utils/localSample';

const IMAGE_ANNOTATION_STAGES = [
  {
    title: '图像读取',
    output: '建立图像任务上下文',
    durationMs: 700,
    logLines: ['[INIT] 图像解码器就绪', '[INFO] 色彩空间: sRGB', '[INFO] 分辨率读取完成'],
  },
  {
    title: '区域扫描',
    output: '发现候选可疑区域',
    durationMs: 1400,
    logLines: ['[SCAN] 启动多尺度网格扫描', '[SCAN] 层级 1/3: 低频异常检测', '[SCAN] 层级 2/3: 纹理一致性核查', '[SCAN] 层级 3/3: 边界语义分析', '[WARN] 检测到候选异常区域'],
  },
  {
    title: '线索生成',
    output: '输出反射、纹理、边界线索',
    durationMs: 900,
    logLines: ['[CLUE] 区域 R-01: 反射不一致 → 置信度 82%', '[CLUE] 区域 R-02: 纹理断裂 → 置信度 74%', '[CLUE] 区域 R-03: 边界异常 → 置信度 68%'],
  },
  {
    title: '结果固化',
    output: '写入候选证据队列',
    durationMs: 500,
    logLines: ['[SAVE] 写入候选证据数据库', '[OK]   标注任务完成，等待复核'],
  },
] as const;

export function ImageAnnotationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeSample.id;
  const importedSample = findImportedSample(sampleId);
  const sample =
    importedSample?.type === 'image'
      ? importedSample
      : samples.find((item) => item.id === sampleId && item.type === 'image') ?? activeSample;

  const [selectedRegionId, setSelectedRegionId] = useState(sample.regions[0]?.id ?? '');
  const [running, setRunning] = useState(false);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const reviewed = reviewedIds.has(selectedRegionId);
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [annotationLogLines, setAnnotationLogLines] = useState<string[]>([]);
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

  const visibleRegionCount = complete || activeIndex >= 3 ? sample.regions.length : activeIndex >= 2 ? sample.regions.length : 0;
  const annotationPhase = running ? activeIndex : complete ? 3 : -1;

  function runAnnotation() {
    setRunning(true);
    setComplete(false);
    setActiveIndex(0);
    setAnnotationLogLines([]);

    let elapsed = 0;
    IMAGE_ANNOTATION_STAGES.forEach((stage, stageIndex) => {
      window.setTimeout(() => {
        setActiveIndex(stageIndex);
        if (stageIndex === IMAGE_ANNOTATION_STAGES.length - 1) {
          window.setTimeout(() => {
            setRunning(false);
            setComplete(true);
          }, stage.durationMs);
        }
      }, elapsed);

      const lineInterval = stage.durationMs / (stage.logLines.length + 1);
      stage.logLines.forEach((line, lineIndex) => {
        window.setTimeout(() => {
          setAnnotationLogLines((prev) => [...prev, line]);
        }, elapsed + lineInterval * (lineIndex + 1));
      });

      elapsed += stage.durationMs;
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
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-forensic-gold/[0.08] bg-graphite-900 px-4 py-3 text-xs">
          <span className="min-w-0 flex-1 truncate font-mono tabular-nums text-forensic-stone">{localImage.name}</span>
          <label className="cursor-pointer rounded-md border border-forensic-gold/[0.08] bg-graphite-850 px-3 py-2 text-forensic-stone transition-colors hover:border-forensic-gold/30 hover:text-forensic-text">
            选择文件
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={runAnnotation}
            className="rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 font-medium text-forensic-gold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={running}
          >
            {running ? '正在标注' : '开始标注'}
          </button>
          <div className="flex min-w-[260px] items-center gap-3 border-l border-forensic-gold/[0.08] pl-3">
            <span className="text-forensic-stone">当前阶段</span>
            <motion.span
              key={activeIndex}
              className="font-medium text-forensic-gold"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {running
                ? IMAGE_ANNOTATION_STAGES[activeIndex]?.title ?? '准备中'
                : complete
                  ? '✓ ' + IMAGE_ANNOTATION_STAGES[IMAGE_ANNOTATION_STAGES.length - 1].title
                  : '就绪'}
            </motion.span>
            {running && <span className="ml-auto text-forensic-stone">{IMAGE_ANNOTATION_STAGES[activeIndex]?.output}</span>}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-[55fr_45fr]">
        <SectionCard title="图像画布" eyebrow="候选区域">
          <div className="space-y-4">
            <ImageAnnotationCanvas
              sample={sample}
              selectedRegionId={selectedRegionId}
              onSelectRegion={setSelectedRegionId}
              imageSrc={localImage.dataUrl}
              annotationPhase={annotationPhase}
              isRunning={running}
              isComplete={complete}
            />
            <AnnotationLogStream lines={annotationLogLines} isRunning={running} isComplete={complete} />
          </div>
        </SectionCard>
        <SectionCard title="标注结果面板" eyebrow="结构化输出">
          <AnnotationResultPanel
            sample={sample}
            selectedRegion={visibleRegionCount > 0 ? selectedRegion : undefined}
            running={running}
            reviewed={reviewed}
            onRun={runAnnotation}
            onReview={() => setReviewedIds((prev) => new Set([...prev, selectedRegionId]))}
            onSendToAnalysis={sendToAnalysis}
          />
        </SectionCard>
      </div>

      <SectionCard title="候选证据列表" className="mt-5">
        <RegionClueList
          regions={sample.regions}
          selectedId={selectedRegionId}
          onSelect={setSelectedRegionId}
          visibleCount={visibleRegionCount}
          isRunning={running}
        />
      </SectionCard>
    </PageShell>
  );
}
````

## src/pages/OverviewPage.tsx

``tsx
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cpu, FileText, GitMerge, Sparkles, Tag, Upload } from 'lucide-react';
import { recentTasks } from '../features/samples/data';
import { PipelineIconFlow } from '../shared/components/PipelineIconFlow';
import { SectionCard } from '../shared/components/SectionCard';
import { StatusBadge } from '../shared/components/StatusBadge';
import { RISK_LABEL, STATUS_LABEL, TYPE_LABEL, toneForRisk } from '../shared/utils/format';

const HeroDemoCard = lazy(() =>
  import('../shared/components/HeroDemoCard').then((module) => ({ default: module.HeroDemoCard })),
);

function useCountUp(target: number, duration = 1400): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

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

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 120;
      const y = 44 - ((value - min) / Math.max(max - min, 1)) * 36;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 120 48" className="h-12 w-28 overflow-visible">
      <polyline fill="none" stroke="rgba(184,138,68,0.22)" strokeWidth="5" points={points} strokeLinecap="round" strokeLinejoin="round" />
      <polyline fill="none" stroke="#B88A44" strokeWidth="1.8" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnimatedStatCard({
  numericTarget,
  suffix,
  label,
  note,
  values,
}: {
  numericTarget: number;
  suffix: string;
  label: string;
  note: string;
  values: number[];
}) {
  const value = useCountUp(numericTarget, 1600);
  const display = numericTarget === 947 ? `${(value / 10).toFixed(1)}` : String(value);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-6 transition-colors hover:border-forensic-gold/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,138,68,0.2), transparent)' }} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-5xl font-bold tabular-nums text-forensic-gold">
            {display}
            {suffix}
          </p>
          <p className="mt-3 text-sm text-forensic-text">{label}</p>
          <p className="mt-1 text-xs text-forensic-stone/60">{note}</p>
        </div>
        <Sparkline values={values} />
      </div>
    </div>
  );
}

function StatCard({ value, label, note, values }: { value: string; label: string; note: string; values: number[] }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-6 transition-colors hover:border-forensic-gold/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,138,68,0.2), transparent)' }} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-5xl font-bold tabular-nums text-forensic-gold">{value}</p>
          <p className="mt-3 text-sm text-forensic-text">{label}</p>
          <p className="mt-1 text-xs text-forensic-stone/60">{note}</p>
        </div>
        <Sparkline values={values} />
      </div>
    </div>
  );
}

function HeroDemoSkeleton() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-forensic-gold/25 bg-graphite-950 shadow-workstation">
      <div className="absolute inset-x-0 top-0 h-9 border-b border-forensic-gold/15 bg-graphite-950/80" />
      <div className="absolute inset-5 top-14 rounded-xl bg-graphite-850/60" />
      <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 gap-2 border-t border-forensic-gold/15 bg-graphite-950/85 px-3 py-2">
        {['空间', '频域', '风格', '语义'].map((label) => (
          <div key={label} className="text-center">
            <div className="mx-auto h-2 w-8 rounded bg-forensic-stone/10" />
            <div className="mx-auto mt-1 h-3 w-5 rounded bg-forensic-gold/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function OverviewPage() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const sampleCount = useCountUp(124, 1500);
  const accuracy = useCountUp(968, 1500);

  return (
    <>
      <section className="forensic-noise relative overflow-hidden rounded-2xl border border-forensic-gold/[0.08] bg-graphite-950 px-8 py-10 shadow-workstation">
        <div className="grid items-center gap-8 lg:grid-cols-[60fr_40fr]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-forensic-gold/25 bg-forensic-gold/5 px-3 py-1">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className={`absolute h-2 w-2 rounded-full border border-forensic-gold ${prefersReduced ? '' : 'animate-pulse-ring'}`} />
                <span className="h-1.5 w-1.5 rounded-full bg-forensic-gold" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">FORENSIC INTELLIGENCE · v0.9</span>
            </div>

            <div className="mt-6">
              <h1 className="text-6xl font-semibold leading-[1.05] tracking-tight text-forensic-text">洞察 AI 生成内容</h1>
              <h2 className="mt-2 text-6xl font-semibold leading-[1.05] tracking-tight">
                <span className={`bg-gradient-to-r from-forensic-gold via-forensic-text to-forensic-gold bg-[length:200%_100%] bg-clip-text text-transparent ${prefersReduced ? '' : 'animate-shimmer'}`}>
                  隐藏的证据链
                </span>
              </h2>
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-forensic-stone">
              自动标注候选证据 · 语义链可解释推理 · 多专家融合判决 · 一键生成结构化取证报告
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/analysis/sample')}
                className="inline-flex items-center gap-2 rounded-xl bg-forensic-gold px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-forensic-warning"
              >
                <Sparkles className="h-4 w-4" />
                开始检测
              </button>
              <button
                type="button"
                onClick={() => navigate('/samples')}
                className="inline-flex items-center gap-2 rounded-xl border border-forensic-gold/[0.16] bg-graphite-850 px-6 py-3 text-sm font-semibold text-forensic-text transition-colors hover:border-forensic-gold/35"
              >
                浏览样本库
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs tabular-nums text-forensic-stone">
              <span>
                样本 <span className="text-forensic-gold">{sampleCount}</span>
              </span>
              <span>
                准确率 <span className="text-forensic-gold">{(accuracy / 10).toFixed(1)}%</span>
              </span>
              <span>
                平均响应 <span className="text-forensic-gold">1.8s</span>
              </span>
            </div>
          </div>

          <Suspense fallback={<HeroDemoSkeleton />}>
            <HeroDemoCard />
          </Suspense>
        </div>
      </section>

      <section className="mt-2">
        <div className="relative grid gap-5 lg:grid-cols-2">
          <div className="relative h-[280px] overflow-hidden rounded-xl border-2 border-forensic-olive bg-graphite-950">
            <img src="/demo-assets/real.jpg" alt="真实图像" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 rounded-lg border border-forensic-olive/30 bg-forensic-olive/15 px-3 py-2 text-sm text-forensic-olive">
              真实图像 · 置信度 96%
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-forensic-stone/70"
              style={{
                background: '#1A1D20',
                border: '1px solid rgba(168,162,154,0.2)',
                boxShadow: '0 0 0 4px rgba(17,19,21,0.8)',
              }}
            >
              VS
            </div>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-xl border-2 border-forensic-risk bg-graphite-950">
            <img src="/demo-assets/fake.jpg" alt="AI 生成图像" className="h-full w-full object-cover" />
            {compareRegions.map((region) => (
              <div key={region.label} className={`absolute rounded-lg border-2 border-dashed border-forensic-risk bg-forensic-risk/10 ${region.className}`}>
                <span className="absolute -top-7 left-0 rounded-md border border-forensic-risk/30 bg-forensic-risk/15 px-2 py-1 text-xs text-forensic-risk">
                  {region.label}
                </span>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 rounded-lg border border-forensic-risk/30 bg-forensic-risk/15 px-3 py-2 text-sm text-forensic-risk">
              AI 生成 · 高风险 · 置信度 94%
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
        <AnimatedStatCard numericTarget={947} suffix="%" label="AI生成检出率" note="模拟精度指标" values={[3, 5, 4, 7, 6, 8, 7, 9, 8, 10, 9, 11]} />
        <StatCard value="< 2s" label="单图平均分析时间" note="前端演示时长" values={[8, 7, 7, 6, 5, 6, 4, 4, 3, 3, 2, 2]} />
        <AnimatedStatCard numericTarget={6} suffix=" 类" label="证据类型覆盖" note="标注 · 语义 · 专家" values={[2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6]} />
      </section>

      <SectionCard title="处理流程" className="mt-8">
        <PipelineIconFlow nodes={pipelineNodes} activeIndex={2} />
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
````

## src/pages/ReportPage.tsx

``tsx
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
````

## src/pages/SampleAnalysisPage.tsx

``tsx
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { InfoIcon } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CandidateEvidencePanel } from '../features/analysis/components/CandidateEvidencePanel';
import { DetectionLogStream } from '../features/analysis/components/DetectionLogStream';
import { ExpertMeterPanel } from '../features/analysis/components/ExpertMeterPanel';
import { FusionVerdictPanel } from '../features/analysis/components/FusionVerdictPanel';
import { ImageScanCanvas, type ScanRegion } from '../features/analysis/components/ImageScanCanvas';
import { SemanticChainPanel } from '../features/analysis/components/SemanticChainPanel';
import { semanticSteps } from '../features/analysis/data';
import { PHASE_CONFIGS, type PhaseId, useDetectionPhases } from '../features/analysis/hooks/useDetectionPhases';
import { activeSample, samples } from '../features/samples/data';
import { findImportedSample } from '../features/samples/importedSamples';
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
  if (activePhase === 'expert-semantic' || activePhase === 'fusion' || activePhase === 'complete') return 'logic';
  return selectedEvidence?.semanticStepId ?? 'global';
}

function formatElapsed(ms: number) {
  const seconds = ms / 1000;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds - minutes * 60;
  return `${String(minutes).padStart(2, '0')}:${remaining.toFixed(1).padStart(4, '0')}`;
}

const ANALYSIS_DEMO_IMAGE_SRC = '/demo-assets/fake_example.png';

export function SampleAnalysisPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeSample.id;
  const importedSample = findImportedSample(sampleId);
  const selectedSample =
    importedSample?.type === 'image'
      ? importedSample
      : samples.find((sample) => sample.id === sampleId && sample.type === 'image') ?? activeSample;
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
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [localImage, setLocalImage] = useState(() => {
    const stored = readLocalAsset('image');
    return {
      dataUrl: stored.dataUrl ?? ANALYSIS_DEMO_IMAGE_SRC,
      name: stored.name ?? 'fake_example.png',
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
  const resolvedImageSrc = localImage.dataUrl ?? ANALYSIS_DEMO_IMAGE_SRC;

  const handleStart = useCallback(() => {
    setSelectedExpert(null);
    setStartedAt(performance.now());
    setElapsedMs(0);
    startDetection();
  }, [startDetection]);

  useEffect(() => {
    if (!isRunning || startedAt === null) return undefined;
    const timer = window.setInterval(() => {
      setElapsedMs(performance.now() - startedAt);
    }, 100);
    return () => window.clearInterval(timer);
  }, [isRunning, startedAt]);

  useEffect(() => {
    function handleDemoShortcut(event: KeyboardEvent) {
      if (event.shiftKey && event.key.toLowerCase() === 'd' && !isRunning) {
        event.preventDefault();
        handleStart();
      }
    }

    window.addEventListener('keydown', handleDemoShortcut);
    return () => window.removeEventListener('keydown', handleDemoShortcut);
  }, [handleStart, isRunning]);

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (dataUrl) => {
      saveLocalAsset('image', dataUrl, file.name);
      setLocalImage({ dataUrl, name: file.name });
      resetDetection();
    });
  }

  function handleReset() {
    setSelectedExpert(null);
    setStartedAt(null);
    setElapsedMs(0);
    resetDetection();
  }

  function handleGenerateReport() {
    navigate(`/report?sampleId=${selectedSample.id}`);
  }

  return (
    <PageShell eyebrow="检测工作台" title="图像证据可解释检测" description="">
      <div className="mb-4 rounded-xl border border-l-2 border-forensic-gold/[0.08] border-l-forensic-gold bg-graphite-850 p-4">
        <div className="mb-4 grid gap-2 border-b border-forensic-gold/[0.08] pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-forensic-stone/60 md:grid-cols-5">
          <div>
            <span className="block text-forensic-stone/40">SAMPLE-ID</span>
            <span className="mt-1 block truncate tabular-nums text-forensic-text">{selectedSample.id}</span>
          </div>
          <div>
            <span className="block text-forensic-stone/40">START</span>
            <span className="mt-1 block tabular-nums text-forensic-text">{startedAt ? 'T+00:00.0' : '--:--'}</span>
          </div>
          <div>
            <span className="block text-forensic-stone/40">ELAPSED</span>
            <span className="mt-1 block tabular-nums text-forensic-gold">{formatElapsed(elapsedMs)}</span>
          </div>
          <div>
            <span className="block text-forensic-stone/40">PHASE</span>
            <span className="mt-1 flex items-center gap-1.5 text-forensic-text">
              {activePhase}
              {isRunning && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-forensic-gold" />}
            </span>
          </div>
          <div>
            <span className="block text-forensic-stone/40">PROGRESS</span>
            <span className="mt-1 block tabular-nums text-forensic-gold">{progress}%</span>
          </div>
        </div>

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
            <button type="button" onClick={handleReset} className="rounded-md border border-forensic-gold/[0.08] bg-graphite-800 px-4 py-2 text-xs font-medium text-forensic-stone">
              重置
            </button>
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-forensic-stone">{isRunning ? `正在执行：${activePhaseLabel}` : isComplete ? '检测完成' : '就绪'}</span>
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
````

## src/pages/SampleLibraryPage.tsx

``tsx
import { useMemo, useState } from 'react';
import { samples } from '../features/samples/data';
import type { EvidenceSample } from '../features/samples/types';
import { addImportedSamples, getImportedSamples } from '../features/samples/importedSamples';
import { SampleCard } from '../features/samples/components/SampleCard';
import { SampleFilters } from '../features/samples/components/SampleFilters';
import { SampleImportPanel } from '../features/samples/components/SampleImportPanel';
import { SampleStatusPanel } from '../features/samples/components/SampleStatusPanel';
import { SampleTable } from '../features/samples/components/SampleTable';
import { PageShell } from '../layouts/PageShell';
import { SectionCard } from '../shared/components/SectionCard';

export function SampleLibraryPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedSample, setSelectedSample] = useState<EvidenceSample>(samples[0]);
  const [importedSamples, setImportedSamples] = useState<EvidenceSample[]>(() => getImportedSamples());
  const allSamples = useMemo(() => [...importedSamples, ...samples], [importedSamples]);
  const visibleMetrics = useMemo(
    () => ({
      total: allSamples.length,
      annotated: allSamples.filter((sample) => sample.annotationStatus !== 'pending').length,
      analyzed: allSamples.filter((sample) => sample.analysisStatus !== 'pending').length,
      highRisk: allSamples.filter((sample) => sample.riskLevel === 'high' || sample.riskLevel === 'critical').length,
    }),
    [allSamples],
  );

  const filteredSamples = useMemo(
    () =>
      allSamples.filter((sample) => {
        const matchesType = selectedType === 'all' || sample.type === selectedType;
        const matchesRisk = selectedRisk === 'all' || sample.riskLevel === selectedRisk;
        const matchesStatus =
          selectedStatus === 'all' || sample.annotationStatus === selectedStatus;
        const keyword = search.trim().toLowerCase();
        const matchesSearch =
          keyword.length === 0 ||
          sample.id.toLowerCase().includes(keyword) ||
          sample.title.toLowerCase().includes(keyword);
        return matchesType && matchesRisk && matchesStatus && matchesSearch;
      }),
    [allSamples, selectedType, selectedRisk, selectedStatus, search],
  );

  function handleImport(nextSamples: EvidenceSample[]) {
    addImportedSamples(nextSamples);
    setImportedSamples((current) => [...nextSamples, ...current]);
    setSelectedSample(nextSamples[0] ?? selectedSample);
  }

  return (
    <PageShell
      eyebrow="样本库"
      title="统一样本证据工作区"
      description="样本库连接导入、自动标注、可解释检测、证据融合与最终报告。"
    >
      <div className="mb-5 grid gap-3 md:grid-cols-4">
        {[
          { label: '总样本', value: visibleMetrics.total },
          { label: '待标注', value: visibleMetrics.total - visibleMetrics.annotated },
          { label: '已完成', value: visibleMetrics.analyzed },
          { label: '高风险', value: visibleMetrics.highRisk },
        ].map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 px-5 py-4 shadow-workstation"
          >
            <span className="font-mono text-3xl font-semibold tabular-nums text-forensic-gold">{metric.value}</span>
            <span className="text-right text-xs leading-5 text-forensic-stone">{metric.label}</span>
          </div>
        ))}
      </div>
      <SectionCard title="样本导入" eyebrow="输入层">
        <SampleImportPanel imported={importedSamples.length > 0} importedCount={importedSamples.length} onImport={handleImport} />
      </SectionCard>
      <div className="mt-5 grid grid-cols-[1fr_360px] gap-5">
        <div className="space-y-5">
          <SectionCard title="筛选条件">
            <SampleFilters
              selectedType={selectedType}
              selectedRisk={selectedRisk}
              selectedStatus={selectedStatus}
              search={search}
              onTypeChange={setSelectedType}
              onRiskChange={setSelectedRisk}
              onStatusChange={setSelectedStatus}
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
````

## src/pages/VideoAnnotationPage.tsx

``tsx
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { AnnotationLogStream } from '../features/annotation/components/AnnotationLogStream';
import { KeyframeStrip, type KeyframeItem } from '../features/annotation/components/KeyframeStrip';
import { SegmentPanel } from '../features/annotation/components/SegmentPanel';
import { VideoTimeline } from '../features/annotation/components/VideoTimeline';
import { activeVideoSample, samples } from '../features/samples/data';
import { findImportedSample } from '../features/samples/importedSamples';
import type { VideoSegmentEvidence } from '../features/samples/types';
import { PageShell } from '../layouts/PageShell';
import { PipelineStatusBar } from '../shared/components/PipelineStatusBar';
import { SectionCard } from '../shared/components/SectionCard';
import { VideoPlayer } from '../shared/components/VideoPlayer';
import { readFileAsDataUrl, readLocalAsset, saveLocalAsset } from '../shared/utils/localSample';

const VIDEO_ANNOTATION_STAGES = [
  {
    title: '视频读取',
    output: '抽取帧序列与时间轴',
    durationMs: 700,
    logLines: ['[INIT] 视频解码器就绪', '[INFO] 帧率: 25fps', '[INFO] 演示视频时长: 00:08'],
  },
  {
    title: '片段扫描',
    output: '发现可疑时间片段',
    durationMs: 1400,
    logLines: ['[SCAN] 时序一致性分析启动', '[SCAN] 00:01 → 00:03: 帧间运动向量异常', '[SCAN] 00:06 → 00:07: 光流一致性缺口', '[SCAN] 压缩痕迹检测完成', '[WARN] 发现 2 个可疑片段'],
  },
  {
    title: '关键帧定位',
    output: '输出关键帧 KF-01 至 KF-06',
    durationMs: 800,
    logLines: ['[KF] 定位关键帧 KF-01, KF-02, KF-03', '[KF] 定位关键帧 KF-04, KF-05, KF-06', '[OK] 关键帧提取完成'],
  },
  {
    title: '片段证据生成',
    output: '生成风险分数与复核状态',
    durationMs: 600,
    logLines: ['[CLUE] S-01: 时序边界漂移 → 风险 72%', '[CLUE] S-02: 运动一致性缺口 → 风险 79%', '[SAVE] 写入候选证据队列'],
  },
] as const;

function parseTimecode(value: string) {
  const parts = value.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return Number(value) || 0;
}

function formatTimecode(seconds: number) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remaining = safeSeconds - minutes * 60;
  return `${String(minutes).padStart(2, '0')}:${remaining.toFixed(2).padStart(5, '0')}`;
}

function alignDemoSegments(segments: VideoSegmentEvidence[], isDemoVideo: boolean) {
  if (!isDemoVideo) return segments;
  return segments.map((segment, index) => {
    if (index === 0) {
      return {
        ...segment,
        start: '00:01.00',
        end: '00:03.00',
        clue: '演示视频 1-3 秒片段存在时序边界漂移和运动一致性异常。',
      };
    }
    if (index === 1) {
      return {
        ...segment,
        start: '00:06.00',
        end: '00:07.00',
        clue: '演示视频 6-7 秒片段存在短时光流缺口和压缩痕迹异常。',
      };
    }
    return segment;
  });
}

function buildKeyframeItems(segment: VideoSegmentEvidence | undefined, captures: Record<string, string>) {
  if (!segment) return [];
  const start = parseTimecode(segment.start);
  const end = parseTimecode(segment.end);
  const span = Math.max(end - start, 0.2);

  return segment.keyframes.map((id, index) => {
    const ratio = segment.keyframes.length <= 1 ? 0.5 : index / (segment.keyframes.length - 1);
    const time = Math.min(start + span * ratio, Math.max(start, end - 0.05));
    return {
      id,
      src: captures[id],
      timeLabel: formatTimecode(time),
    };
  });
}

export function VideoAnnotationPage() {
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId') ?? activeVideoSample.id;
  const importedSample = findImportedSample(sampleId);
  const videoSample =
    importedSample?.type === 'video'
      ? importedSample
      : samples.find((sample) => sample.id === sampleId && sample.type === 'video') ?? activeVideoSample;
  const isDemoVideo = videoSample.id === 'VID-DEMO-001';
  const displaySegments = useMemo(() => alignDemoSegments(videoSample.segments, isDemoVideo), [isDemoVideo, videoSample.segments]);
  const [localVideo, setLocalVideo] = useState(() => {
    const stored = readLocalAsset('video');
    return {
      dataUrl: stored.dataUrl ?? videoSample.videoSrc ?? null,
      name: stored.name ?? '片段伪造视频.mp4',
    };
  });
  const videoSrc = localVideo.dataUrl ?? videoSample.videoSrc ?? null;

  const [selectedSegmentId, setSelectedSegmentId] = useState(displaySegments[0]?.id ?? '');
  const selectedSegment = useMemo(
    () => displaySegments.find((segment) => segment.id === selectedSegmentId) ?? displaySegments[0],
    [displaySegments, selectedSegmentId],
  );
  const [selectedFrame, setSelectedFrame] = useState(selectedSegment?.keyframes[0] ?? '');
  const [keyframeCaptures, setKeyframeCaptures] = useState<Record<string, string>>({});
  const [videoDuration, setVideoDuration] = useState(isDemoVideo ? 8 : 30);
  const [running, setRunning] = useState(false);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const reviewed = reviewedIds.has(selectedSegmentId);
  const [activeIndex, setActiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [videoLogLines, setVideoLogLines] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);

  const visibleSegmentCount = complete || activeIndex >= 2 ? displaySegments.length : 0;
  const visibleFrameCount =
    complete || activeIndex >= 3
      ? (selectedSegment?.keyframes.length ?? 0)
      : activeIndex >= 2
        ? Math.ceil((selectedSegment?.keyframes.length ?? 0) / 2)
        : 0;
  const keyframeItems: KeyframeItem[] = useMemo(
    () => buildKeyframeItems(selectedSegment, keyframeCaptures),
    [keyframeCaptures, selectedSegment],
  );

  useEffect(() => {
    if (!videoSrc || !selectedSegment) return undefined;

    let cancelled = false;
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const start = parseTimecode(selectedSegment.start);
    const end = parseTimecode(selectedSegment.end);
    const span = Math.max(end - start, 0.2);
    let captureIndex = 0;
    const targets = selectedSegment.keyframes.map((id, index) => {
      const ratio = selectedSegment.keyframes.length <= 1 ? 0.5 : index / (selectedSegment.keyframes.length - 1);
      return {
        id,
        time: Math.min(start + span * ratio, Math.max(start, end - 0.05)),
      };
    });

    function captureAt(index: number) {
      if (cancelled || !context) return;
      const target = targets[index];
      if (!target) return;
      captureIndex = index;
      video.currentTime = Math.min(target.time, Math.max(video.duration - 0.05, 0));
    }

    video.preload = 'auto';
    video.muted = true;
    video.src = videoSrc;

    video.onloadedmetadata = () => {
      if (cancelled || !context) return;
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 180;
      captureAt(0);
    };

    video.onseeked = () => {
      if (cancelled || !context) return;
      const safeIndex = captureIndex;
      const target = targets[safeIndex];
      if (!target) return;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      setKeyframeCaptures((previous) => ({ ...previous, [target.id]: dataUrl }));
      captureAt(safeIndex + 1);
    };

    video.load();

    return () => {
      cancelled = true;
      video.removeAttribute('src');
      video.load();
    };
  }, [selectedSegment, videoSrc]);

  function runAnnotation() {
    setRunning(true);
    setComplete(false);
    setActiveIndex(0);
    setVideoLogLines([]);
    setScanProgress(0);

    let elapsed = 0;
    VIDEO_ANNOTATION_STAGES.forEach((stage, stageIndex) => {
      window.setTimeout(() => {
        setActiveIndex(stageIndex);
        if (stageIndex === VIDEO_ANNOTATION_STAGES.length - 1) {
          window.setTimeout(() => {
            setRunning(false);
            setComplete(true);
            setScanProgress(100);
          }, stage.durationMs);
        }
      }, elapsed);

      const lineInterval = stage.durationMs / (stage.logLines.length + 1);
      stage.logLines.forEach((line, lineIndex) => {
        window.setTimeout(() => {
          setVideoLogLines((prev) => [...prev, line]);
        }, elapsed + lineInterval * (lineIndex + 1));
      });

      if (stageIndex === 1) {
        const progressInterval = stage.durationMs / 20;
        for (let step = 1; step <= 20; step++) {
          window.setTimeout(() => {
            setScanProgress(step * 5);
          }, elapsed + progressInterval * step);
        }
      }

      elapsed += stage.durationMs;
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
          <div className="flex items-center gap-3 rounded-lg border border-forensic-gold/[0.08] bg-graphite-900 px-4 py-2.5 text-xs">
            <span className="text-forensic-stone">当前阶段</span>
            <motion.span
              key={activeIndex}
              className="font-medium text-forensic-gold"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {running
                ? VIDEO_ANNOTATION_STAGES[activeIndex]?.title ?? '准备中'
                : complete
                  ? '✓ ' + VIDEO_ANNOTATION_STAGES[VIDEO_ANNOTATION_STAGES.length - 1].title
                  : '就绪'}
            </motion.span>
            {running && <span className="ml-auto text-forensic-stone">{VIDEO_ANNOTATION_STAGES[activeIndex]?.output}</span>}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-[1.6fr_430px]">
        <div className="space-y-5">
          <SectionCard title="视频播放器" eyebrow="本地样本">
            <VideoPlayer
              src={videoSrc}
              onLoadedMetadata={(duration) => {
                if (Number.isFinite(duration) && duration > 0) setVideoDuration(duration);
              }}
            />
          </SectionCard>
          <SectionCard title="取证时间线" eyebrow="可疑片段">
            <VideoTimeline
              segments={displaySegments}
              selectedId={selectedSegment.id}
              onSelect={(id) => {
                setSelectedSegmentId(id);
                const nextSegment = displaySegments.find((segment) => segment.id === id);
                setSelectedFrame(nextSegment?.keyframes[0] ?? '');
              }}
              visibleCount={visibleSegmentCount}
              isScanning={running && activeIndex === 1}
              scanProgress={scanProgress}
              durationSeconds={videoDuration}
            />
          </SectionCard>
          <SectionCard title="标注日志" eyebrow="实时处理">
            <AnnotationLogStream lines={videoLogLines} isRunning={running} isComplete={complete} />
          </SectionCard>
        </div>
        <SectionCard title="片段标注面板" eyebrow="选中片段">
          <SegmentPanel
            segment={selectedSegment}
            running={running}
            reviewed={reviewed}
            onRun={runAnnotation}
            onReview={() => setReviewedIds((prev) => new Set([...prev, selectedSegmentId]))}
          />
        </SectionCard>
      </div>

      <SectionCard title="关键帧条" eyebrow={`选中帧：${selectedFrame}`} className="mt-5">
        <KeyframeStrip frames={keyframeItems} selectedFrame={selectedFrame} onSelect={setSelectedFrame} visibleCount={visibleFrameCount} />
      </SectionCard>
    </PageShell>
  );
}
````

## src/shared/components/EmptyAssetPlaceholder.tsx

``tsx
import { motion, useReducedMotion } from 'framer-motion';
import { ScanSearch } from 'lucide-react';

type EmptyAssetPlaceholderProps = {
  label: string;
  detail?: string;
};

export function EmptyAssetPlaceholder({ label, detail }: EmptyAssetPlaceholderProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative flex h-full min-h-52 flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-forensic-gold/[0.08] bg-graphite-950/50 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(184,138,68,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,138,68,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <motion.div
        className="relative mb-3"
        animate={prefersReduced ? undefined : { opacity: [0.5, 0.8, 0.5] }}
        transition={prefersReduced ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ScanSearch className="h-8 w-8 text-forensic-gold/40" />
      </motion.div>
      <p className="relative text-sm font-medium text-forensic-stone/60">{label}</p>
      {detail && <p className="relative mt-1 max-w-[200px] text-xs leading-5 text-forensic-stone/40">{detail}</p>}
    </div>
  );
}
````

## src/shared/components/HeroDemoCard.tsx

``tsx
import { motion, useReducedMotion } from 'framer-motion';

export function HeroDemoCard() {
  const prefersReduced = useReducedMotion();
  const regions = [
    { id: 'R-01', x: 57, y: 24, w: 24, h: 19, confidence: 82, delay: 0 },
    { id: 'R-02', x: 22, y: 53, w: 26, h: 20, confidence: 74, delay: 1.5 },
    { id: 'R-03', x: 39, y: 31, w: 18, h: 28, confidence: 68, delay: 3 },
  ];

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-forensic-gold/25 bg-graphite-950 shadow-workstation">
      <div className="absolute left-3 top-3 z-30 h-4 w-4 border-l-2 border-t-2 border-forensic-gold" />
      <div className="absolute right-3 top-3 z-30 h-4 w-4 border-r-2 border-t-2 border-forensic-gold" />
      <div className="absolute bottom-3 left-3 z-30 h-4 w-4 border-b-2 border-l-2 border-forensic-gold" />
      <div className="absolute bottom-3 right-3 z-30 h-4 w-4 border-b-2 border-r-2 border-forensic-gold" />

      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-2 border-b border-forensic-gold/15 bg-graphite-950/80 px-4 py-2 backdrop-blur">
        <div className="flex items-center gap-2 font-mono text-[10px] tabular-nums text-forensic-stone">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-forensic-risk" />
          SAMPLE · IMG-DEMO-FAKE
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-forensic-gold">ANALYZING</span>
      </div>

      <img src="/demo-assets/fake.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />

      {!prefersReduced && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #B88A44, rgba(184,138,68,0.6), #B88A44, transparent)',
            boxShadow: '0 0 16px 4px rgba(184,138,68,0.5)',
            animation: 'hero-scan 4s linear infinite',
          }}
        />
      )}

      {regions.map((region) => (
        <motion.div
          key={region.id}
          className="absolute z-20"
          style={{ left: `${region.x}%`, top: `${region.y}%`, width: `${region.w}%`, height: `${region.h}%` }}
          animate={prefersReduced ? undefined : { opacity: [0, 1, 1, 0] }}
          transition={prefersReduced ? undefined : { duration: 4.5, repeat: Infinity, delay: region.delay, times: [0, 0.15, 0.85, 1] }}
        >
          <div className="absolute inset-0 rounded border border-forensic-risk/80 bg-forensic-risk/10" />
          <div className="absolute -left-px -top-px h-2 w-2 border-l-2 border-t-2 border-forensic-risk" />
          <div className="absolute -right-px -top-px h-2 w-2 border-r-2 border-t-2 border-forensic-risk" />
          <div className="absolute -bottom-px -left-px h-2 w-2 border-b-2 border-l-2 border-forensic-risk" />
          <div className="absolute -bottom-px -right-px h-2 w-2 border-b-2 border-r-2 border-forensic-risk" />
          <div className="absolute -top-5 left-0 rounded bg-graphite-950/95 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-forensic-risk">
            {region.id} · {region.confidence}%
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-12 right-4 z-30 rounded-md border border-forensic-risk/60 bg-graphite-950/90 px-3 py-2 backdrop-blur">
        <div className="font-mono text-[9px] uppercase tracking-widest text-forensic-stone">VERDICT</div>
        <div className="mt-0.5 font-mono text-sm font-bold text-forensic-risk">AI-GENERATED</div>
        <div className="font-mono text-[10px] tabular-nums text-forensic-risk/80">CONFIDENCE 82%</div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-4 gap-2 border-t border-forensic-gold/15 bg-graphite-950/85 px-3 py-2 backdrop-blur">
        {[
          { label: '空间', value: '82' },
          { label: '频域', value: '76' },
          { label: '风格', value: '68' },
          { label: '语义', value: '89' },
        ].map((metric) => (
          <div key={metric.label} className="text-center">
            <div className="font-mono text-[9px] uppercase tracking-wider text-forensic-stone/60">{metric.label}</div>
            <div className="font-mono text-xs tabular-nums text-forensic-gold">{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
````

## src/shared/components/MetricStat.tsx

``tsx
type MetricStatProps = {
  value: string;
  label: string;
  color?: 'cyan' | 'purple' | 'gold';
};

const colorClass: Record<NonNullable<MetricStatProps['color']>, string> = {
  cyan: 'text-forensic-gold',
  purple: 'text-forensic-olive',
  gold: 'text-forensic-warning',
};

export function MetricStat({ value, label, color = 'cyan' }: MetricStatProps) {
  return (
    <div className="rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-6 text-center backdrop-blur-xl">
      <p className={`text-5xl font-bold tabular-nums ${colorClass[color]}`}>{value}</p>
      <p className="mt-3 text-sm text-forensic-stone">{label}</p>
    </div>
  );
}
````

## src/shared/components/PipelineIconFlow.tsx

``tsx
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type FlowNode = {
  icon: LucideIcon;
  label: string;
};

type PipelineIconFlowProps = {
  nodes: FlowNode[];
  activeIndex?: number;
};

export function PipelineIconFlow({ nodes, activeIndex = 2 }: PipelineIconFlowProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex items-center justify-between gap-2">
      {nodes.map((node, index) => {
        const Icon = node.icon;
        const isActive = index === activeIndex;
        const isComplete = index < activeIndex;

        return (
          <div key={node.label} className="flex flex-1 items-center">
            <motion.div
              className={`relative flex min-w-0 flex-1 flex-col items-center overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 px-3 py-5 transition-colors hover:border-forensic-gold/25 hover:bg-graphite-800 ${
                isActive ? 'ring-2 ring-forensic-gold/40' : ''
              }`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
            >
              {isActive && !prefersReduced && <div className="animate-pulse-ring absolute -inset-1 rounded-xl border border-forensic-gold/30" />}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(184,138,68,0.18), transparent)' }}
              />
              {isComplete && <CheckCircle2 className="absolute left-2 top-2 h-3.5 w-3.5 text-forensic-olive" />}
              <span className="mb-2 font-mono text-[10px] tabular-nums text-forensic-stone/40">0{index + 1}</span>
              <Icon className={`h-5 w-5 ${isComplete ? 'text-forensic-olive' : 'text-forensic-gold'}`} />
              <span className="mt-2.5 text-xs font-medium text-forensic-text">{node.label}</span>
            </motion.div>

            {index < nodes.length - 1 && (
              <div className="relative mx-2 flex h-px w-8 flex-shrink-0 items-center overflow-hidden bg-forensic-gold/15">
                {!prefersReduced && (
                  <motion.div
                    className="absolute h-1.5 w-1.5 rounded-full bg-forensic-gold"
                    animate={{ x: ['-100%', '700%'] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: index * 0.35,
                    }}
                    style={{ top: '-2px' }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
````

## src/shared/components/PipelineStatusBar.tsx

``tsx
import { Check, Circle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

type PipelineStatusBarProps = {
  steps: string[];
  currentStep: number;
  complete?: boolean;
};

export function PipelineStatusBar({ steps, currentStep, complete = false }: PipelineStatusBarProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="grid gap-2 rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-3 backdrop-blur-xl"
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((step, index) => {
        const done = complete || index < currentStep;
        const active = !complete && index === currentStep;
        const isPreviousComplete = index > 0 && (complete || index - 1 < currentStep);

        return (
          <div
            key={step}
            className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-lg border px-3 py-2 text-sm ${
              active
                ? 'border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold'
                : done
                  ? 'border-forensic-olive/35 bg-forensic-olive/10 text-forensic-olive'
                  : 'border-forensic-gold/[0.08] bg-graphite-800 text-forensic-stone'
            }`}
          >
            {active && !prefersReduced && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'rgba(184,138,68,0.35)' }}
              />
            )}
            {isPreviousComplete && active && !prefersReduced && (
              <motion.div
                className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-forensic-gold"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            )}
            <span className="relative z-10">
              {done ? (
                <motion.span
                  className="block"
                  initial={prefersReduced ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Check className="h-4 w-4 text-forensic-olive" />
                </motion.span>
              ) : (
                <Circle className="h-3 w-3" />
              )}
            </span>
            <span className="relative z-10">{step}</span>
          </div>
        );
      })}
    </div>
  );
}
````

## src/shared/components/ScoreBar.tsx

``tsx
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { formatPercent } from '../utils/format';

type ScoreBarProps = {
  label: string;
  value: number;
  tone?: 'gold' | 'olive' | 'risk' | 'warning';
};

const toneClass = {
  gold: 'bg-forensic-gold',
  olive: 'bg-forensic-olive',
  risk: 'bg-forensic-risk',
  warning: 'bg-forensic-warning',
};

export function ScoreBar({ label, value, tone = 'gold' }: ScoreBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-forensic-stone">
        <span>{label}</span>
        <motion.span className="tabular-nums" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {formatPercent(value)}
        </motion.span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-graphite-800">
        <motion.div
          className={cn('h-full rounded-full', toneClass[tone])}
          initial={{ width: '0%' }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  );
}
````

## src/shared/components/SectionCard.tsx

``tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

type SectionCardProps = {
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

// Shared workstation panel wrapper for consistent borders, spacing, and reveal motion.
export function SectionCard({ title, eyebrow, action, children, className }: SectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        borderColor: 'rgba(184,138,68,0.22)',
        backgroundColor: 'rgba(32,36,40,0.95)',
        y: -1,
        boxShadow: '0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(184,138,68,0.12)',
      }}
      transition={{ duration: 0.24 }}
      className={cn(
        'relative overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-850 p-5 shadow-workstation backdrop-blur-xl',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(184,138,68,0.18) 30%, rgba(255,255,255,0.08) 50%, rgba(184,138,68,0.18) 70%, transparent 100%)',
        }}
      />
      {(title || eyebrow || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {eyebrow && <p className="text-xs uppercase tracking-[0.18em] text-forensic-gold">{eyebrow}</p>}
            {title && <h2 className="mt-1 text-lg font-semibold text-forensic-text">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      {children}
    </motion.section>
  );
}
````

## src/shared/components/StatusBadge.tsx

``tsx
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

type StatusBadgeProps = {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'risk' | 'olive' | 'gold';
  className?: string;
};

const toneClass: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  neutral: 'border-forensic-gold/[0.08] text-forensic-stone bg-graphite-800',
  success: 'border-forensic-olive/35 text-forensic-olive bg-forensic-olive/10',
  warning: 'border-forensic-warning/35 text-forensic-warning bg-forensic-warning/10',
  risk: 'border-forensic-risk/35 text-forensic-risk bg-forensic-risk/10',
  olive: 'border-forensic-olive/35 text-forensic-olive bg-forensic-olive/10',
  gold: 'border-forensic-gold/35 text-forensic-gold bg-forensic-gold/10',
};

export function StatusBadge({ children, tone = 'neutral', className }: StatusBadgeProps) {
  const prefersReduced = useReducedMotion();
  const childStr = typeof children === 'string' ? children : '';
  const isActive =
    tone === 'warning' &&
    (childStr.includes('处理中') || childStr.includes('分析中') || childStr.includes('待复核') || childStr.includes('运行中'));
  const isRunning = tone === 'warning' && childStr.includes('处理中');

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium tabular-nums',
        toneClass[tone],
        className,
      )}
    >
      {isActive && (
        <motion.span
          className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
          style={{
            backgroundColor: '#D2A64A',
          }}
          animate={isRunning && !prefersReduced ? { opacity: [1, 0.3, 1], scale: [1, 1.3, 1] } : { opacity: 1 }}
          transition={isRunning && !prefersReduced ? { duration: 1, repeat: Infinity } : { duration: 0 }}
        />
      )}
      {children}
    </span>
  );
}
````

## src/shared/components/VideoPlayer.tsx

``tsx
import { Play, ScanLine } from 'lucide-react';

type VideoPlayerProps = {
  src?: string | null;
  onLoadedMetadata?: (duration: number) => void;
};

export function VideoPlayer({ src, onLoadedMetadata }: VideoPlayerProps) {
  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-forensic-gold/[0.08] bg-graphite-900">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#2d3338_1px,transparent_1px),linear-gradient(90deg,#2d3338_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-forensic-gold/[0.08] bg-graphite-950/80 px-3 py-1 text-xs text-forensic-stone backdrop-blur">
        <ScanLine className="h-3.5 w-3.5 text-forensic-gold" />
        本地视频样本
      </div>
      {src ? (
        <video
          src={src}
          controls
          onLoadedMetadata={(event) => onLoadedMetadata?.(event.currentTarget.duration)}
          className="relative h-full w-full object-contain"
        />
      ) : (
        <button
          type="button"
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-forensic-gold/50 bg-forensic-gold/10 text-forensic-gold"
        >
          <Play className="h-7 w-7 fill-current" />
        </button>
      )}
    </div>
  );
}
````

## src/shared/types/common.ts

``ts
export type StatusTone = 'neutral' | 'success' | 'warning' | 'risk';

export type Metric = {
  label: string;
  value: string;
  detail: string;
  tone: StatusTone;
};
````

## src/shared/utils/chartTheme.ts

``ts
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
````

## src/shared/utils/cn.ts

``ts
type ClassName = string | false | null | undefined;

export function cn(...inputs: ClassName[]) {
  return inputs.filter(Boolean).join(' ');
}
````

## src/shared/utils/format.ts

``ts
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
````

## src/shared/utils/localSample.ts

``ts
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
````

## src/styles/globals.css

``css
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

/* Custom scrollbar - WebKit */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(184, 138, 68, 0.2);
  border-radius: 99px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(184, 138, 68, 0.4);
}

/* Refined text selection */
::selection {
  background: rgba(184, 138, 68, 0.22);
  color: #F3F0EA;
}

.forensic-noise {
  position: relative;
}

.forensic-noise::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.35;
  pointer-events: none;
  border-radius: inherit;
  z-index: 0;
}

@keyframes hero-scan {
  0% {
    top: 8%;
  }
  100% {
    top: 92%;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    scroll-behavior: auto !important;
  }
}
````
