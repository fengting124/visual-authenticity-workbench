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
