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
