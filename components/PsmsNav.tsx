import Link from 'next/link';

const items=[
  ['/psms','Dashboard'],
  ['/psms/participants','Participants'],
  ['/psms/programs','Programs'],
  ['/psms/cohorts','Cohorts'],
  ['/psms/attendance','Attendance'],
  ['/psms/support','Support'],
  ['/psms/requirements','Requirements'],
  ['/psms/academics','Academics'],
  ['/psms/development','Development'],
  ['/psms/interventions','Interventions']
] as const;

export default function PsmsNav(){
  return <nav className="subnav" aria-label="PSMS modules">
    {items.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}
  </nav>
}
