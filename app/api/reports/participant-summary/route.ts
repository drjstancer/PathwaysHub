import { participants } from '@/lib/mock-data';

function csvCell(value:string|number){
  const text=String(value).replaceAll('"','""');
  return '"'+text+'"';
}

export async function GET(){
  const header=['Participant','Institution','Programs','Cohort','Stage','Attendance Rate','Overall GPA','Science GPA','Shadowing Hours','Service Hours','Meetings Completed','Meetings Required','Open Alerts'];
  const rows=participants.map(p=>[p.name,p.institution,p.programs.join(' | '),p.cohort,p.stage,p.attendanceRate,p.overallGpa,p.scienceGpa,p.shadowingHours,p.serviceHours,p.meetingsCompleted,p.meetingsRequired,p.openAlerts]);
  const csv=[header,...rows].map(row=>row.map(csvCell).join(',')).join('\n');
  return new Response(csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="psms-participant-summary.csv"'}});
}
