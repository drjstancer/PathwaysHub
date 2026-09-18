import Link from 'next/link';
import { participants } from '@/lib/mock-data';

export default function AdminPrototype(){
  return <main className="page">
    <section className="prototype-hero compact">
      <div><div className="eyebrow">Prototype · PSMS Staff Experience</div><h1>CaPS Coordinator Workspace</h1><p>A staff member starts with what requires attention, then drills into the participant's complete record or a specific operational workflow.</p><div className="batch-status"><span className="done">Batch 1 · Core</span><span className="done">Batch 2 · Engagement + Support</span><span className="done">Batch 3 · Progress + Compliance</span></div></div>
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
        <div className="prototype-section-head"><div><span className="pill">Working Now</span><h2>Program Operations</h2></div></div>
        <div className="quick-actions">
          <Link href="/psms/participants"><strong>Participant Directory + 360</strong><span>Search the shared participant core and open the five-pillar operational record.</span></Link>
          <Link href="/psms/attendance"><strong>Events & Attendance</strong><span>Create multi-program events → deduplicated roster → attendance + notes.</span></Link>
          <Link href="/psms/support"><strong>Support & Follow-Up</strong><span>HTM, CASE, MedOpp, Well-Being → restricted notes → follow-up queue.</span></Link>
          <Link href="/psms/requirements"><strong>Requirements & Compliance</strong><span>Rule-driven applicability, bulk generation, and participant status.</span></Link>
          <Link href="/psms/academics"><strong>Academics</strong><span>Course history, GPA calculations, verified snapshots, and MCAT where applicable.</span></Link>
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
