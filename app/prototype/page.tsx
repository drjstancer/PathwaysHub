import Link from 'next/link';

const demos=[
  {href:'/prototype/admin',kicker:'PSMS · Staff',title:'CaPS Admin Workspace',body:'Show the operational side: participant management, attendance, support, requirements, development, and intervention.'},
  {href:'/prototype/student',kicker:'PSMS · Student',title:'Student Self-Service',body:'Show the student side: attendance visibility, requirements, shadowing/experience entry, reflections, and submission status.'},
  {href:'/prototype/leadership',kicker:'PathwaysHub · Leadership',title:'Executive & CQI Dashboard',body:'Show how operational data becomes longitudinal program intelligence, outcomes, and leadership reporting.'},
  {href:'/prototype/compare',kicker:'PathwaysHub · Analysis',title:'Comparison Workspace',body:'Compare programs, cohorts, and participants using contextual descriptive measures.'},
  {href:'/prototype/journey',kicker:'PathwaysHub · Longitudinal',title:'Student Journey',body:'Follow one person across pathway exposure, preadmission programming, medical school, residency, and workforce outcomes.'}
];

export default function PrototypeHome(){
  return <main className="page">
    <section className="prototype-hero">
      <div>
        <div className="eyebrow">CaPS Pathways Ecosystem</div>
        <h1>Show the ecosystem before every production feature is finished.</h1>
        <p>These pages are intentionally presentation-oriented. They use synthetic records and mirror the connected PSMS + PathwaysHub architecture without implying that institutional integrations are already live.</p>
      </div>
      <div className="prototype-status"><span>BUILD TRACK</span><strong>Ecosystem v1</strong><small>Prototype layer evolves alongside working modules.</small></div>
    </section>

    <div className="prototype-grid">
      {demos.map(d=><Link className="prototype-card" href={d.href} key={d.href}>
        <span>{d.kicker}</span><h2>{d.title}</h2><p>{d.body}</p><b>Open prototype →</b>
      </Link>)}
    </div>

    <section className="prototype-story">
      <div><span>1</span><strong>PSMS captures the work</strong><p>Attendance, support, academics, development, requirements, and interventions.</p></div>
      <div><span>2</span><strong>One participant record persists</strong><p>The same person can move through multiple CaPS programs without duplicate identities.</p></div>
      <div><span>3</span><strong>PathwaysHub explains the impact</strong><p>CQI, comparisons, longitudinal outcomes, matriculation, residency, and workforce reporting.</p></div>
    </section>
  </main>
}
