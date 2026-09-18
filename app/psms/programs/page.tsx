import Link from 'next/link';
import { programs } from '@/lib/mock-data';

export default function ProgramsPage(){
  return <main className="page">
    <section className="hero"><div><div className="eyebrow">PSMS · Program Operations</div><h1>Programs</h1><p>Operational views are filtered by program while still using one shared participant record underneath.</p></div></section>
    <div className="grid three">{programs.map(p=><section className="card" key={p.code}><span className="pill">{p.code}</span><h2>{p.name}</h2><div className="program-mini-metrics"><div><strong>{p.active}</strong><span>Active</span></div><div><strong>{p.attendanceRate}%</strong><span>Attendance</span></div><div><strong>{p.requirementRate}%</strong><span>Requirements</span></div></div><Link className="button secondary" href={'/psms/programs/'+p.code.toLowerCase()}>Open Program →</Link></section>)}</div>
  </main>
}
