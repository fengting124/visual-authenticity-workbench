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
