export type ProgramCode = 'JPAWS'|'PAWS'|'PEN'|'BRYANT'|'SPRINGFIELD'|'MMRSEP'|'MEDX'|'MEDPREP1'|'MEDPREP2';

export type ProgramMetric = {
  code: ProgramCode;
  name: string;
  active: number;
  attendanceRate: number;
  requirementRate: number;
  avgGpa: number;
  avgScienceGpa: number;
  completers: number;
  matriculants: number;
  missouriMatches: number;
  primaryCareMatches: number;
};

export type Participant = {
  id: string;
  name: string;
  institution: string;
  programs: ProgramCode[];
  cohort: string;
  stage: string;
  attendanceRate: number;
  overallGpa: number;
  scienceGpa: number;
  shadowingHours: number;
  serviceHours: number;
  meetingsCompleted: number;
  meetingsRequired: number;
  openAlerts: number;
  journey: string[];
};
