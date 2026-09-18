import type { Cohort, Participant, ParticipantActivity, ProgramMetric } from './types';

export const programs: ProgramMetric[] = [
  {code:'PAWS',name:'PAWS',active:42,attendanceRate:92,requirementRate:94,avgGpa:3.54,avgScienceGpa:3.43,completers:85,matriculants:62,missouriMatches:20,primaryCareMatches:17},
  {code:'JPAWS',name:'JPAWS',active:34,attendanceRate:90,requirementRate:91,avgGpa:3.48,avgScienceGpa:3.37,completers:74,matriculants:29,missouriMatches:8,primaryCareMatches:7},
  {code:'PEN',name:'Physician ENgineers',active:20,attendanceRate:91,requirementRate:90,avgGpa:3.57,avgScienceGpa:3.51,completers:48,matriculants:31,missouriMatches:9,primaryCareMatches:7},
  {code:'BRYANT',name:'Bryant Scholars',active:26,attendanceRate:89,requirementRate:96,avgGpa:3.50,avgScienceGpa:3.43,completers:57,matriculants:39,missouriMatches:14,primaryCareMatches:11},
  {code:'SPRINGFIELD',name:'Springfield Scholars',active:16,attendanceRate:93,requirementRate:95,avgGpa:3.61,avgScienceGpa:3.49,completers:33,matriculants:25,missouriMatches:11,primaryCareMatches:8}
];

export const participants: Participant[] = [
  {id:'avery',institutionalId:'14000001',name:'Avery Johnson',preferredName:'Avery',email:'avery.johnson@example.edu',institution:'University of Missouri',classification:'Senior',advisor:'Dr. Stancer',programs:['MMRSEP','JPAWS','PAWS'],cohort:'PAWS EC30',stage:'Preadmission',status:'Active',attendanceRate:94,requirementRate:100,overallGpa:3.72,scienceGpa:3.58,shadowingHours:42,clinicalHours:16,researchHours:24,serviceHours:35,leadershipHours:18,meetingsCompleted:6,meetingsRequired:6,openAlerts:0,lastContact:'Sep 11, 2026',nextAction:'No action due',journey:['MMRSEP 2023','JPAWS 2024','PAWS EC30','Current']},
  {id:'maya',institutionalId:'14000002',name:'Maya Robinson',preferredName:'Maya',email:'maya.robinson@example.edu',institution:'Lincoln University',classification:'Junior',advisor:'Dr. Simmons',programs:['JPAWS','PAWS'],cohort:'PAWS EC29',stage:'Preadmission',status:'Active',attendanceRate:88,requirementRate:83,overallGpa:3.61,scienceGpa:3.44,shadowingHours:26,clinicalHours:12,researchHours:10,serviceHours:48,leadershipHours:22,meetingsCompleted:5,meetingsRequired:6,openAlerts:1,lastContact:'Sep 12, 2026',nextAction:'HTM follow-up due Sep 25',journey:['JPAWS 2024','PAWS EC29','Current']},
  {id:'jordan',institutionalId:'14000003',name:'Jordan Ellis',preferredName:'Jordan',email:'jordan.ellis@example.edu',institution:'Missouri State University',classification:'Junior',advisor:'Lacey Runge',programs:['PEN'],cohort:'PEN 2026',stage:'Participant',status:'Active',attendanceRate:73,requirementRate:78,overallGpa:3.34,scienceGpa:3.21,shadowingHours:18,clinicalHours:8,researchHours:0,serviceHours:14,leadershipHours:8,meetingsCompleted:2,meetingsRequired:3,openAlerts:2,lastContact:'Sep 16, 2026',nextAction:'Attendance outreach + reflection review',journey:['PEN 2026','Current']},
  {id:'cameron',institutionalId:'14000004',name:'Cameron Brooks',preferredName:'Cameron',email:'cameron.brooks@example.edu',institution:'University of Missouri',classification:'Graduate',advisor:'Dr. Stancer',programs:['PAWS','MEDPREP2'],cohort:'PAWS EC27',stage:'Matriculant',status:'Completed',attendanceRate:96,requirementRate:100,overallGpa:3.65,scienceGpa:3.49,shadowingHours:54,clinicalHours:30,researchHours:32,serviceHours:62,leadershipHours:27,meetingsCompleted:8,meetingsRequired:8,openAlerts:0,lastContact:'May 15, 2026',nextAction:'PathwaysHub outcome follow-up',journey:['PAWS EC27','MedPrep II','MU SOM 2027']}
];

export const cohorts: Cohort[] = [
  {id:'paws-ec30',program:'PAWS',code:'EC30',name:'PAWS EC30',cohortType:'Entering Class',status:'Active',memberCount:18,start:'Fall 2025'},
  {id:'paws-ec29',program:'PAWS',code:'EC29',name:'PAWS EC29',cohortType:'Entering Class',status:'Active',memberCount:14,start:'Fall 2024'},
  {id:'paws-ec28',program:'PAWS',code:'EC28',name:'PAWS EC28',cohortType:'Entering Class',status:'Active',memberCount:10,start:'Fall 2023'},
  {id:'jpaws-2026',program:'JPAWS',code:'2026',name:'JPAWS 2026',cohortType:'Program Year',status:'Active',memberCount:20,start:'Fall 2026'},
  {id:'pen-2026',program:'PEN',code:'2026',name:'PEN 2026',cohortType:'Program Year',status:'Active',memberCount:20,start:'Fall 2026'},
  {id:'bryant-ec30',program:'BRYANT',code:'EC30',name:'Bryant Scholars EC30',cohortType:'Entering Class',status:'Active',memberCount:12,start:'Fall 2026'},
  {id:'springfield-ec30',program:'SPRINGFIELD',code:'EC30',name:'Springfield Scholars EC30',cohortType:'Entering Class',status:'Active',memberCount:8,start:'Fall 2026'},
  {id:'mmrsep-2026',program:'MMRSEP',code:'2026',name:'MMRSEP 2026',cohortType:'Program Year',status:'Completed',memberCount:24,start:'Summer 2026',end:'Summer 2026'}
];

export const participantActivity: Record<string, ParticipantActivity[]> = {
  avery:[
    {id:'av1',date:'Sep 11, 2026',pillar:'Engagement',title:'Professionalism Workshop',detail:'Attended required PAWS workshop.'},
    {id:'av2',date:'Sep 8, 2026',pillar:'Support',title:'High Touch Mentor Meeting',detail:'Fall goals reviewed; no follow-up required.'},
    {id:'av3',date:'Sep 4, 2026',pillar:'Development',title:'Shadowing Experience Reviewed',detail:'4.0 hours · Family Medicine.'},
    {id:'av4',date:'Aug 28, 2026',pillar:'Progress',title:'Academic Snapshot Updated',detail:'Overall GPA 3.72 · Science GPA 3.58.'}
  ],
  maya:[
    {id:'ma1',date:'Sep 12, 2026',pillar:'Support',title:'High Touch Mentor Meeting',detail:'Follow-up requested for attendance barriers.'},
    {id:'ma2',date:'Sep 11, 2026',pillar:'Engagement',title:'Professionalism Workshop',detail:'Attended required PAWS workshop.'},
    {id:'ma3',date:'Sep 10, 2026',pillar:'Intervention',title:'Follow-Up Opened',detail:'Required mentor follow-up due Sep 25.'},
    {id:'ma4',date:'Aug 28, 2026',pillar:'Progress',title:'Academic Snapshot Updated',detail:'Overall GPA 3.61 · Science GPA 3.44.'}
  ],
  jordan:[
    {id:'jo1',date:'Sep 18, 2026',pillar:'Engagement',title:'Clinical Prep',detail:'No-show recorded; attendance follow-up opened.'},
    {id:'jo2',date:'Sep 16, 2026',pillar:'Intervention',title:'Attendance Outreach',detail:'Second outreach attempt documented.'},
    {id:'jo3',date:'Sep 15, 2026',pillar:'Development',title:'Shadowing Submitted',detail:'8.0 hours · Emergency Medicine · reflection pending review.'},
    {id:'jo4',date:'Sep 11, 2026',pillar:'Engagement',title:'Professionalism Workshop',detail:'Attended.'}
  ],
  cameron:[
    {id:'ca1',date:'May 15, 2026',pillar:'Progress',title:'Program Completion Recorded',detail:'PAWS requirements completed.'},
    {id:'ca2',date:'May 10, 2026',pillar:'Development',title:'Semester Experience Summary',detail:'54 shadowing hours · 62 service hours.'},
    {id:'ca3',date:'Apr 28, 2026',pillar:'Support',title:'Transition Meeting',detail:'Discussed medical-school transition and next-stage support.'}
  ]
};
