import Link from 'next/link';
import { programs } from '@/lib/mock-data';

export default function HubPage() {
  const active=programs.reduce((s,p)=>s+p.active,0);
  const completers=programs.reduce((s,p)=>s+p.completers,0);
  const matriculants=programs.reduce((s,p)=>s+p.matriculants,0);
  const mo=programs.reduce((s,p)=>s+p.missouriMatches,0);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <div className="eyebrow">PathwaysHub · Analytics, Outcomes & CQI</div>
          <h1>From participation to impact.</h1>
          <p>Analyze pathways across programs, cohorts, demographics, matriculation, residency, and workforce outcomes without duplicating operational data entry.</p>
        </div>
        <Link className="button" href="/hub/compare">Compare Programs</Link>
      </section>

      <div className="grid four">
        <div className="card metric"><span>Active Participants</span><strong>{active}</strong></div>
        <div className="card metric"><span>Historical Completers</span><strong>{completers}</strong></div>
        <div className="card metric"><span>Medical-School Matriculants</span><strong>{matriculants}</strong></div>
        <div className="card metric"><span>Missouri Residency Matches</span><strong>{mo}</strong></div>
      </div>

      <h2 className="section-title">Program outcomes snapshot</h2>
      <section className="card table-card">
        <table>
          <thead><tr><th>Program</th><th>Active</th><th>Attendance</th><th>Requirement Completion</th><th>Avg GPA</th><th>Matriculants</th><th>MO Matches</th><th>Primary Care</th></tr></thead>
          <tbody>{programs.map(p=><tr key={p.code}><td><strong>{p.name}</strong></td><td>{p.active}</td><td>{p.attendanceRate}%</td><td>{p.requirementRate}%</td><td>{p.avgGpa.toFixed(2)}</td><td>{p.matriculants}</td><td>{p.missouriMatches}</td><td>{p.primaryCareMatches}</td></tr>)}</tbody>
        </table>
      </section>

      <h2 className="section-title">CQI questions this layer should answer</h2>
      <div className="grid three">
        <div className="card"><h3>Reach</h3><p className="subtle">Who participates? Which institutions, counties, rural communities, first-generation and access populations are represented?</p></div>
        <div className="card"><h3>Progression</h3><p className="subtle">How do people move from early exposure to preadmission programs, matriculation, and residency?</p></div>
        <div className="card"><h3>Outcomes</h3><p className="subtle">Where do participants matriculate, match, practice, and contribute to Missouri and primary-care workforce goals?</p></div>
      </div>
    </main>
  );
}
