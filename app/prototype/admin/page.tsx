import Link from 'next/link';
import { participants } from '@/lib/mock-data';

export default function AdminPrototype(){
  return <main className="page">
    <section className="prototype-hero compact">
      <div><div className="eyebrow">Prototype · PSMS Staff Experience</div><h1>CaPS Coordinator Workspace</h1><p>A staff member starts with what requires attention, then drills into the participant's complete record or a specific operational workflow.</p></div>
      <div className="prototype-user"><span>Signed in as</span><strong>Program Coordinator</strong><small>Full PSMS operational access</small></div>
    </section>

    <div className="grid four">
      <div className="card metric"><span>Active Participants</span><strong>138</strong><small className="subtle">Across active CaPS programs</small></div>
      <div className="card metric"><span>Follow-Ups Due</span><strong>6</strong><small className="subtle">Meetings + interventions</small></div>
      <div className="card metric"><span>Missing Requirements</span><strong>17</strong><small className="subtle">Current cycle</small></div>
      <div className="card metric"><span>Experiences to Review</span><strong>9</strong><small className="subtle">Student submissions</small></div>
    </div>

    <div className="prototype-dashboard-grid">
      <section className="card">
        <div className="prototype-section-head"><div><span className="pill bad">Priority</span><h2>Needs Attention</h2></div><Link href="/psms/interventions">Open Intervention Queue →</Link></div>
        <div className="attention-list">
          <div><span className="avatar">JE</span><div><strong>Jordan Ellis</strong><small>PEN 2026 · Attendance</small></div><b>73%</b></div>
          <div><span className="avatar">MR</span><div><strong>Maya Robinson</strong><small>PAWS EC29 · HTM follow-up</small></div><b>Due</b></div>
          <div><span className="avatar">—</span><div><strong>3 students</strong><small>PAWS EC30 · Semester experience update</small></div><b>Missing</b></div>
        </div>
      </section>

      <section className="card">
        <div className="prototype-section-head"><div><span className="pill">Today</span><h2>Program Operations</h2></div></div>
        <div className="quick-actions">
          <Link href="/psms/attendance"><strong>Record Attendance</strong><span>Create/select event → roster → save</span></Link>
          <Link href="/psms/support"><strong>Record Support Meeting</strong><span>HTM, CASE, MedOpp, Well-Being</span></Link>
          <Link href="/psms/development"><strong>Review Experiences</strong><span>Shadowing, service, research, leadership</span></Link>
          <Link href="/psms/requirements"><strong>Review Compliance</strong><span>Rules + participant requirement status</span></Link>
        </div>
      </section>
    </div>

    <h2 className="section-title">Participant 360 access</h2>
    <section className="card table-card">
      <table><thead><tr><th>Participant</th><th>Programs</th><th>Current Cohort</th><th>Attendance</th><th>Meetings</th><th>Alerts</th><th></th></tr></thead>
      <tbody>{participants.map(p=><tr key={p.id}><td><strong>{p.name}</strong><br/><span className="subtle">{p.institution}</span></td><td>{p.programs.join(' · ')}</td><td>{p.cohort}</td><td>{p.attendanceRate}%</td><td>{p.meetingsCompleted}/{p.meetingsRequired}</td><td>{p.openAlerts? <span className="pill bad">{p.openAlerts} open</span>:<span className="pill good">None</span>}</td><td><Link href={'/psms/participants/'+p.id}>Open 360 →</Link></td></tr>)}</tbody></table>
    </section>
  </main>
}
