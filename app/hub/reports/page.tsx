import Link from 'next/link';

export default function ReportsPage(){
 return <main className="page">
  <section className="hero"><div><div className="eyebrow">PathwaysHub · Reporting</div><h1>Report Center</h1><p>Reusable outputs drawn from the same shared definitions that power dashboards and comparisons.</p></div></section>
  <div className="grid two">
   <section className="card"><span className="pill">CSV</span><h2>Program Comparison Dataset</h2><p className="subtle">Program-level participation, attendance, compliance, academic, matriculation, Missouri-match, and primary-care metrics.</p><a className="button" href="/api/reports/program-comparison">Download CSV</a></section>
   <section className="card"><span className="pill">CSV</span><h2>Participant Summary Dataset</h2><p className="subtle">Synthetic participant-level operational summary for testing approved reporting workflows.</p><a className="button" href="/api/reports/participant-summary">Download CSV</a></section>
   <section className="card"><span className="pill warn">Planned Production Output</span><h2>Annual CQI Report</h2><p className="subtle">Program reach, progression, completion, matriculation, residency outcomes, geography, and access indicators using governed definitions.</p><Link href="/hub/cqi">Preview CQI Metrics →</Link></section>
   <section className="card"><span className="pill warn">Planned Production Output</span><h2>Leadership / Grant Summary</h2><p className="subtle">Executive summary and approved aggregate metrics. PDF/XLSX generation will be wired after the institutional data service is connected.</p></section>
  </div>
  <div className="notice" style={{marginTop:18}}>Exports in this public build contain synthetic data only. Production exports will be permission-gated and audit logged.</div>
 </main>
}
