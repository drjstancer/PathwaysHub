const rules=[
  ['Annual Program Agreement','All active PAWS/JPAWS participants','Form'],
  ['Retreat Attendance','PAWS Juniors','Event'],
  ['High Touch Mentor Meeting','PAWS/JPAWS active participants','Meeting'],
  ['MCAT Preparation','Applicable PAWS participant types','Academic Support'],
  ['Semester Experience Update','Configured programs','Development']
];

export default function RequirementsPage(){
 return <main className="page">
  <section className="hero"><div><div className="eyebrow">PSMS · Progress</div><h1>Requirements & Compliance</h1><p>Program rules generate the right requirements for the right participants instead of maintaining one-off checklists.</p></div></section>
  <div className="grid four"><div className="card metric"><span>Active Rules</span><strong>{rules.length}</strong></div><div className="card metric"><span>Overall Completion</span><strong>93%</strong></div><div className="card metric"><span>Incomplete</span><strong>17</strong></div><div className="card metric"><span>Waived</span><strong>4</strong></div></div>
  <h2 className="section-title">Requirement rules</h2>
  <section className="card table-card"><table><thead><tr><th>Requirement</th><th>Applies To</th><th>Category</th><th>Status</th></tr></thead><tbody>{rules.map(r=><tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td><td><span className="pill good">Active</span></td></tr>)}</tbody></table></section>
  <div className="notice" style={{marginTop:18}}><strong>Inherited from PAWS:</strong> production generation will use program + participant type/classification + cycle applicability rules, with completion dates required for completed requirements and explanatory notes required for waivers.</div>
 </main>
}
