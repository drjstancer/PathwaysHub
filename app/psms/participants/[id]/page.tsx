import Link from 'next/link';
import { notFound } from 'next/navigation';
import { participantActivity, participants } from '@/lib/mock-data';

export default async function ParticipantPage({params}:{params:Promise<{id:string}>}) {
  const {id}=await params;
  const p=participants.find(x=>x.id===id);
  if(!p) notFound();
  const activity=participantActivity[p.id]||[];
  const meetingRate=p.meetingsRequired?Math.round((p.meetingsCompleted/p.meetingsRequired)*100):100;
  const alertLabel=p.openAlerts ? p.openAlerts+' open alert'+(p.openAlerts>1?'s':'') : 'No open alerts';

  return <main className="page">
    <Link href="/psms/participants">← Participant Directory</Link>
    <section className="participant-hero">
      <div>
        <div className="eyebrow">Participant 360 · Operational Record</div>
        <h1>{p.name}</h1>
        <p>{p.institution} · {p.classification} · {p.stage}</p>
        <div className="participant-tags">{p.programs.map(code=><span key={code}>{code}</span>)}<span>{p.cohort}</span></div>
      </div>
      <div className="participant-identity">
        <span>MU / Institutional ID</span><strong>{p.institutionalId}</strong>
        <span>Assigned Advisor</span><strong>{p.advisor}</strong>
        <span>Status</span><strong>{p.status}</strong>
      </div>
    </section>

    <div className="grid four">
      <div className="card metric"><span>Attendance</span><strong>{p.attendanceRate}%</strong><small className="subtle">Engagement</small></div>
      <div className="card metric"><span>Requirements</span><strong>{p.requirementRate}%</strong><small className="subtle">Progress</small></div>
      <div className="card metric"><span>Required Meetings</span><strong>{meetingRate}%</strong><small className="subtle">{p.meetingsCompleted}/{p.meetingsRequired} completed</small></div>
      <div className="card metric"><span>Open Alerts</span><strong>{p.openAlerts}</strong><small className="subtle">{p.nextAction}</small></div>
    </div>

    <div className="participant-layout">
      <section className="participant-main">
        <h2 className="section-title">Five-pillar snapshot</h2>
        <div className="pillar-grid">
          <article className="card"><span className="pillar-kicker">Engagement</span><h3>{p.attendanceRate}% attendance</h3><p>{p.cohort} · most recent contact {p.lastContact}</p><Link href="/psms/attendance">Open attendance →</Link></article>
          <article className="card"><span className="pillar-kicker">Support</span><h3>{p.meetingsCompleted}/{p.meetingsRequired} meetings</h3><p>Assigned advisor: {p.advisor}</p><Link href="/psms/support">Open support →</Link></article>
          <article className="card"><span className="pillar-kicker">Progress</span><h3>{p.overallGpa.toFixed(2)} overall GPA</h3><p>{p.scienceGpa.toFixed(2)} science GPA · {p.requirementRate}% requirements</p><Link href="/psms/requirements">Open requirements →</Link></article>
          <article className="card"><span className="pillar-kicker">Development</span><h3>{p.shadowingHours} shadowing hours</h3><p>{p.clinicalHours} clinical · {p.researchHours} research · {p.serviceHours} service · {p.leadershipHours} leadership</p><Link href="/psms/development">Open development →</Link></article>
          <article className="card"><span className="pillar-kicker">Intervention</span><h3>{alertLabel}</h3><p>{p.nextAction}</p><Link href="/psms/interventions">Open interventions →</Link></article>
        </div>

        <h2 className="section-title">Recent activity</h2>
        <section className="card activity-timeline">{activity.map(item=><article key={item.id}><div className={'activity-dot '+item.pillar.toLowerCase()}></div><div><span>{item.date} · {item.pillar}</span><strong>{item.title}</strong><p>{item.detail}</p></div></article>)}</section>
      </section>

      <aside className="participant-side">
        <section className="card"><h2>Participant Details</h2><dl className="detail-list"><div><dt>Email</dt><dd>{p.email}</dd></div><div><dt>Institution</dt><dd>{p.institution}</dd></div><div><dt>Classification</dt><dd>{p.classification}</dd></div><div><dt>Current Cohort</dt><dd>{p.cohort}</dd></div><div><dt>Last Contact</dt><dd>{p.lastContact}</dd></div></dl></section>
        <section className="card"><h2>Pathway Journey</h2><div className="journey vertical">{p.journey.map((x,i)=><span key={i}>{x}</span>)}</div><p className="subtle">PathwaysHub uses this same identity to extend the journey into matriculation, residency, and workforce outcomes.</p><Link href="/hub/journeys">View PathwaysHub journeys →</Link></section>
      </aside>
    </div>
  </main>
}
