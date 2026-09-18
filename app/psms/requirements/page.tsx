'use client';

import { useEffect, useMemo, useState } from 'react';
import { participants } from '@/lib/mock-data';
import type { ProgramCode } from '@/lib/types';

type Requirement={
  id:string;
  name:string;
  category:string;
  programs:ProgramCode[];
  classifications:string[];
  requiredForCompletion:boolean;
};

type Status='not_started'|'in_progress'|'completed'|'waived'|'not_applicable';
type Assignment={id:string;personId:string;requirementId:string;cycle:string;status:Status;completionDate:string;notes:string};

const catalog:Requirement[]=[
  {id:'annual-agreement',name:'Annual Program Agreement',category:'Form',programs:['PAWS','JPAWS'],classifications:[],requiredForCompletion:true},
  {id:'retreat',name:'Pre-Matriculation / Program Retreat',category:'Event',programs:['PAWS'],classifications:['Junior','Senior'],requiredForCompletion:true},
  {id:'htm',name:'High Touch Mentor Meeting',category:'Support',programs:['PAWS','JPAWS'],classifications:[],requiredForCompletion:true},
  {id:'semester-exp',name:'Semester Experience Update',category:'Development',programs:['PAWS','PEN'],classifications:[],requiredForCompletion:true},
  {id:'mcat-prep',name:'MCAT Preparation Milestone',category:'Academic Support',programs:['PAWS'],classifications:['Senior'],requiredForCompletion:true},
  {id:'pen-clinical-prep',name:'PEN Clinical Preparation',category:'Event',programs:['PEN'],classifications:[],requiredForCompletion:true}
];

const initial:Assignment[]=[
  {id:'a1',personId:'avery',requirementId:'annual-agreement',cycle:'2026-27',status:'completed',completionDate:'2026-09-03',notes:''},
  {id:'a2',personId:'avery',requirementId:'htm',cycle:'2026-27',status:'completed',completionDate:'2026-09-08',notes:''},
  {id:'a3',personId:'avery',requirementId:'mcat-prep',cycle:'2026-27',status:'in_progress',completionDate:'',notes:''},
  {id:'a4',personId:'maya',requirementId:'annual-agreement',cycle:'2026-27',status:'completed',completionDate:'2026-09-03',notes:''},
  {id:'a5',personId:'maya',requirementId:'htm',cycle:'2026-27',status:'in_progress',completionDate:'',notes:'Follow-up meeting outstanding.'},
  {id:'a6',personId:'jordan',requirementId:'pen-clinical-prep',cycle:'2026-27',status:'not_started',completionDate:'',notes:''}
];

const storageKey='psms-demo-requirements-v3';

function applies(personId:string,req:Requirement){
  const p=participants.find(x=>x.id===personId);
  if(!p) return false;
  const programMatch=p.programs.some(code=>req.programs.includes(code));
  const classMatch=!req.classifications.length||req.classifications.includes(p.classification);
  return p.status==='Active'&&programMatch&&classMatch;
}

export default function RequirementsPage(){
  const [assignments,setAssignments]=useState<Assignment[]>(initial);
  const [hydrated,setHydrated]=useState(false);
  const [cycle,setCycle]=useState('2026-27');
  const [personFilter,setPersonFilter]=useState('All');
  const [statusFilter,setStatusFilter]=useState('All');

  useEffect(()=>{
    try{
      const saved=window.localStorage.getItem(storageKey);
      if(saved) setAssignments(JSON.parse(saved) as Assignment[]);
    }catch{}
    setHydrated(true);
  },[]);

  useEffect(()=>{
    if(hydrated) window.localStorage.setItem(storageKey,JSON.stringify(assignments));
  },[assignments,hydrated]);

  const applicablePairs=useMemo(()=>participants.filter(p=>p.status==='Active').flatMap(p=>catalog.filter(req=>applies(p.id,req)).map(req=>({person:p,req}))),[]);

  const rows=useMemo(()=>applicablePairs.map(({person,req})=>{
    const assignment=assignments.find(a=>a.personId===person.id&&a.requirementId===req.id&&a.cycle===cycle);
    return {person,req,assignment};
  }).filter(row=>(personFilter==='All'||row.person.id===personFilter)&&(statusFilter==='All'||(row.assignment?.status||'not_started')===statusFilter)),[applicablePairs,assignments,cycle,personFilter,statusFilter]);

  const allForCycle=applicablePairs.map(({person,req})=>assignments.find(a=>a.personId===person.id&&a.requirementId===req.id&&a.cycle===cycle)).filter(Boolean) as Assignment[];
  const totalApplicable=applicablePairs.length;
  const completed=allForCycle.filter(a=>a.status==='completed').length;
  const waived=allForCycle.filter(a=>a.status==='waived').length;
  const completionRate=totalApplicable?Math.round(((completed+waived)/totalApplicable)*100):0;

  function generateMissing(){
    const additions:Assignment[]=[];
    applicablePairs.forEach(({person,req})=>{
      const exists=assignments.some(a=>a.personId===person.id&&a.requirementId===req.id&&a.cycle===cycle);
      if(!exists) additions.push({id:'req-'+Date.now()+'-'+person.id+'-'+req.id,personId:person.id,requirementId:req.id,cycle,status:'not_started',completionDate:'',notes:''});
    });
    if(additions.length) setAssignments(prev=>[...prev,...additions]);
  }

  function updateStatus(personId:string,requirementId:string,status:Status){
    setAssignments(prev=>{
      const existing=prev.find(a=>a.personId===personId&&a.requirementId===requirementId&&a.cycle===cycle);
      const completionDate=status==='completed'?new Date().toISOString().slice(0,10):'';
      if(existing) return prev.map(a=>a.id===existing.id?{...a,status,completionDate,notes:status==='waived'?(a.notes||'Waiver reason required in production.') : a.notes}:a);
      return [...prev,{id:'req-'+Date.now(),personId,requirementId,cycle,status,completionDate,notes:''}];
    });
  }

  function resetDemo(){
    setAssignments(initial);
    window.localStorage.removeItem(storageKey);
  }

  return <main className="page">
    <section className="hero">
      <div><div className="eyebrow">PSMS · Progress</div><h1>Requirements & Compliance</h1><p>Requirements are generated from applicability rules—program, classification/participant type, and cycle—rather than manually assigned one student at a time.</p></div>
      <div className="flow"><button className="button" onClick={generateMissing}>Generate Missing Assignments</button><button className="button secondary" onClick={resetDemo}>Reset demo data</button></div>
    </section>

    <div className="grid four">
      <div className="card metric"><span>Active Rules</span><strong>{catalog.length}</strong></div>
      <div className="card metric"><span>Applicable Assignments</span><strong>{totalApplicable}</strong></div>
      <div className="card metric"><span>Completion Rate</span><strong>{completionRate}%</strong></div>
      <div className="card metric"><span>Completed / Waived</span><strong>{completed} / {waived}</strong></div>
    </div>

    <h2 className="section-title">Requirement rule catalog</h2>
    <section className="card table-card">
      <table><thead><tr><th>Requirement</th><th>Programs</th><th>Classification Rule</th><th>Category</th><th>Completion</th></tr></thead>
      <tbody>{catalog.map(req=><tr key={req.id}><td><strong>{req.name}</strong></td><td>{req.programs.map(p=><span className="mini-tag" key={p}>{p}</span>)}</td><td>{req.classifications.length?req.classifications.join(', '):'All applicable participants'}</td><td>{req.category}</td><td>{req.requiredForCompletion?'Required':'Optional'}</td></tr>)}</tbody></table>
    </section>

    <h2 className="section-title">Participant compliance</h2>
    <section className="card participant-filters compliance-filters">
      <label>Cycle<select value={cycle} onChange={e=>setCycle(e.target.value)}><option>2026-27</option><option>2025-26</option></select></label>
      <label>Participant<select value={personFilter} onChange={e=>setPersonFilter(e.target.value)}><option value="All">All</option>{participants.filter(p=>p.status==='Active').map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select></label>
      <label>Status<select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="All">All</option><option value="not_started">Not Started</option><option value="in_progress">In Progress</option><option value="completed">Completed</option><option value="waived">Waived</option></select></label>
    </section>

    <section className="card table-card">
      <table><thead><tr><th>Participant</th><th>Requirement</th><th>Programs</th><th>Status</th><th>Completion Date</th></tr></thead>
      <tbody>{rows.map(({person,req,assignment})=>{
        const status=assignment?.status||'not_started';
        return <tr key={person.id+'-'+req.id}><td><strong>{person.name}</strong><br/><span className="subtle">{person.cohort}</span></td><td>{req.name}</td><td>{req.programs.filter(code=>person.programs.includes(code)).join(' + ')}</td><td><select className="table-select" value={status} onChange={e=>updateStatus(person.id,req.id,e.target.value as Status)}><option value="not_started">Not Started</option><option value="in_progress">In Progress</option><option value="completed">Completed</option><option value="waived">Waived</option><option value="not_applicable">Not Applicable</option></select></td><td>{assignment?.completionDate||'—'}</td></tr>
      })}</tbody></table>
    </section>

    <div className="notice" style={{marginTop:18}}><strong>Validation rule:</strong> production will require a completion date when marked completed and explanatory notes when waived. Bulk generation will be audit logged.</div>
  </main>
}
