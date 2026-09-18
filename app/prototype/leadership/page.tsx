import Link from 'next/link';
import { programs } from '@/lib/mock-data';

export default function LeadershipPrototype(){
  const active=programs.reduce((s,p)=>s+p.active,0);
  const completers=programs.reduce((s,p)=>s+p.completers,0);
  const matriculants=programs.reduce((s,p)=>s+p.matriculants,0);
  const mo=programs.reduce((s,p)=>s+p.missouriMatches,0);
  return <main className="page">
    <section className="prototype-hero compact">
      <div><div className="eyebrow">Prototype · PathwaysHub Leadership</div><h1>Pathways Impact Dashboard</h1><p>PathwaysHub turns PSMS operational records plus approved longitudinal outcomes into CQI and leadership intelligence.</p></div>
      <div className="prototype-filters"><span>Reporting period</span><strong>2026–27</strong><small>All CaPS pathway programs</small></div>
    </section>
    <div className="grid four">
      <div className="card metric"><span>Active Participants</span><strong>{active}</strong></div>
      <div className="card metric"><span>Historical Completers</span><strong>{completers}</strong></div>
      <div className="card metric"><span>Medical-School Matriculants</span><strong>{matriculants}</strong></div>
      <div className="card metric"><span>Missouri Residency Matches</span><strong>{mo}</strong></div>
    </div>

    <div className="prototype-dashboard-grid leadership-grid">
      <section className="card">
        <div className="prototype-section-head"><div><span className="pill">Pipeline</span><h2>Longitudinal Progression</h2></div><Link href="/prototype/journey">View student journey →</Link></div>
        <div className="funnel">
          <div><strong>512</strong><span>People served</span></div><i>→</i><div><strong>289</strong><span>Program completers</span></div><i>→</i><div><strong>186</strong><span>Matriculated</span></div><i>→</i><div><strong>62</strong><span>Residency outcomes</span></div>
        </div>
      </section>
      <section className="card">
        <span className="pill good">CQI</span><h2>Questions answered</h2>
        <ul className="insight-list">
          <li>Who are our programs reaching?</li>
          <li>Which early programs feed later pathway participation?</li>
          <li>How do cohorts differ over time?</li>
          <li>Where do completers matriculate?</li>
          <li>How many residency outcomes remain in Missouri or primary care?</li>
        </ul>
      </section>
    </div>

    <h2 className="section-title">Program snapshot</h2>
    <section className="card table-card"><table><thead><tr><th>Program</th><th>Active</th><th>Attendance</th><th>Requirement Completion</th><th>Avg GPA</th><th>Matriculants</th><th>MO Matches</th></tr></thead><tbody>{programs.map(p=><tr key={p.code}><td><strong>{p.name}</strong></td><td>{p.active}</td><td>{p.attendanceRate}%</td><td>{p.requirementRate}%</td><td>{p.avgGpa.toFixed(2)}</td><td>{p.matriculants}</td><td>{p.missouriMatches}</td></tr>)}</tbody></table></section>
  </main>
}
