import Link from 'next/link';
import { notFound } from 'next/navigation';
import { participants, programs } from '@/lib/mock-data';

export default async function ProgramPage({params}:{params:Promise<{code:string}>}){
  const {code}=await params;
  const program=programs.find(p=>p.code.toLowerCase()===code.toLowerCase());
  if(!program) notFound();
  const roster=participants.filter(p=>p.programs.includes(program.code));
  return <main className="page">
    <Link href="/psms/programs">← All Programs</Link>
    <section className="hero"><div><div className="eyebrow">PSMS · Program Workspace</div><h1>{program.name}</h1><p>Program-specific operational lens over the shared PSMS participant, attendance, requirement, support, development, and intervention records.</p></div></section>
    <div className="grid four"><div className="card metric"><span>Active</span><strong>{program.active}</strong></div><div className="card metric"><span>Attendance</span><strong>{program.attendanceRate}%</strong></div><div className="card metric"><span>Requirements</span><strong>{program.requirementRate}%</strong></div><div className="card metric"><span>Avg GPA</span><strong>{program.avgGpa.toFixed(2)}</strong></div></div>
    <h2 className="section-title">Demo roster</h2>
    <section className="card table-card"><table><thead><tr><th>Participant</th><th>Cohort</th><th>Attendance</th><th>GPA</th><th>Alerts</th><th></th></tr></thead><tbody>{roster.length?roster.map(p=><tr key={p.id}><td><strong>{p.name}</strong></td><td>{p.cohort}</td><td>{p.attendanceRate}%</td><td>{p.overallGpa.toFixed(2)}</td><td>{p.openAlerts}</td><td><Link href={'/psms/participants/'+p.id}>Open 360 →</Link></td></tr>):<tr><td colSpan={6}>No synthetic participants are assigned to this program yet.</td></tr>}</tbody></table></section>
  </main>
}
