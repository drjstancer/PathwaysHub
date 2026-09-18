'use client';

import { useMemo, useState } from 'react';
import { programs } from '@/lib/mock-data';

export default function ComparePage(){
  const [left,setLeft]=useState('PAWS');
  const [right,setRight]=useState('PEN');
  const a=useMemo(()=>programs.find(p=>p.code===left)!,[left]);
  const b=useMemo(()=>programs.find(p=>p.code===right)!,[right]);
  const rows:[string,string|number,string|number][]=[
    ['Active participants',a.active,b.active],
    ['Attendance rate',a.attendanceRate+'%',b.attendanceRate+'%'],
    ['Requirement completion',a.requirementRate+'%',b.requirementRate+'%'],
    ['Average GPA',a.avgGpa.toFixed(2),b.avgGpa.toFixed(2)],
    ['Average science GPA',a.avgScienceGpa.toFixed(2),b.avgScienceGpa.toFixed(2)],
    ['Historical completers',a.completers,b.completers],
    ['Medical-school matriculants',a.matriculants,b.matriculants],
    ['Missouri residency matches',a.missouriMatches,b.missouriMatches],
    ['Primary-care matches',a.primaryCareMatches,b.primaryCareMatches]
  ];

  return <main className="page">
    <section className="hero"><div><div className="eyebrow">PathwaysHub Comparison Workspace</div><h1>Compare programs and cohorts.</h1><p>Descriptive comparison workspace using shared ecosystem metrics. Production filters will extend to cohort, year, institution, geography, and approved participant characteristics.</p></div></section>
    <div className="compare-controls">
      <label>Program A<select value={left} onChange={e=>setLeft(e.target.value)}>{programs.map(p=><option key={p.code} value={p.code}>{p.name}</option>)}</select></label>
      <label>Program B<select value={right} onChange={e=>setRight(e.target.value)}>{programs.map(p=><option key={p.code} value={p.code}>{p.name}</option>)}</select></label>
    </div>
    <section className="card table-card"><table><thead><tr><th>Metric</th><th>{a.name}</th><th>{b.name}</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table></section>
    <div className="notice" style={{marginTop:18}}>Comparisons are descriptive. The system should not convert these measures into opaque student rankings or deterministic predictions.</div>
  </main>
}
