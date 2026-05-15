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
