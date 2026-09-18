import { programs } from '@/lib/mock-data';

function csvCell(value:string|number){
  const text=String(value).replaceAll('"','""');
  return '"'+text+'"';
}

export async function GET(){
  const header=['Program','Active Participants','Attendance Rate','Requirement Completion','Average GPA','Average Science GPA','Historical Completers','Medical School Matriculants','Missouri Residency Matches','Primary Care Matches'];
  const rows=programs.map(p=>[p.name,p.active,p.attendanceRate,p.requirementRate,p.avgGpa,p.avgScienceGpa,p.completers,p.matriculants,p.missouriMatches,p.primaryCareMatches]);
  const csv=[header,...rows].map(row=>row.map(csvCell).join(',')).join('\n');
  return new Response(csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="pathwayshub-program-comparison.csv"'}});
}
