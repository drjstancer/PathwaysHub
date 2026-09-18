'use client';
import { FormEvent, useState } from 'react';

type Experience={id:number;person:string;date:string;type:string;area:string;hours:number;reflection:string;status:string};
const initial:Experience[]=[{id:1,person:'Jordan Ellis',date:'2026-09-15',type:'Shadowing',area:'Emergency Medicine',hours:8,reflection:'Observed how physicians prioritize information and communicate during rapid transitions in care.',status:'Pending Review'}];

export default function DevelopmentPage(){
 const [rows,setRows]=useState(initial);const [hours,setHours]=useState('');const [area,setArea]=useState('');const [reflection,setReflection]=useState('');
 function submit(e:FormEvent){e.preventDefault();const h=Number(hours);if(!h||!area.trim()||!reflection.trim())return;setRows(p=>[{id:Date.now(),person:'Jordan Ellis',date:new Date().toISOString().slice(0,10),type:'Shadowing',area,hours:h,reflection,status:'Pending Review'},...p]);setHours('');setArea('');setReflection('')}
 function review(id:number){setRows(p=>p.map(r=>r.id===id?{...r,status:'Reviewed'}:r))}
 return <main className="page">
  <section className="hero"><div><div className="eyebrow">PSMS · Development</div><h1>Experiences & Reflections</h1><p>Students document their own shadowing, clinical, research, service, leadership, and professional-development experiences. Staff review submissions.</p></div></section>
  <div className="split">
   <section className="card"><span className="pill">Student View</span><h2>Log shadowing experience</h2><form className="form-stack" onSubmit={submit}><label>Specialty / Area<input value={area} onChange={e=>setArea(e.target.value)} placeholder="Family Medicine"/></label><label>Hours<input type="number" min="0" step=".5" value={hours} onChange={e=>setHours(e.target.value)}/></label><label>Reflection<textarea rows={6} value={reflection} onChange={e=>setReflection(e.target.value)} placeholder="What did you observe, learn, and connect to your professional development?"/></label><button className="button">Submit Experience</button></form></section>
   <section className="card"><span className="pill">Staff View</span><h2>Review policy</h2><p className="subtle">Students create development records; staff review them. Attendance remains staff-controlled. PAWS placement/vetting is a separate administrative workflow from student-submitted shadowing experiences.</p></section>
  </div>
  <h2 className="section-title">Submitted experiences</h2><section className="card table-card"><table><thead><tr><th>Participant</th><th>Date</th><th>Experience</th><th>Area</th><th>Hours</th><th>Reflection</th><th>Status</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td><strong>{r.person}</strong></td><td>{r.date}</td><td>{r.type}</td><td>{r.area}</td><td>{r.hours}</td><td>{r.reflection}</td><td>{r.status==='Reviewed'?<span className="pill good">Reviewed</span>:<button className="link-button" onClick={()=>review(r.id)}>Mark Reviewed →</button>}</td></tr>)}</tbody></table></section>
 </main>
}
