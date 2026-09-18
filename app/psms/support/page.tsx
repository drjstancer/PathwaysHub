'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { participants } from '@/lib/mock-data';

type Meeting={
  id:string;
  personId:string;
  type:string;
  date:string;
  staff:string;
  mode:string;
  concern:'Low'|'Moderate'|'High';
  summary:string;
  followUp:boolean;
  followUpDate:string;
  restricted:boolean;
  referral:string;
  resolved:boolean;
};

const initial:Meeting[]=[
  {id:'mtg-maya-1',personId:'maya',type:'HTM',date:'2026-09-12',staff:'Dr. Simmons',mode:'In Person',concern:'Moderate',summary:'Reviewed fall goals and attendance barriers.',followUp:true,followUpDate:'2026-09-25',restricted:false,referral:'',resolved:false},
  {id:'mtg-avery-1',personId:'avery',type:'HTM',date:'2026-09-08',staff:'Dr. Stancer',mode:'In Person',concern:'Low',summary:'Reviewed fall goals; no follow-up required.',followUp:false,followUpDate:'',restricted:false,referral:'',resolved:true}
];

const storageKey='psms-demo-support-v2';

export default function SupportPage(){
  const [rows,setRows]=useState<Meeting[]>(initial);
  const [hydrated,setHydrated]=useState(false);
  const [personId,setPersonId]=useState('avery');
  const [type,setType]=useState('HTM');
  const [staff,setStaff]=useState('Dr. Stancer');
  const [mode,setMode]=useState('In Person');
  const [concern,setConcern]=useState<Meeting['concern']>('Low');
  const [summary,setSummary]=useState('');
  const [followUp,setFollowUp]=useState(false);
  const [followUpDate,setFollowUpDate]=useState('2026-09-25');
  const [restricted,setRestricted]=useState(false);
  const [referral,setReferral]=useState('');

  useEffect(()=>{
    try{
      const saved=window.localStorage.getItem(storageKey);
      if(saved) setRows(JSON.parse(saved) as Meeting[]);
    }catch{}
    setHydrated(true);
  },[]);

  useEffect(()=>{
    if(hydrated) window.localStorage.setItem(storageKey,JSON.stringify(rows));
  },[rows,hydrated]);

  const followUps=useMemo(()=>rows.filter(r=>r.followUp&&!r.resolved).sort((a,b)=>a.followUpDate.localeCompare(b.followUpDate)),[rows]);
  const restrictedCount=rows.filter(r=>r.restricted).length;

  function submit(e:FormEvent){
    e.preventDefault();
    if(!summary.trim()) return;
    const row:Meeting={id:'mtg-'+Date.now(),personId,type,date:new Date().toISOString().slice(0,10),staff,mode,concern,summary:summary.trim(),followUp,followUpDate:followUp?followUpDate:'',restricted,referral,resolved:!followUp};
    setRows(prev=>[row,...prev]);
    setSummary('');setFollowUp(false);setRestricted(false);setReferral('');
  }

  function resolve(id:string){
    setRows(prev=>prev.map(r=>r.id===id?{...r,resolved:true}:r));
  }

  function resetDemo(){
    setRows(initial);
    window.localStorage.removeItem(storageKey);
  }

  const personName=(id:string)=>participants.find(p=>p.id===id)?.name||id;

  return <main className="page">
    <section className="hero">
      <div><div className="eyebrow">PSMS · Support</div><h1>Support Meetings & Follow-Up</h1><p>Document support contacts once, distinguish the support source, protect restricted notes, and turn required follow-up into an operational queue.</p></div>
      <button className="button secondary" onClick={resetDemo}>Reset demo data</button>
    </section>

    <div className="grid four">
      <div className="card metric"><span>Meeting Records</span><strong>{rows.length}</strong></div>
      <div className="card metric"><span>Open Follow-Ups</span><strong>{followUps.length}</strong></div>
      <div className="card metric"><span>High/Moderate Concern</span><strong>{rows.filter(r=>r.concern!=='Low'&&!r.resolved).length}</strong></div>
      <div className="card metric"><span>Restricted Notes</span><strong>{restrictedCount}</strong></div>
    </div>

    <div className="split" style={{marginTop:18}}>
      <section className="card">
        <span className="pill">Record Support Contact</span><h2>Meeting details</h2>
        <form className="form-stack" onSubmit={submit}>
          <div className="grid two">
            <label>Participant<select value={personId} onChange={e=>setPersonId(e.target.value)}>{participants.filter(p=>p.status==='Active').map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select></label>
            <label>Meeting type<select value={type} onChange={e=>setType(e.target.value)}><option>HTM</option><option>CASE</option><option>MedOpp</option><option>Well-Being</option><option>Academic</option><option>Program Advising</option><option>Other</option></select></label>
          </div>
          <div className="grid two">
            <label>Staff member<select value={staff} onChange={e=>setStaff(e.target.value)}><option>Dr. Stancer</option><option>Dr. Simmons</option><option>Dr. HK</option><option>Lacey Runge</option><option>Tionna Hough</option><option>CASE Staff</option><option>MedOpp Staff</option></select></label>
            <label>Mode<select value={mode} onChange={e=>setMode(e.target.value)}><option>In Person</option><option>Virtual</option><option>Phone</option><option>Email</option><option>Other</option></select></label>
          </div>
          <label>Concern level<select value={concern} onChange={e=>setConcern(e.target.value as Meeting['concern'])}><option>Low</option><option>Moderate</option><option>High</option></select></label>
          <label>Summary<textarea value={summary} onChange={e=>setSummary(e.target.value)} rows={5} placeholder="Document the support contact and relevant next steps."/></label>
          <label>Referral / connection<input value={referral} onChange={e=>setReferral(e.target.value)} placeholder="Optional: CASE, Well-Being, MedOpp, tutoring..."/></label>
          <label className="inline-check"><input type="checkbox" checked={followUp} onChange={e=>setFollowUp(e.target.checked)}/> Follow-up required</label>
          {followUp?<label>Follow-up date<input type="date" value={followUpDate} onChange={e=>setFollowUpDate(e.target.value)}/></label>:null}
          <label className="inline-check"><input type="checkbox" checked={restricted} onChange={e=>setRestricted(e.target.checked)}/> Restricted note</label>
          <button className="button">Save Support Record</button>
        </form>
      </section>

      <section className="card">
        <span className="pill warn">Follow-Up Queue</span><h2>Open support actions</h2>
        <div className="support-queue">{followUps.map(item=><article key={item.id}>
          <div><strong>{personName(item.personId)}</strong><small>{item.type} · {item.staff} · due {item.followUpDate}</small><p>{item.summary}</p></div>
          <button className="button secondary" onClick={()=>resolve(item.id)}>Mark resolved</button>
        </article>)}
        {!followUps.length?<div className="empty-state">No open support follow-ups.</div>:null}</div>
        <div className="notice"><strong>Privacy boundary:</strong> restricted note bodies belong in PSMS and are permission-controlled. PathwaysHub receives only approved aggregate/support status measures—not sensitive note text.</div>
      </section>
    </div>

    <h2 className="section-title">Support history</h2>
    <section className="card table-card"><table><thead><tr><th>Participant</th><th>Date</th><th>Type</th><th>Staff</th><th>Concern</th><th>Follow-Up</th><th>Privacy</th><th>Summary</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td><strong>{personName(r.personId)}</strong></td><td>{r.date}</td><td>{r.type}</td><td>{r.staff}</td><td><span className={r.concern==='High'?'pill bad':r.concern==='Moderate'?'pill warn':'pill good'}>{r.concern}</span></td><td>{r.followUp?(r.resolved?<span className="pill good">Resolved</span>:<span className="pill warn">{r.followUpDate}</span>):'—'}</td><td>{r.restricted?<span className="pill bad">Restricted</span>:'Standard'}</td><td>{r.restricted?'Restricted note — authorized viewers only':r.summary}</td></tr>)}</tbody></table></section>
  </main>
}
