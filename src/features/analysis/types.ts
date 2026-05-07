export type SemanticStep = {
  id: string;
  name: string;
  input: string;
  result: string;
  explanation: string;
};

export type ExpertResult = {
  id: string;
  name: string;
  focus: string;
  score: number;
  evidence: string;
  status: string;
};

export type EvidenceItem = {
  label: string;
  value: string;
};
