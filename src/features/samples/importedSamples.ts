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
