import Link from 'next/link';

export default function StudentPrototype(){
  return <main className="page student-prototype">
    <section className="student-header">
      <div><div className="eyebrow">Prototype · Student Self-Service</div><h1>Welcome back, Jordan.</h1><p>Your PEN participation, requirements, attendance, and experiential learning records in one place.</p></div>
      <div className="student-profile-chip"><span>JE</span><div><strong>Jordan Ellis</strong><small>PEN 2026</small></div></div>
    </section>

    <div className="grid four">
      <div className="card metric"><span>Attendance</span><strong>73%</strong><small className="subtle">View-only</small></div>
      <div className="card metric"><span>Shadowing</span><strong>18h</strong><small className="subtle">2 experiences</small></div>
      <div className="card metric"><span>Requirements</span><strong>7/9</strong><small className="subtle">2 remaining</small></div>
      <div className="card metric"><span>Reflections</span><strong>2</strong><small className="subtle">1 pending review</small></div>
    </div>

    <div className="prototype-dashboard-grid">
      <section className="card">
        <div className="prototype-section-head"><div><span className="pill warn">Action needed</span><h2>My Checklist</h2></div></div>
        <div className="student-checklist">
          <div><span className="check done">✓</span><div><strong>Program Agreement</strong><small>Completed Sep 3</small></div></div>
          <div><span className="check done">✓</span><div><strong>Orientation</strong><small>Attended Sep 3</small></div></div>
          <div><span className="check">1</span><div><strong>Clinical Shadowing Reflection</strong><small>Submit reflection for Sep 15 experience</small></div></div>
          <div><span className="check">2</span><div><strong>Fall Cohort Meeting</strong><small>Required Sep 25</small></div></div>
        </div>
      </section>

      <section className="card experience-entry-preview">
        <span className="pill">Student entry</span><h2>Log an Experience</h2>
        <div className="fake-field"><small>Experience Type</small><strong>Shadowing</strong></div>
        <div className="fake-field two-up"><div><small>Specialty</small><strong>Family Medicine</strong></div><div><small>Hours</small><strong>4.0</strong></div></div>
        <div className="fake-field"><small>Reflection</small><p>I observed how the physician built trust while balancing efficiency, patient questions, and clinical decision-making...</p></div>
        <Link className="button" href="/psms/development">Open working experience flow</Link>
      </section>
    </div>

    <h2 className="section-title">My attendance</h2>
    <section className="card table-card"><table><thead><tr><th>Event</th><th>Date</th><th>Status</th><th>Note</th></tr></thead><tbody>
      <tr><td>PEN Orientation</td><td>Sep 3</td><td><span className="pill good">Attended</span></td><td>—</td></tr>
      <tr><td>Professionalism Workshop</td><td>Sep 11</td><td><span className="pill good">Attended</span></td><td>—</td></tr>
      <tr><td>Clinical Prep</td><td>Sep 18</td><td><span className="pill bad">No Show</span></td><td>Contact CaPS if this record is incorrect.</td></tr>
    </tbody></table></section>
    <div className="notice" style={{marginTop:18}}><strong>Student boundary:</strong> Jordan can view attendance but cannot edit it. Development experiences and reflections are student-entered and staff-reviewed.</div>
  </main>
}
