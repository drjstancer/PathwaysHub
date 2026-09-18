import Link from 'next/link';
import { participants, programs } from '@/lib/mock-data';

export default function PsmsPage() {
  const active = programs.reduce((sum,p)=>sum+p.active,0);
  const alerts = participants.reduce((sum,p)=>sum+p.openAlerts,0);
  const avgAttendance = Math.round(programs.reduce((sum,p)=>sum+p.attendanceRate,0)/programs.length);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <div className="eyebrow">PSMS · Operational Workspace</div>
          <h1>Participant Success Management</h1>
          <p>One participant record across CaPS programs, organized around Engagement, Support, Progress, Development, and Intervention.</p>
        </div>
        <Link className="button secondary" href="/hub">View outcomes in PathwaysHub →</Link>
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

      <h2 className="section-title">Coordinator action queue</h2>
      <section className="card table-card">
        <header><h2>Participants</h2><span className="pill warn">Synthetic data</span></header>
        <table>
          <thead><tr><th>Participant</th><th>Programs</th><th>Cohort</th><th>Attendance</th><th>Meetings</th><th>Alerts</th><th></th></tr></thead>
          <tbody>
            {participants.map(p=>(
              <tr key={p.id}>
                <td><strong>{p.name}</strong><br/><span className="subtle">{p.institution}</span></td>
                <td>{p.programs.join(' · ')}</td>
                <td>{p.cohort}</td>
                <td>{p.attendanceRate}%</td>
                <td>{p.meetingsCompleted}/{p.meetingsRequired}</td>
                <td>{p.openAlerts ? <span className="pill bad">{p.openAlerts} open</span> : <span className="pill good">None</span>}</td>
                <td><Link href={'/psms/participants/'+p.id}>Open 360 →</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
