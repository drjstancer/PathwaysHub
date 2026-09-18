'use client';

import { FormEvent, useMemo, useState } from 'react';

type EventRow={id:number;name:string;date:string;type:string;statuses:Record<string,string>};
const roster=['Avery Johnson','Maya Robinson','Jordan Ellis','Cameron Brooks'];
const initial:EventRow[]=[
  {id:1,name:'PEN Orientation',date:'2026-09-03',type:'Orientation',statuses:{'Avery Johnson':'attended','Maya Robinson':'attended','Jordan Ellis':'attended','Cameron Brooks':'excused'}},
  {id:2,name:'Professionalism Workshop',date:'2026-09-11',type:'Workshop',statuses:{}}
];

export default function AttendancePage(){
  const [events,setEvents]=useState(initial);
  const [name,setName]=useState('');
  const [date,setDate]=useState('2026-09-25');
  const [type,setType]=useState('Workshop');
  const [active,setActive]=useState<number|null>(null);
  const activeEvent=events.find(e=>e.id===active);

  const summary=useMemo(()=>{
    const values=events.flatMap(e=>Object.values(e.statuses));
    return {recorded:values.length,attended:values.filter(x=>x==='attended').length,excused:values.filter(x=>x==='excused').length,noShow:values.filter(x=>x==='no_show'||x==='unexcused').length};
  },[events]);

  function addEvent(e:FormEvent){
    e.preventDefault();
    if(!name.trim()) return;
    const id=Math.max(...events.map(x=>x.id),0)+1;
    setEvents(prev=>[...prev,{id,name:name.trim(),date,type,statuses:{}}]);
    setName('');
    setActive(id);
  }

  function updateStatus(person:string,status:string){
    if(active===null) return;
    setEvents(prev=>prev.map(e=>e.id===active?{...e,statuses:{...e.statuses,[person]:status}}:e));
  }

  return <main className="page">
    <section className="hero"><div><div className="eyebrow">PSMS · Engagement</div><h1>Events & Attendance</h1><p>Staff create official program events and record attendance. Students can view attendance but cannot change it.</p></div></section>
    <div className="grid four">
      <div className="card metric"><span>Events</span><strong>{events.length}</strong></div>
      <div className="card metric"><span>Records Entered</span><strong>{summary.recorded}</strong></div>
      <div className="card metric"><span>Attended</span><strong>{summary.attended}</strong></div>
      <div className="card metric"><span>Excused / Concern</span><strong>{summary.excused} / {summary.noShow}</strong></div>
    </div>

    <div className="split" style={{marginTop:18}}>
      <section className="card">
        <h2>Add Event</h2>
        <form className="form-stack" onSubmit={addEvent}>
          <label>Event name<input value={name} onChange={e=>setName(e.target.value)} placeholder="PEN Cohort Meeting"/></label>
          <label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
          <label>Type<select value={type} onChange={e=>setType(e.target.value)}><option>Workshop</option><option>Cohort Meeting</option><option>Orientation</option><option>Retreat</option><option>Professional Development</option><option>Other</option></select></label>
          <button className="button" type="submit">Add Event & Open Roster</button>
        </form>
      </section>
      <section className="card">
        <h2>Attendance workflow</h2>
        <p className="subtle">Add an event, select it from the event list, record each participant as attended, late, excused, unexcused, or no-show, then save through the production data service.</p>
        <div className="notice"><strong>Prototype behavior:</strong> entries remain in browser state until refresh. The production adapter will write to the shared PSMS database.</div>
      </section>
    </div>

    <h2 className="section-title">Events</h2>
    <section className="card table-card">
      <table><thead><tr><th>Event</th><th>Date</th><th>Type</th><th>Recorded</th><th></th></tr></thead>
      <tbody>{events.map(e=><tr key={e.id}><td><strong>{e.name}</strong></td><td>{e.date}</td><td>{e.type}</td><td>{Object.keys(e.statuses).length}/{roster.length}</td><td><button className="link-button" onClick={()=>setActive(e.id)}>Record Attendance →</button></td></tr>)}</tbody></table>
    </section>

    {activeEvent?<section className="card" style={{marginTop:18}}>
      <h2>{activeEvent.name} roster</h2>
      <p className="subtle">{activeEvent.date} · {activeEvent.type}</p>
      <div className="roster-grid">{roster.map(person=><label key={person} className="roster-row"><strong>{person}</strong><select value={activeEvent.statuses[person]||'pending'} onChange={e=>updateStatus(person,e.target.value)}><option value="pending">Pending</option><option value="attended">Attended</option><option value="late">Late</option><option value="excused">Excused</option><option value="unexcused">Unexcused</option><option value="no_show">No Show</option></select></label>)}</div>
    </section>:null}
  </main>
}
