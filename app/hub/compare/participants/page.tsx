'use client';

import { useMemo, useState } from 'react';
import { participants } from '@/lib/mock-data';

export default function ParticipantComparePage(){
  const [left,setLeft]=useState('avery');
  const [right,setRight]=useState('maya');
  const a=useMemo(()=>participants.find(p=>p.id===left)!,[left]);
  const b=useMemo(()=>participants.find(p=>p.id===right)!,[right]);
  const rows:[string,string|number,string|number][]=[
    ['Current stage',a.stage,b.stage],
    ['Programs participated',a.programs.length,b.programs.length],
    ['Attendance rate',a.attendanceRate+'%',b.attendanceRate+'%'],
    ['Overall GPA',a.overallGpa.toFixed(2),b.overallGpa.toFixed(2)],
    ['Science GPA',a.scienceGpa.toFixed(2),b.scienceGpa.toFixed(2)],
    ['Shadowing hours',a.shadowingHours,b.shadowingHours],
    ['Service hours',a.serviceHours,b.serviceHours],
    ['Required meetings',a.meetingsCompleted+'/'+a.meetingsRequired,b.meetingsCompleted+'/'+b.meetingsRequired],
    ['Open alerts',a.openAlerts,b.openAlerts]
  ];

  return <main className="page">
    <section className="hero"><div><div className="eyebrow">PathwaysHub · Participant Comparison</div><h1>Compare participant trajectories.</h1><p>Authorized staff can compare descriptive participant measures in context. Participant 360 remains the operational source for managing an individual record.</p></div></section>
    <div className="compare-controls">
      <label>Participant A<select value={left} onChange={e=>setLeft(e.target.value)}>{participants.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
      <label>Participant B<select value={right} onChange={e=>setRight(e.target.value)}>{participants.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
    </div>
    <section className="card table-card"><table><thead><tr><th>Measure</th><th>{a.name}</th><th>{b.name}</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table></section>
    <h2 className="section-title">Journey context</h2>
    <div className="grid two"><section className="card"><h3>{a.name}</h3><div className="journey">{a.journey.map((j,i)=><span key={i}>{j}</span>)}</div></section><section className="card"><h3>{b.name}</h3><div className="journey">{b.journey.map((j,i)=><span key={i}>{j}</span>)}</div></section></div>
    <div className="notice" style={{marginTop:18}}>This comparison is descriptive and should not be converted into a score, rank, or prediction of participant success.</div>
  </main>
}
