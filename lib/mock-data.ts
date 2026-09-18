import type { Participant, ProgramMetric } from './types';

export const programs: ProgramMetric[] = [
  {code:'PAWS',name:'PAWS',active:42,attendanceRate:92,requirementRate:94,avgGpa:3.54,avgScienceGpa:3.43,completers:85,matriculants:62,missouriMatches:20,primaryCareMatches:17},
  {code:'JPAWS',name:'JPAWS',active:34,attendanceRate:90,requirementRate:91,avgGpa:3.48,avgScienceGpa:3.37,completers:74,matriculants:29,missouriMatches:8,primaryCareMatches:7},
  {code:'PEN',name:'Physician ENgineers',active:20,attendanceRate:91,requirementRate:90,avgGpa:3.57,avgScienceGpa:3.51,completers:48,matriculants:31,missouriMatches:9,primaryCareMatches:7},
  {code:'BRYANT',name:'Bryant Scholars',active:26,attendanceRate:89,requirementRate:96,avgGpa:3.50,avgScienceGpa:3.43,completers:57,matriculants:39,missouriMatches:14,primaryCareMatches:11},
  {code:'SPRINGFIELD',name:'Springfield Scholars',active:16,attendanceRate:93,requirementRate:95,avgGpa:3.61,avgScienceGpa:3.49,completers:33,matriculants:25,missouriMatches:11,primaryCareMatches:8}
];

export const participants: Participant[] = [
  {id:'avery',name:'Avery Johnson',institution:'University of Missouri',programs:['MMRSEP','JPAWS','PAWS'],cohort:'PAWS EC30',stage:'Preadmission',attendanceRate:94,overallGpa:3.72,scienceGpa:3.58,shadowingHours:42,serviceHours:35,meetingsCompleted:6,meetingsRequired:6,openAlerts:0,journey:['MMRSEP 2023','JPAWS 2024','PAWS EC30','Current']},
  {id:'maya',name:'Maya Robinson',institution:'Lincoln University',programs:['JPAWS','PAWS'],cohort:'PAWS EC29',stage:'Preadmission',attendanceRate:88,overallGpa:3.61,scienceGpa:3.44,shadowingHours:26,serviceHours:48,meetingsCompleted:5,meetingsRequired:6,openAlerts:1,journey:['JPAWS 2024','PAWS EC29','Current']},
  {id:'jordan',name:'Jordan Ellis',institution:'Missouri State University',programs:['PEN'],cohort:'PEN 2026',stage:'Participant',attendanceRate:73,overallGpa:3.34,scienceGpa:3.21,shadowingHours:18,serviceHours:14,meetingsCompleted:2,meetingsRequired:3,openAlerts:2,journey:['PEN 2026','Current']},
  {id:'cameron',name:'Cameron Brooks',institution:'University of Missouri',programs:['PAWS','MEDPREP2'],cohort:'PAWS EC27',stage:'Matriculant',attendanceRate:96,overallGpa:3.65,scienceGpa:3.49,shadowingHours:54,serviceHours:62,meetingsCompleted:8,meetingsRequired:8,openAlerts:0,journey:['PAWS EC27','MedPrep II','MU SOM 2027']}
];
