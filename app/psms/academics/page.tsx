'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { participants } from '@/lib/mock-data';

type Course={
  id:string;
  personId:string;
  term:string;
  year:number;
  course:string;
  credits:number;
  grade:string;
  gradePoints:number;
  science:boolean;
  mathScience:boolean;
};

type Snapshot={id:string;personId:string;date:string;overallGpa:number;scienceGpa:number;mathScienceGpa:number;mcat?:number;source:string};

const gradeMap:Record<string,number>={A:4,'A-':3.7,'B+':3.3,B:3,'B-':2.7,'C+':2.3,C:2,'C-':1.7,D:1,F:0};

const initialCourses:Course[]=[
  {id:'c1',personId:'avery',term:'Fall',year:2025,course:'BIO 1500',credits:4,grade:'A',gradePoints:4,science:true,mathScience:true},
  {id:'c2',personId:'avery',term:'Fall',year:2025,course:'CHEM 2100',credits:4,grade:'A-',gradePoints:3.7,science:true,mathScience:true},
  {id:'c3',personId:'avery',term:'Spring',year:2026,course:'PSYCH 1000',credits:3,grade:'A',gradePoints:4,science:false,mathScience:false},
  {id:'c4',personId:'maya',term:'Fall',year:2025,course:'BIO 1500',credits:4,grade:'A-',gradePoints:3.7,science:true,mathScience:true},
  {id:'c5',personId:'maya',term:'Spring',year:2026,course:'CHEM 2100',credits:4,grade:'B+',gradePoints:3.3,science:true,mathScience:true},
  {id:'c6',personId:'jordan',term:'Spring',year:2026,course:'PHYS 1210',credits:4,grade:'B+',gradePoints:3.3,science:true,mathScience:true}
];

const initialSnapshots:Snapshot[]=[
  {id:'s1',personId:'avery',date:'2026-08-28',overallGpa:3.72,scienceGpa:3.58,mathScienceGpa:3.55,mcat:508,source:'Institutional / verified'},
  {id:'s2',personId:'maya',date:'2026-08-28',overallGpa:3.61,scienceGpa:3.44,mathScienceGpa:3.42,source:'Institutional / verified'},
  {id:'s3',personId:'jordan',date:'2026-08-28',overallGpa:3.34,scienceGpa:3.21,mathScienceGpa:3.20,source:'Institutional / verified'}
];

const courseKey='psms-demo-courses-v3';
const snapshotKey='psms-demo-snapshots-v3';

function calcGpa(courses:Course[],filter:(c:Course)=>boolean){
  const relevant=courses.filter(filter);
  const credits=relevant.reduce((s,c)=>s+c.credits,0);
  if(!credits) return 0;
  return relevant.reduce((s,c)=>s+(c.gradePoints*c.credits),0)/credits;
}

export default function AcademicsPage(){
  const [courses,setCourses]=useState<Course[]>(initialCourses);
  const [snapshots,setSnapshots]=useState<Snapshot[]>(initialSnapshots);
  const [hydrated,setHydrated]=useState(false);
  const [personId,setPersonId]=useState('avery');
  const [course,setCourse]=useState('');
  const [credits,setCredits]=useState('3');
  const [grade,setGrade]=useState('A');
  const [science,setScience]=useState(false);
  const [mathScience,setMathScience]=useState(false);
  const [term,setTerm]=useState('Fall');
  const [year,setYear]=useState('2026');

  useEffect(()=>{
    try{
      const c=window.localStorage.getItem(courseKey); if(c) setCourses(JSON.parse(c) as Course[]);
      const s=window.localStorage.getItem(snapshotKey); if(s) setSnapshots(JSON.parse(s) as Snapshot[]);
    }catch{}
    setHydrated(true);
  },[]);

  useEffect(()=>{
    if(!hydrated) return;
    window.localStorage.setItem(courseKey,JSON.stringify(courses));
    window.localStorage.setItem(snapshotKey,JSON.stringify(snapshots));
  },[courses,snapshots,hydrated]);

  const selectedCourses=courses.filter(c=>c.personId===personId);
  const calculated={
    overall:calcGpa(selectedCourses,()=>true),
    science:calcGpa(selectedCourses,c=>c.science),
    mathScience:calcGpa(selectedCourses,c=>c.mathScience)
  };
  const latest=snapshots.filter(s=>s.personId===personId).sort((a,b)=>b.date.localeCompare(a.date))[0];
  const selectedPerson=participants.find(p=>p.id===personId)!;

  const participantSummary=useMemo(()=>participants.filter(p=>p.status==='Active').map(p=>{
    const list=courses.filter(c=>c.personId===p.id);
    const snap=snapshots.filter(s=>s.personId===p.id).sort((a,b)=>b.date.localeCompare(a.date))[0];
    return {person:p,courseGpa:calcGpa(list,()=>true),courseScience:calcGpa(list,c=>c.science),snapshot:snap};
  }),[courses,snapshots]);

  function addCourse(e:FormEvent){
    e.preventDefault();
    if(!course.trim()) return;
    const gp=gradeMap[grade]??0;
    setCourses(prev=>[{id:'course-'+Date.now(),personId,term,year:Number(year),course:course.trim(),credits:Number(credits),grade,gradePoints:gp,science,mathScience},...prev]);
    setCourse('');setScience(false);setMathScience(false);
  }

  function createSnapshot(){
    setSnapshots(prev=>[{id:'snap-'+Date.now(),personId,date:new Date().toISOString().slice(0,10),overallGpa:Number(calculated.overall.toFixed(3)),scienceGpa:Number(calculated.science.toFixed(3)),mathScienceGpa:Number(calculated.mathScience.toFixed(3)),source:'Calculated from PSMS demo courses'},...prev]);
  }

  function resetDemo(){
    setCourses(initialCourses);setSnapshots(initialSnapshots);
    window.localStorage.removeItem(courseKey);window.localStorage.removeItem(snapshotKey);
  }

  return <main className="page">
    <section className="hero">
      <div><div className="eyebrow">PSMS · Progress</div><h1>Academics</h1><p>Course records support transparent GPA calculations while verified academic snapshots preserve the official values and source used for longitudinal monitoring.</p></div>
      <button className="button secondary" onClick={resetDemo}>Reset demo data</button>
    </section>

    <div className="grid four">
      <div className="card metric"><span>Demo Course Records</span><strong>{courses.length}</strong></div>
      <div className="card metric"><span>Academic Snapshots</span><strong>{snapshots.length}</strong></div>
      <div className="card metric"><span>Participants with Courses</span><strong>{new Set(courses.map(c=>c.personId)).size}</strong></div>
      <div className="card metric"><span>Verified MCAT Records</span><strong>{snapshots.filter(s=>s.mcat).length}</strong></div>
    </div>

    <div className="split" style={{marginTop:18}}>
      <section className="card">
        <span className="pill">Course Entry</span><h2>Add course record</h2>
        <form className="form-stack" onSubmit={addCourse}>
          <label>Participant<select value={personId} onChange={e=>setPersonId(e.target.value)}>{participants.filter(p=>p.status==='Active').map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select></label>
          <label>Course<input value={course} onChange={e=>setCourse(e.target.value)} placeholder="BIO 2200"/></label>
          <div className="grid two"><label>Term<select value={term} onChange={e=>setTerm(e.target.value)}><option>Fall</option><option>Spring</option><option>Summer</option></select></label><label>Year<input type="number" value={year} onChange={e=>setYear(e.target.value)}/></label></div>
          <div className="grid two"><label>Credits<input type="number" min="0.5" step="0.5" value={credits} onChange={e=>setCredits(e.target.value)}/></label><label>Grade<select value={grade} onChange={e=>setGrade(e.target.value)}>{Object.keys(gradeMap).map(g=><option key={g}>{g}</option>)}</select></label></div>
          <label className="inline-check"><input type="checkbox" checked={science} onChange={e=>{setScience(e.target.checked);if(!e.target.checked)setMathScience(false)}}/> Science course</label>
          <label className="inline-check"><input type="checkbox" checked={mathScience} disabled={!science} onChange={e=>setMathScience(e.target.checked)}/> Math/Science calculation course</label>
          <button className="button">Add Course</button>
        </form>
      </section>

      <section className="card">
        <span className="pill good">Selected Participant</span><h2>{selectedPerson.name}</h2>
        <div className="academic-calc-grid"><div><span>Calculated Overall</span><strong>{calculated.overall?calculated.overall.toFixed(2):'—'}</strong></div><div><span>Calculated Science</span><strong>{calculated.science?calculated.science.toFixed(2):'—'}</strong></div><div><span>Calculated Math/Science</span><strong>{calculated.mathScience?calculated.mathScience.toFixed(2):'—'}</strong></div></div>
        <h3>Latest verified snapshot</h3>
        {latest?<div className="snapshot-card"><strong>{latest.date}</strong><span>Overall {latest.overallGpa.toFixed(2)} · Science {latest.scienceGpa.toFixed(2)} · Math/Science {latest.mathScienceGpa.toFixed(2)}</span><span>{latest.mcat?'MCAT '+latest.mcat+' · ':''}{latest.source}</span></div>:<p className="subtle">No snapshot recorded.</p>}
        <button className="button secondary" onClick={createSnapshot} disabled={!selectedCourses.length}>Create Snapshot from Course Calculation</button>
      </section>
    </div>

    <h2 className="section-title">Course history · {selectedPerson.name}</h2>
    <section className="card table-card"><table><thead><tr><th>Term</th><th>Course</th><th>Credits</th><th>Grade</th><th>Science</th><th>Math/Science</th></tr></thead><tbody>{selectedCourses.map(c=><tr key={c.id}><td>{c.term} {c.year}</td><td><strong>{c.course}</strong></td><td>{c.credits}</td><td>{c.grade}</td><td>{c.science?'Yes':'No'}</td><td>{c.mathScience?'Yes':'No'}</td></tr>)}</tbody></table></section>

    <h2 className="section-title">Academic monitoring</h2>
    <section className="card table-card"><table><thead><tr><th>Participant</th><th>Course-Calculated GPA</th><th>Course-Calculated Science</th><th>Latest Verified Overall</th><th>Latest Verified Science</th><th>MCAT</th><th>Source</th></tr></thead><tbody>{participantSummary.map(({person,courseGpa,courseScience,snapshot})=><tr key={person.id}><td><strong>{person.name}</strong><br/><span className="subtle">{person.cohort}</span></td><td>{courseGpa?courseGpa.toFixed(2):'—'}</td><td>{courseScience?courseScience.toFixed(2):'—'}</td><td>{snapshot?snapshot.overallGpa.toFixed(2):'—'}</td><td>{snapshot?snapshot.scienceGpa.toFixed(2):'—'}</td><td>{snapshot?.mcat||'—'}</td><td>{snapshot?.source||'—'}</td></tr>)}</tbody></table></section>

    <div className="notice" style={{marginTop:18}}><strong>Academic integrity rule:</strong> calculated values and verified institutional snapshots remain distinguishable. Production records will retain source, date, and audit history rather than silently overwriting official values.</div>
  </main>
}
