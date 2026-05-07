import type { ReportSectionData } from './types';

export const reportSections: ReportSectionData[] = [
  {
    title: 'Sample Information',
    rows: [
      { label: 'Sample ID', value: 'IMG-DEMO-014' },
      { label: 'Source', value: 'Local benchmark subset' },
      { label: 'Category', value: 'Indoor scene' },
      { label: 'Review state', value: 'Expert review pending' },
    ],
  },
  {
    title: 'Semantic-Chain Evidence',
    rows: [
      { label: 'Global understanding', value: 'Indoor workstation scene with reflective surfaces.' },
      { label: 'Local parsing', value: 'Two localized suspicious regions retained.' },
      { label: 'Logic verification', value: 'Reflection direction conflicts with visible geometry.' },
    ],
  },
  {
    title: 'Expert-Group Evidence',
    rows: [
      { label: 'Spatial expert', value: 'High contribution from geometry inconsistency.' },
      { label: 'Frequency expert', value: 'Supporting texture regularity signal.' },
      { label: 'Style expert', value: 'Minor rendering boundary evidence.' },
      { label: 'Semantic expert', value: 'Prompt alignment acceptable with local physical conflict.' },
    ],
  },
  {
    title: 'Review Suggestion',
    rows: [
      { label: 'Decision', value: 'Medium-high authenticity risk' },
      { label: 'Next review', value: 'Verify marked regions and compare with source metadata.' },
    ],
  },
];
