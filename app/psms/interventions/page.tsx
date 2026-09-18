const queue=[
 {name:'Jordan Ellis',alert:'Attendance below expectation',severity:'High',actions:2,outcome:'Escalated',next:'Sep 22'},
 {name:'Maya Robinson',alert:'Required HTM meeting outstanding',severity:'Moderate',actions:1,outcome:'Met with Participant',next:'Sep 25'},
 {name:'Avery Johnson',alert:'Semester experience documentation',severity:'Low',actions:1,outcome:'Issue Resolved',next:'—'}
];

export default function InterventionsPage(){
 return <main className="page">
  <section className="hero"><div><div className="eyebrow">PSMS · Intervention</div><h1>Alerts, Outreach & Resolution</h1><p>The intervention engine combines PSMS alerts with the strongest logic from the earlier PAWS operations mock: intervention history, transparent repeat-attention signals, outcomes, and time to resolution.</p></div></section>
  <div className="grid four"><div className="card metric"><span>Open Alerts</span><strong>14</strong></div><div className="card metric"><span>Follow-Ups Due</span><strong>6</strong></div><div className="card metric"><span>Resolved This Term</span><strong>22</strong></div><div className="card metric"><span>Median Resolution</span><strong>5d</strong></div></div>
  <h2 className="section-title">Priority outreach queue</h2><section className="card table-card"><table><thead><tr><th>Participant</th><th>Alert</th><th>Severity</th><th>Actions</th><th>Latest Outcome</th><th>Next Follow-Up</th></tr></thead><tbody>{queue.map(r=><tr key={r.name}><td><strong>{r.name}</strong></td><td>{r.alert}</td><td><span className={r.severity==='High'?'pill bad':r.severity==='Moderate'?'pill warn':'pill'}>{r.severity}</span></td><td>{r.actions}</td><td>{r.outcome}</td><td>{r.next}</td></tr>)}</tbody></table></section>
  <div className="notice" style={{marginTop:18}}><strong>Decision-support guardrail:</strong> repeat-attention indicators are transparent rules for outreach prioritization, not predictive labels or deterministic judgments about a participant.</div>
 </main>
}
