'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { participants } from '@/lib/mock-data';

export default function ParticipantsPage(){
  const [query,setQuery]=useState('');
  const [program,setProgram]=useState('All');
  const [stage,setStage]=useState('All');
  const [attention,setAttention]=useState('All');

  const programOptions=Array.from(new Set(participants.flatMap(p=>p.programs))).sort();
  const stageOptions=Array.from(new Set(participants.map(p=>p.stage))).sort();

  const filtered=useMemo(()=>participants.filter(p=>{
    const q=query.trim().toLowerCase();
    const matchesQuery=!q || [p.name,p.institution,p.institutionalId,p.email,p.cohort,p.advisor].some(v=>v.toLowerCase().includes(q));
    const matchesProgram=program==='All'||p.programs.some(code=>code===program);
    const matchesStage=stage==='All'||p.stage===stage;
    const matchesAttention=attention==='All'||(attention==='Needs Attention'?p.openAlerts>0:p.openAlerts===0);
    return matchesQuery&&matchesProgram&&matchesStage&&matchesAttention;
  }),[query,program,stage,attention]);

  const active=participants.filter(p=>p.status==='Active').length;
  const attentionCount=participants.filter(p=>p.openAlerts>0).length;
  const multiProgram=participants.filter(p=>p.programs.length>1).length;

  return <main className="page">
    <section className="hero"><div><div className="eyebrow">PSMS · Participant Core</div><h1>Participants</h1><p>The participant—not the program—is the center of the operational record. Search once, then see every active and historical program relationship in Participant 360.</p></div></section>

    <div className="grid four">
      <div className="card metric"><span>Demo Records</span><strong>{participants.length}</strong></div>
      <div className="card metric"><span>Active</span><strong>{active}</strong></div>
      <div className="card metric"><span>Needs Attention</span><strong>{attentionCount}</strong></div>
      <div className="card metric"><span>Multi-Program Journeys</span><strong>{multiProgram}</strong></div>
    </div>

    <section className="card participant-filters">
      <label>Search<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Name, MU ID, institution, cohort, advisor..."/></label>
      <label>Program<select value={program} onChange={e=>setProgram(e.target.value)}><option>All</option>{programOptions.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Stage<select value={stage} onChange={e=>setStage(e.target.value)}><option>All</option>{stageOptions.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Attention<select value={attention} onChange={e=>setAttention(e.target.value)}><option>All</option><option>Needs Attention</option><option>On Track</option></select></label>
    </section>

    <section className="card table-card">
      <header><h2>Participant Directory</h2><span className="pill">{filtered.length} shown</span></header>
      <table><thead><tr><th>Participant</th><th>Programs</th><th>Current Cohort</th><th>Advisor</th><th>Attendance</th><th>Requirements</th><th>Attention</th><th></th></tr></thead>
      <tbody>{filtered.map(p=><tr key={p.id}>
        <td><strong>{p.name}</strong><br/><span className="subtle">{p.institutionalId} · {p.institution}</span></td>
        <td>{p.programs.map(code=><span className="mini-tag" key={code}>{code}</span>)}</td>
        <td>{p.cohort}<br/><span className="subtle">{p.stage}</span></td>
        <td>{p.advisor}</td>
        <td>{p.attendanceRate}%</td>
        <td>{p.requirementRate}%</td>
        <td>{p.openAlerts?<span className="pill bad">{p.openAlerts} alert{p.openAlerts>1?'s':''}</span>:<span className="pill good">On track</span>}</td>
        <td><Link href={'/psms/participants/'+p.id}>Open 360 →</Link></td>
      </tr>)}</tbody></table>
      {!filtered.length?<div className="empty-state">No participants match those filters.</div>:null}
    </section>
  </main>
}
