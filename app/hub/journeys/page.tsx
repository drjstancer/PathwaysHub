import { participants } from '@/lib/mock-data';

export default function JourneysPage(){
 return <main className="page">
  <section className="hero"><div><div className="eyebrow">PathwaysHub · Longitudinal Analysis</div><h1>Pathway Journeys</h1><p>See how people move across CaPS programs and into downstream education and workforce outcomes.</p></div></section>
  <div className="grid two">{participants.map(p=><section className="card" key={p.id}><h2>{p.name}</h2><p className="subtle">{p.institution} · {p.stage}</p><div className="journey">{p.journey.map((j,i)=><span key={i}>{j}</span>)}</div></section>)}</div>
 </main>
}
