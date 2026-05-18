# VeriLoop

VeriLoop is a frontend prototype for a forensic evidence-loop platform. It demonstrates a closed workflow for synthetic media forensics: reverse-chain annotation, expert-group detection, evolution alerts, and structured evidence reporting.

The interface uses a forensic archive style to distinguish the project from generic AI product demos.

## Scope

Frontend-only prototype with mock data and local demo assets. No backend inference service is required.

## Core Workflows

- Overview dashboard with VeriLoop forensic branding
- Image annotation as a 5-stage reverse generation chain
- Video annotation as a 5-stage reverse generation chain
- Sample analysis workbench with expert fusion verdict
- Evolution loop animation for expert blind-spot recovery
- Report page with four-layer interactive evidence flow map
- Archive-style evidence report preview

## Reverse Generation Chains

Image annotation:

1. Semantic inversion
2. Tampering target selection
3. Inpainting execution
4. Four-layer label output
5. Quality audit and evolution alert

Video annotation:

1. Video parsing and ASR extraction
2. Reverse text rewriting
3. Multimodal segment synthesis
4. Four-level label output
5. Detector self-audit and difficulty archiving

## Tech Stack

Vite, React, TypeScript, Tailwind CSS, React Router, Framer Motion, ECharts, React Flow, lucide-react, pnpm.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## Routes

- `/`
- `/samples`
- `/analysis/sample`
- `/annotation/image`
- `/annotation/video`
- `/report`

## Notes

- Demo data lives under `src/features/*/data`.
- Demo media assets live under `public/demo-assets`.
- Generated verification screenshots live under `artifacts`.
