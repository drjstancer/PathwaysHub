import { programs } from '@/lib/mock-data';

export default function CqiPage(){
 const total=programs.reduce((s,p)=>s+p.completers,0);
 const mats=programs.reduce((s,p)=>s+p.matriculants,0);
 const mo=programs.reduce((s,p)=>s+p.missouriMatches,0);
 const pc=programs.reduce((s,p)=>s+p.primaryCareMatches,0);
 return <main className="page">
  <section className="hero"><div><div className="eyebrow">PathwaysHub · Continuous Quality Improvement</div><h1>CQI Reporting</h1><p>Reusable, reproducible metrics for program review, leadership, faculty, accreditation/CQI processes, and approved grant reporting.</p></div></section>
  <div className="grid four"><div className="card metric"><span>Program Completers</span><strong>{total}</strong></div><div className="card metric"><span>Matriculants</span><strong>{mats}</strong></div><div className="card metric"><span>Missouri Matches</span><strong>{mo}</strong></div><div className="card metric"><span>Primary Care Matches</span><strong>{pc}</strong></div></div>
  <h2 className="section-title">Standard CQI domains</h2><div className="grid three"><section className="card"><h3>Participation & Reach</h3><p className="subtle">Applications/acceptance outcome facts, attendance, completion, school/city/county representation, rural and access indicators, scholarships.</p></section><section className="card"><h3>Progression</h3><p className="subtle">Program-to-program movement, academic indicators, medical-school matriculation and destination.</p></section><section className="card"><h3>Long-Term Outcomes</h3><p className="subtle">Residency specialty, Missouri retention, primary care, and future workforce location.</p></section></div>
  <div className="notice" style={{marginTop:18}}>Production report generation will use governed analytical views so the same definitions drive dashboards, exports, and annual CQI reports.</div>
 </main>
}
