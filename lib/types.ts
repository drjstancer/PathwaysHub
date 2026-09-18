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

export type ParticipantStatus = 'Active'|'Completed'|'On Hold'|'Withdrawn';

export type Participant = {
  id: string;
  institutionalId: string;
  name: string;
  preferredName?: string;
  email: string;
  institution: string;
  classification: string;
  advisor: string;
  programs: ProgramCode[];
  cohort: string;
  stage: string;
  status: ParticipantStatus;
  attendanceRate: number;
  requirementRate: number;
  overallGpa: number;
  scienceGpa: number;
  shadowingHours: number;
  clinicalHours: number;
  researchHours: number;
  serviceHours: number;
  leadershipHours: number;
  meetingsCompleted: number;
  meetingsRequired: number;
  openAlerts: number;
  lastContact: string;
  nextAction: string;
  journey: string[];
};

export type Cohort = {
  id: string;
  program: ProgramCode;
  code: string;
  name: string;
  cohortType: 'Entering Class'|'Program Year'|'Academic Year'|'Event Cohort'|'Other';
  status: 'Active'|'Completed'|'Planned';
  memberCount: number;
  start: string;
  end?: string;
};

export type ParticipantActivity = {
  id: string;
  date: string;
  pillar: 'Engagement'|'Support'|'Progress'|'Development'|'Intervention';
  title: string;
  detail: string;
};
