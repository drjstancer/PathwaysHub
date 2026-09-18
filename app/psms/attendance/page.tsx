'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { participants } from '@/lib/mock-data';
import type { ProgramCode } from '@/lib/types';

type AttendanceStatus='pending'|'attended'|'late'|'excused'|'unexcused'|'no_show';
type EventRow={
  id:string;
  name:string;
  date:string;
  type:string;
  programs:ProgramCode[];
  required:boolean;
  statuses:Record<string,AttendanceStatus>;
  notes:Record<string,string>;
};

const initial:EventRow[]=[
  {id:'pen-orientation-2026',name:'PEN Orientation',date:'2026-09-03',type:'Orientation',programs:['PEN'],required:true,statuses:{jordan:'attended'},notes:{}},
  {id:'paws-professionalism-2026',name:'Professionalism Workshop',date:'2026-09-11',type:'Workshop',programs:['PAWS','JPAWS'],required:true,statuses:{avery:'attended',maya:'attended',cameron:'attended'},notes:{}}
];

const storageKey='psms-demo-attendance-v2';

export default function AttendancePage(){
  const [events,setEvents]=useState<EventRow[]>(initial);
  const [hydrated,setHydrated]=useState(false);
  const [name,setName]=useState('');
  const [date,setDate]=useState('2026-09-25');
  const [type,setType]=useState('Cohort Meeting');
  const [required,setRequired]=useState(true);
  const [selectedPrograms,setSelectedPrograms]=useState<ProgramCode[]>(['PAWS']);
  const [active,setActive]=useState<string|null>(initial[0].id);

  useEffect(()=>{
    try{
      const saved=window.localStorage.getItem(storageKey);
      if(saved) setEvents(JSON.parse(saved) as EventRow[]);
    }catch{}
    setHydrated(true);
  },[]);

  useEffect(()=>{
    if(!hydrated) return;
    window.localStorage.setItem(storageKey,JSON.stringify(events));
  },[events,hydrated]);

  const activeEvent=events.find(e=>e.id===active)||null;
  const availablePrograms=Array.from(new Set(participants.flatMap(p=>p.programs))).sort() as ProgramCode[];

  const roster=useMemo(()=>{
    if(!activeEvent) return [];
    return participants.filter(p=>p.status==='Active' && p.programs.some(code=>activeEvent.programs.includes(code)));
  },[activeEvent]);

  const summary=useMemo(()=>{
    const values=events.flatMap(e=>Object.values(e.statuses)).filter(x=>x!=='pending');
    return {
      recorded:values.length,
      attended:values.filter(x=>x==='attended'||x==='late').length,
      excused:values.filter(x=>x==='excused').length,
      concern:values.filter(x=>x==='no_show'||x==='unexcused').length
    };
  },[events]);

  function toggleProgram(code:ProgramCode){
    setSelectedPrograms(current=>current.includes(code)?current.filter(x=>x!==code):[...current,code]);
  }

  function addEvent(e:FormEvent){
    e.preventDefault();
    if(!name.trim()||!selectedPrograms.length) return;
    const id='evt-'+Date.now();
    const row:EventRow={id,name:name.trim(),date,type,programs:selectedPrograms,required,statuses:{},notes:{}};
    setEvents(prev=>[row,...prev]);
    setName('');
    setActive(id);
  }

  function updateStatus(personId:string,status:AttendanceStatus){
    if(!active) return;
    setEvents(prev=>prev.map(e=>e.id===active?{...e,statuses:{...e.statuses,[personId]:status}}:e));
  }

  function updateNote(personId:string,note:string){
    if(!active) return;
    setEvents(prev=>prev.map(e=>e.id===active?{...e,notes:{...e.notes,[personId]:note}}:e));
  }

  function markAll(status:AttendanceStatus){
    if(!activeEvent) return;
    const statuses={...activeEvent.statuses};
    roster.forEach(p=>{statuses[p.id]=status});
    setEvents(prev=>prev.map(e=>e.id===activeEvent.id?{...e,statuses}:e));
  }

  function resetDemo(){
    setEvents(initial);
    setActive(initial[0].id);
    window.localStorage.removeItem(storageKey);
  }

  return <main className="page">
    <section className="hero">
      <div><div className="eyebrow">PSMS · Engagement</div><h1>Events & Attendance</h1><p>Create one event for one or more programs, generate a deduplicated active roster automatically, and record attendance against the participant record.</p></div>
      <button className="button secondary" onClick={resetDemo}>Reset demo data</button>
    </section>

    <div className="grid four">
      <div className="card metric"><span>Events</span><strong>{events.length}</strong></div>
      <div className="card metric"><span>Attendance Records</span><strong>{summary.recorded}</strong></div>
      <div className="card metric"><span>Attended / Late</span><strong>{summary.attended}</strong></div>
      <div className="card metric"><span>Needs Follow-Up</span><strong>{summary.concern}</strong></div>
    </div>

    <div className="split" style={{marginTop:18}}>
      <section className="card">
        <span className="pill">Create Event</span><h2>Event details</h2>
        <form className="form-stack" onSubmit={addEvent}>
          <label>Event name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Fall Cohort Meeting"/></label>
          <div className="grid two">
            <label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
            <label>Type<select value={type} onChange={e=>setType(e.target.value)}><option>Workshop</option><option>Cohort Meeting</option><option>Orientation</option><option>Retreat</option><option>Professional Development</option><option>Other</option></select></label>
          </div>
          <fieldset className="choice-fieldset"><legend>Required programs</legend><div className="choice-grid">{availablePrograms.map(code=><label key={code}><input type="checkbox" checked={selectedPrograms.includes(code)} onChange={()=>toggleProgram(code)}/><span>{code}</span></label>)}</div></fieldset>
          <label className="inline-check"><input type="checkbox" checked={required} onChange={e=>setRequired(e.target.checked)}/> Required attendance</label>
          <button className="button" type="submit">Create Event & Generate Roster</button>
        </form>
      </section>

      <section className="card">
        <span className="pill good">Workflow rule</span><h2>One event, one roster</h2>
        <p className="subtle">If a participant belongs to more than one selected program, they still appear only once. Attendance attaches to the person and event, not to duplicate program copies of the person.</p>
        <div className="notice"><strong>Prototype persistence:</strong> event and attendance changes are saved in this browser so you can demonstrate the workflow across refreshes. Production will write to the PSMS database and audit log.</div>
      </section>
    </div>

    <h2 className="section-title">Events</h2>
    <section className="card table-card">
      <table><thead><tr><th>Event</th><th>Date</th><th>Programs</th><th>Required</th><th>Recorded</th><th></th></tr></thead>
      <tbody>{events.map(event=>{
        const eventRoster=participants.filter(p=>p.status==='Active'&&p.programs.some(code=>event.programs.includes(code)));
        const recorded=eventRoster.filter(p=>event.statuses[p.id]&&event.statuses[p.id]!=='pending').length;
        return <tr key={event.id}><td><strong>{event.name}</strong><br/><span className="subtle">{event.type}</span></td><td>{event.date}</td><td>{event.programs.map(code=><span className="mini-tag" key={code}>{code}</span>)}</td><td>{event.required?'Yes':'No'}</td><td>{recorded}/{eventRoster.length}</td><td><button className="link-button" onClick={()=>setActive(event.id)}>Open Roster →</button></td></tr>
      })}</tbody></table>
    </section>

    {activeEvent?<section className="card attendance-roster-card">
      <div className="prototype-section-head">
        <div><span className="pill">{activeEvent.programs.join(' + ')}</span><h2>{activeEvent.name}</h2><p className="subtle">{activeEvent.date} · {activeEvent.type} · {roster.length} participant{roster.length===1?'':'s'}</p></div>
        <div className="flow"><button className="button secondary" onClick={()=>markAll('attended')}>Mark all attended</button><button className="button secondary" onClick={()=>markAll('pending')}>Clear roster</button></div>
      </div>
      <div className="attendance-grid">
        {roster.map(person=><article key={person.id} className="attendance-person">
          <div><strong>{person.name}</strong><small>{person.cohort} · {person.programs.filter(code=>activeEvent.programs.includes(code)).join(' + ')}</small></div>
          <select value={activeEvent.statuses[person.id]||'pending'} onChange={e=>updateStatus(person.id,e.target.value as AttendanceStatus)}><option value="pending">Pending</option><option value="attended">Attended</option><option value="late">Late</option><option value="excused">Excused</option><option value="unexcused">Unexcused</option><option value="no_show">No Show</option></select>
          <input value={activeEvent.notes[person.id]||''} onChange={e=>updateNote(person.id,e.target.value)} placeholder="Optional note"/>
        </article>)}
        {!roster.length?<div className="empty-state">No active synthetic participants match the selected programs.</div>:null}
      </div>
    </section>:null}
  </main>
}
