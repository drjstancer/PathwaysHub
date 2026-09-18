'use client';
import { FormEvent, useState } from 'react';

type Meeting={id:number;person:string;type:string;date:string;concern:string;followUp:boolean;restricted:boolean;summary:string};
const initial:Meeting[]=[{id:1,person:'Maya Robinson',type:'HTM',date:'2026-09-12',concern:'Moderate',followUp:true,restricted:false,summary:'Reviewed fall goals and attendance barriers.'}];

export default function SupportPage(){
 const [rows,setRows]=useState(initial);
 const [person,setPerson]=useState('Avery Johnson'); const [type,setType]=useState('HTM'); const [summary,setSummary]=useState('');
 function submit(e:FormEvent){e.preventDefault();if(!summary.trim())return;setRows(p=>[{id:Date.now(),person,type,date:new Date().toISOString().slice(0,10),concern:'Low',followUp:false,restricted:false,summary},...p]);setSummary('')}
 return <main className="page">
  <section className="hero"><div><div className="eyebrow">PSMS · Support</div><h1>Support Meetings</h1><p>Document High Touch Mentor, CASE, MedOpp, Well-Being, academic, and other support contacts with follow-up and restricted-note safeguards.</p></div></section>
  <div className="split">
   <section className="card"><h2>Record meeting</h2><form className="form-stack" onSubmit={submit}><label>Participant<select value={person} onChange={e=>setPerson(e.target.value)}><option>Avery Johnson</option><option>Maya Robinson</option><option>Jordan Ellis</option></select></label><label>Meeting type<select value={type} onChange={e=>setType(e.target.value)}><option>HTM</option><option>CASE</option><option>MedOpp</option><option>Well-Being</option><option>Academic</option><option>Other</option></select></label><label>Summary<textarea value={summary} onChange={e=>setSummary(e.target.value)} rows={5}/></label><button className="button">Save Meeting</button></form></section>
   <section className="card"><h2>Privacy controls</h2><p className="subtle">Production permissions distinguish normal advising records from restricted notes. PathwaysHub receives aggregate support metrics, not restricted note bodies.</p><span className="pill">Advising.ViewRestricted</span></section>
  </div>
  <h2 className="section-title">Recent support activity</h2><section className="card table-card"><table><thead><tr><th>Participant</th><th>Date</th><th>Type</th><th>Concern</th><th>Follow-Up</th><th>Summary</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td><strong>{r.person}</strong></td><td>{r.date}</td><td>{r.type}</td><td>{r.concern}</td><td>{r.followUp?'Yes':'No'}</td><td>{r.summary}</td></tr>)}</tbody></table></section>
 </main>
}
