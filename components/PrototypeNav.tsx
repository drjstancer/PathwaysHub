import Link from 'next/link';

const items=[
  ['/prototype','Showcase Home'],
  ['/prototype/admin','PSMS Admin'],
  ['/prototype/student','Student Portal'],
  ['/prototype/leadership','PathwaysHub Leadership'],
  ['/prototype/compare','Comparison'],
  ['/prototype/journey','Student Journey']
] as const;

export default function PrototypeNav(){
  return <nav className="prototype-nav" aria-label="Prototype showcase">
    {items.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}
  </nav>
}
