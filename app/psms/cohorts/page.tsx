import { cohorts } from '@/lib/mock-data';

export default function CohortsPage(){
  const active=cohorts.filter(c=>c.status==='Active');
  const types=Array.from(new Set(cohorts.map(c=>c.cohortType)));
  return <main className="page">
    <section className="hero"><div><div className="eyebrow">PSMS · Program Structure</div><h1>Cohorts</h1><p>Cohorts can be based on entering class, program year, academic year, event participation, or another approved grouping—without forcing every program into an ECY model.</p></div></section>
    <div className="grid three"><div className="card metric"><span>Active Cohorts</span><strong>{active.length}</strong></div><div className="card metric"><span>Cohort Types</span><strong>{types.length}</strong></div><div className="card metric"><span>Demo Members</span><strong>{cohorts.reduce((s,c)=>s+c.memberCount,0)}</strong></div></div>
    <h2 className="section-title">Cohort directory</h2>
    <div className="grid three">{cohorts.map(c=><section className="card cohort-card" key={c.id}>
      <div className="prototype-section-head"><span className="pill">{c.program}</span><span className={c.status==='Active'?'pill good':'pill'}>{c.status}</span></div>
      <h2>{c.name}</h2><p className="subtle">{c.cohortType}</p>
      <div className="program-mini-metrics"><div><strong>{c.memberCount}</strong><span>Members</span></div><div><strong>{c.start}</strong><span>Start</span></div><div><strong>{c.end||'—'}</strong><span>End</span></div></div>
    </section>)}</div>
  </main>
}
