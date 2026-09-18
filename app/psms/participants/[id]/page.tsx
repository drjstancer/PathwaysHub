import Link from 'next/link';
import { notFound } from 'next/navigation';
import { participants } from '@/lib/mock-data';

export default async function ParticipantPage({params}:{params:Promise<{id:string}>}) {
  const {id}=await params;
  const p=participants.find(x=>x.id===id);
  if(!p) notFound();

  return (
    <main className="page">
      <Link href="/psms">← PSMS Dashboard</Link>
      <section className="hero">
        <div>
          <div className="eyebrow">Participant 360</div>
          <h1>{p.name}</h1>
          <p>{p.institution} · {p.stage} · {p.cohort}</p>
        </div>
        <span className={p.openAlerts ? 'pill bad' : 'pill good'}>{p.openAlerts ? p.openAlerts+' open alert(s)' : 'On track'}</span>
      </section>

      <div className="journey">{p.journey.map((x,i)=><span key={i}>{x}</span>)}</div>

      <div className="grid four" style={{marginTop:18}}>
        <div className="card metric"><span>Attendance</span><strong>{p.attendanceRate}%</strong></div>
        <div className="card metric"><span>Overall GPA</span><strong>{p.overallGpa.toFixed(2)}</strong></div>
        <div className="card metric"><span>Science GPA</span><strong>{p.scienceGpa.toFixed(2)}</strong></div>
        <div className="card metric"><span>Shadowing</span><strong>{p.shadowingHours}h</strong></div>
      </div>

      <div className="grid two" style={{marginTop:18}}>
        <section className="card"><h2>Engagement + Support</h2><p>Attendance: {p.attendanceRate}%</p><p>Required meetings: {p.meetingsCompleted}/{p.meetingsRequired}</p><p>Programs: {p.programs.join(', ')}</p></section>
        <section className="card"><h2>Development + Intervention</h2><p>Shadowing: {p.shadowingHours} hours</p><p>Service: {p.serviceHours} hours</p><p>Open alerts: {p.openAlerts}</p></section>
      </div>
    </main>
  );
}
