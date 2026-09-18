import Link from 'next/link';
import { participants, programs } from '@/lib/mock-data';

export default function PsmsPage() {
  const active = programs.reduce((sum,p)=>sum+p.active,0);
  const alerts = participants.reduce((sum,p)=>sum+p.openAlerts,0);
  const avgAttendance = Math.round(programs.reduce((sum,p)=>sum+p.attendanceRate,0)/programs.length);
  const due=participants.filter(p=>p.openAlerts>0);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <div className="eyebrow">PSMS · Operational Workspace</div>
          <h1>Participant Success Management</h1>
          <p>One participant record across CaPS programs, organized around Engagement, Support, Progress, Development, and Intervention.</p>
        </div>
        <div className="flow">
          <Link className="button secondary" href="/psms/participants">Participant Directory</Link>
          <Link className="button secondary" href="/hub">View outcomes in PathwaysHub →</Link>
        </div>
      </section>

      <div className="grid four">
        <div className="card metric"><span>Active Participants</span><strong>{active}</strong></div>
        <div className="card metric"><span>Average Attendance</span><strong>{avgAttendance}%</strong></div>
        <div className="card metric"><span>Open Alerts</span><strong>{alerts}</strong></div>
        <div className="card metric"><span>Programs Represented</span><strong>{programs.length}</strong></div>
      </div>

      <h2 className="section-title">Five Pillars</h2>
      <div className="module-list">
        <div className="module"><b>Engagement</b><span className="subtle">Events & attendance</span></div>
        <div className="module"><b>Support</b><span className="subtle">HTM, CASE, MedOpp, Well-Being</span></div>
        <div className="module"><b>Progress</b><span className="subtle">GPA, courses, requirements</span></div>
        <div className="module"><b>Development</b><span className="subtle">Shadowing, research, service</span></div>
        <div className="module"><b>Intervention</b><span className="subtle">Alerts, outreach, resolution</span></div>
      </div>

      <div className="grid two" style={{marginTop:18}}>
        <section className="card">
          <div className="prototype-section-head"><div><span className="pill bad">Action Queue</span><h2>Participants needing attention</h2></div><Link href="/psms/interventions">Open queue →</Link></div>
          <div className="attention-list">{due.map(p=><div key={p.id}><span className="avatar">{p.name.split(' ').map(x=>x[0]).join('')}</span><div><strong>{p.name}</strong><small>{p.cohort} · {p.nextAction}</small></div><Link href={'/psms/participants/'+p.id}>360 →</Link></div>)}</div>
        </section>
        <section className="card">
          <span className="pill">Core Structure</span><h2>Manage the shared backbone</h2>
          <div className="quick-actions">
            <Link href="/psms/participants"><strong>Participants</strong><span>Search and open the complete operational record.</span></Link>
            <Link href="/psms/programs"><strong>Programs</strong><span>View operational program lenses over shared records.</span></Link>
            <Link href="/psms/cohorts"><strong>Cohorts</strong><span>Manage ECY, program-year, academic-year, and other cohorts.</span></Link>
          </div>
        </section>
      </div>

      <h2 className="section-title">Recent participant records</h2>
      <section className="card table-card">
        <header><h2>Participants</h2><span className="pill warn">Synthetic data</span></header>
        <table>
          <thead><tr><th>Participant</th><th>Programs</th><th>Cohort</th><th>Attendance</th><th>Requirements</th><th>Alerts</th><th></th></tr></thead>
          <tbody>{participants.map(p=><tr key={p.id}>
            <td><strong>{p.name}</strong><br/><span className="subtle">{p.institution}</span></td>
            <td>{p.programs.join(' · ')}</td><td>{p.cohort}</td><td>{p.attendanceRate}%</td><td>{p.requirementRate}%</td>
            <td>{p.openAlerts ? <span className="pill bad">{p.openAlerts} open</span> : <span className="pill good">None</span>}</td>
            <td><Link href={'/psms/participants/'+p.id}>Open 360 →</Link></td>
          </tr>)}</tbody>
        </table>
      </section>
    </main>
  );
}
