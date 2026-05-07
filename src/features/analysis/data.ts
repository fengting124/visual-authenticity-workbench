import type { EvidenceItem, ExpertResult, SemanticStep } from './types';

export const semanticSteps: SemanticStep[] = [
  {
    id: 'global',
    name: 'Global Understanding',
    input: 'Full visual sample and prompt metadata',
    result: 'Indoor workstation scene with multiple reflective and fine-texture surfaces.',
    explanation: 'Scene-level structure is coherent, while material behavior needs localized verification.',
  },
  {
    id: 'local',
    name: 'Local Parsing',
    input: 'Detected regions, object boundaries, and keyframe candidates',
    result: 'Two suspicious regions show reflection and texture deviations.',
    explanation: 'Local cues are concentrated around surface transitions and object edges.',
  },
  {
    id: 'logic',
    name: 'Logic Verification',
    input: 'Spatial relations, lighting direction, and temporal continuity',
    result: 'Reflection direction conflicts with object geometry in region R-01.',
    explanation: 'The evidence is semantic and physical, so it is retained for expert fusion.',
  },
  {
    id: 'explain',
    name: 'Explanation Output',
    input: 'Verified semantic and local evidence',
    result: 'Sample requires expert review with medium-high authenticity risk.',
    explanation: 'The final chain links global scene assumptions to localized forensic evidence.',
  },
];

export const expertResults: ExpertResult[] = [
  {
    id: 'spatial',
    name: 'Spatial Expert',
    focus: 'Geometry, perspective, and object-boundary consistency',
    score: 76,
    evidence: 'Reflection geometry diverges from visible object alignment in the marked area.',
    status: 'Evidence retained',
  },
  {
    id: 'frequency',
    name: 'Frequency Expert',
    focus: 'Compression traces and high-frequency texture regularity',
    score: 63,
    evidence: 'Localized texture banding appears near the surface transition.',
    status: 'Supporting signal',
  },
  {
    id: 'style',
    name: 'Style Expert',
    focus: 'Rendering style stability across regions and frames',
    score: 58,
    evidence: 'Material rendering remains mostly stable with a minor style boundary.',
    status: 'Low-weight signal',
  },
  {
    id: 'semantic',
    name: 'Semantic Expert',
    focus: 'Prompt alignment, object logic, and scene plausibility',
    score: 71,
    evidence: 'Scene intent matches metadata, but local physics cues reduce trust.',
    status: 'Evidence retained',
  },
];

export const evidenceSummary: EvidenceItem[] = [
  { label: 'Primary cue', value: 'Reflection mismatch in localized region' },
  { label: 'Secondary cue', value: 'Texture discontinuity around object boundary' },
  { label: 'Fusion result', value: 'Multi-evidence medium-high risk' },
  { label: 'Review status', value: 'Human expert confirmation pending' },
];

export const riskDistribution = [
  { name: 'Low', value: 32 },
  { name: 'Moderate', value: 41 },
  { name: 'High', value: 21 },
  { name: 'Critical', value: 6 },
];
