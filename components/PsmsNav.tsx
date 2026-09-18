import Link from 'next/link';

const items=[
  ['/psms','Dashboard'],
  ['/psms/attendance','Attendance'],
  ['/psms/requirements','Requirements'],
  ['/psms/support','Support'],
  ['/psms/development','Development'],
  ['/psms/interventions','Interventions']
] as const;

export default function PsmsNav(){
  return <nav className="subnav" aria-label="PSMS modules">
    {items.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}
  </nav>
}
