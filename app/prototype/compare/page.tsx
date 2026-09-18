import Link from 'next/link';

export default function ComparePrototype(){
  const rows=[
    ['Active participants','42','20','26'],
    ['Attendance rate','92%','91%','89%'],
    ['Requirement completion','94%','90%','96%'],
    ['Average overall GPA','3.54','3.57','3.50'],
    ['Average science GPA','3.43','3.51','3.43'],
    ['Historical completers','85','48','57'],
    ['Medical-school matriculants','62','31','39'],
    ['Missouri residency matches','20','9','14'],
    ['Primary-care matches','17','7','11']
  ];
  return <main className="page">
    <section className="prototype-hero compact"><div><div className="eyebrow">Prototype · PathwaysHub Analysis</div><h1>Compare programs without rebuilding spreadsheets.</h1><p>Choose programs, cohorts, time periods, institutions, geography, and approved participant characteristics; PathwaysHub uses the same governed metric definitions every time.</p></div><Link className="button secondary" href="/hub/compare">Open interactive comparison →</Link></section>
    <div className="filter-strip"><span>Programs: <strong>PAWS · PEN · Bryant Scholars</strong></span><span>Period: <strong>All available years</strong></span><span>Population: <strong>All participants</strong></span></div>
    <section className="card table-card comparison-showcase"><table><thead><tr><th>Measure</th><th>PAWS</th><th>PEN</th><th>Bryant Scholars</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>)}</tbody></table></section>
    <div className="grid three" style={{marginTop:18}}>
      <section className="card"><span className="pill">Cohorts</span><h3>Compare within a program</h3><p className="subtle">PAWS EC28 vs. EC29 vs. EC30, or MMRSEP 2024 vs. 2025 vs. 2026.</p></section>
      <section className="card"><span className="pill">Participants</span><h3>Compare trajectories</h3><p className="subtle">Authorized staff can compare descriptive measures while retaining journey and cohort context.</p><Link href="/hub/compare/participants">Open participant comparison →</Link></section>
      <section className="card"><span className="pill">Reporting</span><h3>Export the same definitions</h3><p className="subtle">Dashboard measures and report outputs should come from one governed metric layer.</p><Link href="/hub/reports">Open Report Center →</Link></section>
    </div>
  </main>
}
